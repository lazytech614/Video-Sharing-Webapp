"use server";

import { currentUser } from "@clerk/nextjs/server";
import { client } from "@/lib/prisma";
import nodemailer from 'nodemailer';
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_CLIENT_SECRET!, {
    apiVersion: "2025-05-28.basil",
})

export const sendEmail = async (
    to: string,
    subject: string,
    text: string,
    html?: string,
) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: process.env.MAILER_EMAIL,
            pass: process.env.MAILER_PASSWORD,
        },
    })

    const mailOptions = {
        to,
        subject,
        text,
        html,
    }

    return {transporter, mailOptions}
}

export const onAuthenticateUser = async () => {
    try {
        const user = await currentUser()
        if(!user) {
            console.log("User not found");
            return {status: 403, message: "User not found"}
        }

        const userExists = await client.user.findUnique({
            where: {
                clerkId: user.id
            },
            include: {
                workspace: true,
                members: {
                    include: {
                        workSpace: true,
                    },
                },
            }
        })

        if(userExists) {
            console.log("User already exists", userExists);
            return {status: 200, message: "User found", user: userExists}
        }

        const newUser = await client.user.create({
            data: {
                clerkId: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.emailAddresses[0].emailAddress,
                image: user.imageUrl,
                trial: true,
                studios: {
                    create: {}
                },
                subscription: {
                    create: {}
                },
                workspace: {
                    create: {
                        name: `${user.firstName}'s Workspace`,
                        type: 'PERSONAL'
                    }
                },
            },
            include: {
                workspace: true,
                members: {
                    include: { workSpace: true },
                },
                subscription: {
                    select: {
                        plan: true
                    }
                }
            }
        })

        if(newUser) {
            console.log("New user created", newUser);
            return {status: 201, message: "User created", user: newUser}
        }

        return {status: 403, message: "Something went wrong"}
        
        
    }catch(err) {
        console.log("Something went wrong in the onAuthenticateUser action", err);
        return {status: 500, message: "Something went wrong"}
    }
}

export const getNotifications = async () => {
    try{
        const user = await currentUser()
        if(!user) 
            return {status: 404, message: "User not found"}

        const notifications = await client.user.findUnique({
            where: {
                clerkId: user.id
            },
            select: {
                notifications: true,
                _count: {
                    select: {
                        notifications: true
                    }
                }
            }
        })

        if(notifications && notifications.notifications.length > 0) 
            return {status: 200, message: "Notifications found", data: notifications}
        else 
            return {status: 404, message: "Notifications not found", data: []}
    }catch(err) {
        console.log("Something went wrong in the getNotifications action", err);
        return {status: 403, message: "Something went wrong", data: []}
    }
}

export const searchUsers = async (query: string) => {
    try{
        const user = await currentUser()
        if(!user) 
            return {status: 404, message: "User not found"}

        const users = await client.user.findMany({
            where: {
                OR: [
                    {firstName: {contains: query}},
                    {lastName: {contains: query}},
                    {email: {contains: query}}
                ],
                NOT: [
                    {clerkId: user.id}
                ]
            },
            select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
                image: true,
                subscription: {
                    select: {
                        plan: true
                    }
                }
            }
        })

        if(users && users.length > 0) 
            return {status: 200, message: "Users found", data: users}
        else 
            return {status: 404, message: "Users not found", data: []}
    }catch(err) {
        console.log("Error in the searchUsers action", err);
        return {status: 500, message: "Something went wrong in searchUsers action", data: []}
    }
}

export const getPaymentInfo = async () => {
    try{
        const user = await currentUser()
        if(!user) 
            return {status: 404, message: "User not found"}

        const paymentInfo = await client.user.findUnique({
            where: {
                clerkId: user.id
            },
            select: {
                subscription: {
                    select: {
                        plan: true
                    }
                }
            }
        })

        if(paymentInfo) 
            return {status: 200, message: "Payment info found", data: paymentInfo}
        else 
            return {status: 404, message: "Payment info not found", data: null}
    }catch(err) {
        console.log("Error in the getPaymentInfo action", err);
        return {status: 500, message: "Something went wrong in getPaymentInfo action", data: null}
    }
}

export const getFirstView = async () => {
    try{
        const user = await currentUser()
        if(!user) 
            return {status: 404, message: "User not found"}

        const userData = await client.user.findUnique({
            where: {
                clerkId: user.id
            },
            select: {
                firstView: true
            }
        })

        if(userData) 
            return {status: 200, message: "First view found", data: userData.firstView}
        else 
            return {status: 404, message: "First view not found", data: false}
    }catch(err) {
        console.log("Error in the getFirstView action", err);
        return {status: 500, message: "Something went wrong in getFirstView action", data: undefined}
    }
}

export const enableFirstView = async (checked: boolean) => {
    try{
        const user = await currentUser()
        if(!user) 
            return {status: 404, message: "User not found"}

        const view = await client.user.update({
            where: {
                clerkId: user.id
            },
            data: {
                firstView: checked
            }
        })

        if(view) 
            return {status: 200, message: "First view updated", data: view.firstView}
        else 
            return {status: 404, message: "First view not updated", data: null}
    }catch(err) {
        console.log("Error in the enableFirstView action", err);
        return {status: 500, message: "Something went wrong in enableFirstView action", data: null}
    }
}

export const createCommentAndReply = async (
    userId: string, 
    comment: string, 
    videoId: string, 
    commentId?: string
) => {
    try{
        const user = await currentUser()
        if(!user) 
            return {status: 404, message: "User not found"}

        if(commentId) {
            const reply = await client.comment.update({
                where: {
                    id: commentId
                },
                data: {
                    reply: {
                        create: {
                            comment: comment,
                            userId: userId,
                        }
                    }
                }
            })

            if(reply) 
                return {status: 200, message: "Reply posted", data: reply}
        }
        
        const newComment = await client.video.update({
            where: {
                id: videoId
            },
            data: {
                comment: {
                    create: {
                        comment: comment,
                        userId: userId
                    }
                }
            }
        })

        if(newComment) 
            return {status: 200, message: "Comment posted", data: newComment}
        
        return {status: 404, message: "Comment not posted or reply not posted", data: null}
    }catch(err) {
        console.log("Error in the createCommentAndReply action", err);
        return {status: 500, message: "Something went wrong in createCommentAndReply action", data: null}
    }
}

export const getUserProfile = async () => {
    try {
        const user = await currentUser()
        if(!user) 
            return {status: 404, message: "User not found", data: null}

        const profileIdAndImage = await client.user.findUnique({
            where: {
                clerkId: user.id
            },
            select: {
                image: true,
                id: true
            }
        })

        if(profileIdAndImage) 
            return {status: 200, message: "User profile information found", data: profileIdAndImage}
        else 
            return {status: 404, message: "User profile information not found", data: null}
    }catch(err) {
        console.log("Error in the getUserProfile server action", err);
        return {statua: 500, message: "Something went wrong", data: null}
    }
}
        
export const getVideoComments = async (videoId: string) => {
    try{
        const comments = await client.comment.findMany({
            where: {
                OR: [
                    {
                        videoId: videoId
                    },
                    {
                        commentId: videoId
                    }
                ]
            },
            include: {
                reply: {
                    include: {
                        User: true
                    }
                },
                User: true
            }
        })

        return {status: 200, message: "Video comments found", data: comments}
    }catch(err) {
        console.log("Error in the getVideoComments action", err);
        return {status: 500, message: "Something went wrong in getVideoComments action", data: null}
    }
}

export const inviteMembers = async (
    workspaceId: string,
    recieverId: string,
    email: string
) => {
    try{
        const user = await currentUser()
        if(!user) 
            return {status: 404, message: "User not found"}

        const senderInfo = await client.user.findUnique({
            where: {
                clerkId: user.id
            },
            select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true
            }
        })    
        if(senderInfo?.id) {
            const workspace = await client.workSpace.findUnique({
                where: {
                    id: workspaceId
                },
                select: {
                    name: true
                }
            })             
            if(workspace) {
                const invitation = await client.invite.create({
                    data: {
                        senderId: senderInfo.id,
                        recieverId: recieverId,
                        workSpaceId: workspaceId,
                        content: `You have been invited to join ${workspace.name} workspace, click accept to confirm.`
                    },
                    select: {
                        id: true
                    }
                })

                await client.user.update({
                    where: {
                        clerkId: user.id,
                    },
                    data: {
                        notifications: {
                            create: {
                                content: `${user.firstName} ${user.lastName} invited ${senderInfo.firstName} ${senderInfo.lastName} to join ${workspace.name} workspace`,
                            }
                        }
                    }
                })

                if(invitation) {
                    const {transporter, mailOptions} = await sendEmail(
                        email,
                        'You got an invitation',
                        `You are invited to join ${workspace.name} workspace, click accept to confirm.`,
                        `<a href="${process.env.NEXT_PUBLIC_HOST_URL}/invite/${invitation.id}" style="
                            background-color: #000;
                            padding: 5px 10px;
                            border-radius: 10px;
                            cursor: pointer;
                        ">
                            Accept Invite
                        </a>`
                    )

                    transporter.sendMail(mailOptions, 
                        async (error, info) => {
                            if(error) {
                                console.log("Error in the inviteMembers action", error.message);
                            }else {
                                console.log("Invite sent successfully", info);
                            }
                        }
                    )
                    return {status: 200, message: "Invitation sent successfully", data: invitation}
                }
                return {status: 400, message: "Invitation not sent", data: null}
            }
            return {status: 404, message: "Workspace not found", data: null}
        }
        return {status: 404, message: "Recipient not found", data: null}
    }catch(err) {
        console.log("Error in the inviteMembers action", err);
        return {status: 500, message: "Something went wrong in inviteMembers action", data: null}
    }
}

export const acceptInvite = async (inviteId: string) => {
    try {
        const user = await currentUser();
        if (!user) {
            return { status: 404, message: "User not found", data: null };
        }

        const invitation = await client.invite.findUnique({
            where: { id: inviteId },
            select: {
                workSpaceId: true,
                reciever: { select: { clerkId: true } },
            },
        });
        if (!invitation || invitation.reciever?.clerkId !== user.id) {
            return { status: 401, message: "Not authorized", data: null };
        }

        const acceptInvite = client.invite.update({
            where: { id: inviteId },
            data: { accepted: true },
        });      

        const createMember = client.member.create({
            data: {
                user: { connect: { clerkId: user.id } },
                workSpace: { connect: { id: invitation.workSpaceId! } },
                members: true, 
            },
        });

        const memberTransaction = await client.$transaction([
            acceptInvite,
            // updateMember
            createMember
        ]);

        if(memberTransaction) {
            return {status: 200, message: "Invite accepted successfully", data: memberTransaction}
        }
        return {status: 400, message: "Invite not accepted", data: null}

    }catch (err) {
        console.log("Error in the acceptInvite action", err);
        return {status: 500, message: "Something went wrong in acceptInvite action", data: null}
    }
}

export const completeSubscription = async (sessionId: string) => {
    try{
        const user = await currentUser()
        if(!user) 
            return {status: 404, message: "User not found", data: null}

        const session = await stripe.checkout.sessions.retrieve(sessionId)
        if(!session) 
            return {status: 404, message: "Session not found", data: null}
        
        const customer = await client.user.update({
            where: {
                clerkId: user.id
            },
            data: {
                subscription: {
                    update: {
                        data: {
                            customerId: session.customer as string,
                            plan: "PRO"
                        }
                    }
                }
            }
        })

        if(customer) 
            return {status: 200, message: "Subscription completed successfully", data: customer}
        return {status: 400, message: "Subscription not completed", data: null}

    }catch(err) {
        console.log("Error in the completeSubscription action", err);
        return {status: 500, message: "Something went wrong in completeSubscription action", data: null}
    }
}