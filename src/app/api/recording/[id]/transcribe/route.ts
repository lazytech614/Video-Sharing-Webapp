import { client } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
    req: NextRequest,
    {params}: {params: {id: string}}
) {
    try {
        const body = await req.json();
        const {id} = params
        const content = JSON.parse(body?.content)

        const transcribed = await client.video.update({
            where: {
                userId: id,
                source: body.filename
            },
            data: {
                title: content.title,
                description: content.summary,
                summary: content.transcript
            }
        })

        if(transcribed) {
            //TODO: Implement AI agent later
            console.log("🟢 Video transcribed successfully");
            return NextResponse.json({status: 200, message: "Video transcription successful", data: transcribed}, {status: 200})
        }

        console.log("🔴 Video transcription failed");
        return NextResponse.json({status: 400, message: "Video transcription failed", data: null}, {status: 400})
    }catch(err) {

    }
}