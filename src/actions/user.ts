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

// export const onAuthenticateUser = async () => {
//   try {
//     const clerkUser = await currentUser()
//     if (!clerkUser) {
//       return { status: 403, message: "No Clerk user found" }
//     }

//     const email = clerkUser.emailAddresses[0].emailAddress
//     const clerkId = clerkUser.id

//     // 1) Try to find an existing user by clerkId OR email
//     let dbUser = await client.user.findFirst({
//       where: {
//         OR: [
//           { clerkId:   clerkId   },  // already linked
//           { email:     email     }   // maybe pre-seeded or signed up manually
//         ]
//       },
//       include: {
//         workspace:    true,
//         subscription: { select: { plan: true } }
//       }
//     })

//     if (dbUser) {
//       // 2) If we found one, update any missing/changed fields
//       dbUser = await client.user.update({
//         where: { id: dbUser.id },
//         data: {
//           // attach clerkId if it wasn’t set, and keep names/image in sync
//           clerkId:   dbUser.clerkId ?? clerkId,
//           firstName: clerkUser.firstName,
//           lastName:  clerkUser.lastName,
//           image:     clerkUser.imageUrl,
//         },
//         include: {
//           workspace:    true,
//           subscription: { select: { plan: true } }
//         }
//       })
//       return {
//         status: 200,
//         message: "Existing user found/updated",
//         user: dbUser
//       }
//     }

//     // 3) If no user at all, create fresh (with nested workspace, subscription, media)
//     const newUser = await client.user.create({
//       data: {
//         clerkId:   clerkId,
//         firstName: clerkUser.firstName,
//         lastName:  clerkUser.lastName,
//         email:     email,
//         image:     clerkUser.imageUrl,
//         trial:     true,
//         studios:      { create: {} },
//         subscription: { create: {} },
//         workspace: {
//           create: {
//             name: `${clerkUser.firstName}'s Workspace`,
//             type: "PERSONAL"
//           }
//         }
//       },
//       include: {
//         workspace:    true,
//         subscription: { select: { plan: true } }
//       }
//     })
//     return {
//       status: 201,
//       message: "New user created",
//       user: newUser
//     }

//   } catch (err: any) {
//     console.error("⚠️ onAuthenticateUser error:", err)
//     return {
//       status: 500,
//       message: err.message ?? "Unexpected error"
//     }
//   }
// }

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