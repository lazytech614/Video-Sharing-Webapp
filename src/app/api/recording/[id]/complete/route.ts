import { client } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }>}
) {
    try {
        const { id } = await params;
        const body = await req.json();
        const completeProcessing = await client.video.update({
            where: {
                userId: id,
                source: body.filename
            },
            data: {
                processing: false
            }
        })

        if(completeProcessing) {
            return NextResponse.json({status: 200, message: "Video processing completed successfully", data: completeProcessing}, {status: 200})
        }

        return NextResponse.json({status: 400, message: "Video processing not completed, some error occured", data: null}, {status: 400})
    }catch(err) {
        console.log("Error in the completeVideo api endpoint", err);
        return NextResponse.json({status: 500, message: (err as Error).message || "Something went wrong", data: null}, {status: 500})
    }
}