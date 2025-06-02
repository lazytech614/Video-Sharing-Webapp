import { client } from "@/lib/prisma";
import { clerkClient } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function  GET(req: NextRequest, {params: {id}}: {params: {id: string}}) {
    try {       
        const userProfile = await client.user.findUnique({
            where: {
                clerkId: id,
            },
            include: {
                studios: true,
                subscription: {
                    select: {
                        plan: true
                    }
                }
            }
        })

        if(userProfile) 
            return NextResponse.json({status: 200, message: "User profile found", data: userProfile}, {status: 200})

        // We are creating the user if the user does not exist
        const clerk_client = await clerkClient()
        const clerkUserInstance = await clerk_client.users.getUser(id)

        const createUser = await client.user.create({
            data: {
                clerkId: id,
                email: clerkUserInstance.emailAddresses[0].emailAddress,
                firstName: clerkUserInstance.firstName,
                lastName: clerkUserInstance.lastName,
                image: clerkUserInstance.imageUrl,
                studios: {
                    create: {}
                },
                workspace: {
                    create: {
                        name: `${clerkUserInstance.firstName}'s Workspace`,
                        type: 'PERSONAL'
                    }
                },
                subscription: {
                    create: {}
                }
            },
            include: {
                subscription: {
                    select: {
                        plan: true
                    }
                }
            }
        })

        if(createUser) 
            return NextResponse.json({status: 201, message: "User profile created", data: createUser}, {status: 201})

        return NextResponse.json({status: 400, message: "User not created", data: null}, {status: 400})
    }catch(err) {
        console.log("Error in the auth route", err);
        return NextResponse.json({status: 500, message:err instanceof Error ? err.message : "Something went wrong", data: null}, {status: 500})
    }
}