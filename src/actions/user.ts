"use server";

import { currentUser } from "@clerk/nextjs/server";
import { client } from "@/lib/prisma";
import { Ruthie } from "next/font/google";

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
                workspace: {
                    where: {
                        user: {
                            clerkId: user.id
                        }
                    }
                }
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
                }
            },
            include: {
                workspace: {
                    where: {
                        user: {
                            clerkId: user.id
                        }
                    }
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
                            videoId: videoId
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
        