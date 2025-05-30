"use server";

import { currentUser } from "@clerk/nextjs/server";
import { client } from "@/lib/prisma";

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
        