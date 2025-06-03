import { client } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
    req: NextRequest,
    {params}: {params: {id: string}}
) {
    try {
        const body = await req.json();
        const {id} = params

        const personalWorkspaceId = await client.user.findUnique({
            where: {
                id
            },
            select: {
                workspace: {
                    where: {
                        type: 'PERSONAL'
                    },
                    select: {
                        id: true
                    },
                    orderBy: {
                        createdAt: 'asc'
                    },
                }
            }
        })

        if(!personalWorkspaceId) {
            return NextResponse.json({status: 404, message: "Workspace not found", data: null}, {status: 404})
        }

        const startProcessingVideo = await client.workSpace.update({
            where: {
                id: personalWorkspaceId.workspace[0].id
            },
            data: {
                videos: {
                    create: {
                        source: body.filename,
                        userId: id
                    }
                }
            },
            select: {
                user: {
                    select: {
                        subscription: {
                            select: {
                                plan: true
                            }
                        }
                    }
                }
            }
        })

        if(startProcessingVideo) {
            return NextResponse.json({status: 200, message: "Video processing started", data: startProcessingVideo, plan: startProcessingVideo.user?.subscription?.plan}, {status: 200})
        }

        return NextResponse.json({status: 400, message: "Processing failed", data: null}, {status: 400})
    }catch(err) {
        console.log("Something went wrong in the processing api endpoint", err);
        return NextResponse.json({status: 500, message: "Something went wrong", data: null}, {status: 500})
    }
}