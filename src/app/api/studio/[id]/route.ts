import { client } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
    req: NextRequest,
    {params: {id}}: {params: {id: string}}
) {
    try {
        const body = await req.json();
    
        const studio = await client.user.update({
            where: {
                id
            },
            data: {
                studios: {
                    upsert: {
                        create: {
                            screen: body?.screen,
                            mic: body?.audio,
                            preset: body?.preset
                        },
                            update: {
                            screen: body?.screen,
                            mic: body?.audio,
                            preset: body?.preset
                        }
                    },
                }
            }
        })

        if(studio)
            return NextResponse.json({status: 200, message: "Studio updated", data: studio}, {status: 200})

        return NextResponse.json({status: 400, message: "Failed to update the studio settings"}, {status: 400})
    }catch(err) {
        console.log("Error in the studio route", err);
        return NextResponse.json({status: 500, message: "Something went wrong"}, {status: 500})
    }
}