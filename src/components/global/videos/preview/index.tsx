"use client";

import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'
import { Download } from 'lucide-react';

import { getPreviewVideo, sendEmailForFirstView } from '@/actions/workspace'
import { useQueryData } from '@/hooks/useQueryData'
import { VideoProps } from '@/types/index.type';
import CopyLink from '../copy-link';
import RichLink from '../rich-link';
import { truncateString } from '@/lib/utils';
import TabMenu from '../../tabs';
import AiTools from '../../ai-tools';
import VideoTranscript from '../../video-transcript';
import Activity from '../../activity';

type Props = {
    videoId: string
}

const VideoPreview = ({videoId}: Props) => {

    const router = useRouter()

    const {data} = useQueryData(
        ['preview-video'],
        () => getPreviewVideo(videoId),
    )

    const notifyFirstView = async () => await sendEmailForFirstView(videoId)

    const {data: video, status, author} = data as VideoProps

    if(status !== 200) 
        router.push('/')

    const createdDate = new Date(video.createdAt);
    const daysAgo = Math.floor(
    (Date.now() - createdDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    useEffect(() => {
        if(video.views === 0) {
            notifyFirstView()
        }

        return () => {
            notifyFirstView()
        }
    }, [])

  return (
    <div className='grid grid-cols-1 xl:grid-cols-3 p-10 px-16 lg:py-10 overflow-y-auto gap-5'>
        <div className='flex flex-col lg:col-span-2 gap-y-10'>
            <div>
                <div className='flex gap-x-5 items-start justify-between'>
                    <h2 className='text-white text-4xl font-bold'>{video.title}</h2>
                    {/* {author ? (
                        <EditVideo 
                            videoId={video.id}
                            title={video.title as string}
                            description={video.description as string}
                        />
                    ) : (
                        <></>
                    )} */}
                </div>
                <span className='flex gap-x-3 mt-4'>
                    <p className='text-[#9d9d9d] capitalize'>
                        {video.user?.firstName} {video.user?.lastName}
                    </p>
                    <p className='text-[#707070]'>
                        {daysAgo === 0 ? 'Today' : daysAgo === 1 ? 'Yesterday' : `${daysAgo} days ago`}
                    </p>
                </span>
            </div>
            <video
                preload='metadata'
                className='w-full aspect-video opacity-50 rounded-xl'
                controls
            >
                <source src={`${process.env.NEXT_PUBLIC_CLOUD_FRONT_STREAM_URL}/${video.source}#1`} />
            </video>
            <div className='flex flex-col gap-y-4 text-2xl'>
                <div className='flex gap-x-5 items-center justify-between'>
                    <p className='text-[#bdbdbd] font-semibold'>Description</p>
                    {/* {author ? (
                        <EditVideo 
                            videoId={video.id}
                            title={video.title as string}
                            description={video.description as string}
                        />
                    ) : (
                        <></>
                    )} */}
                </div>
                <p className='text-[#9d9d9d] text-lg font-medium'>{video.description}</p>
            </div>
        </div>
        <div className='lg:col-span-1 flex flex-col gap-y-16 lg:py-12'>
            <div className='flex justify-end items-center gap-x-3'>
                <CopyLink
                    variant={"outline"}
                    className='rounded-full bg-transparent px-10'
                    videoId={videoId}
                />
                <RichLink 
                    description={truncateString(video.description as string, 150)}
                    id={videoId}
                    source={video.source}
                    title={video.title as string}
                />
                {/* TODO: Implement download functionality */}
                <Download className='text-[#4a4a4a] cursor-pointer' />
            </div>
            <div className='lg:mt-2'>
                <TabMenu 
                    defaultValue='ai tools'
                    triggers={[
                        { label: "AI Tools", value: "ai tools" },
                        { label: "Transcript", value: "transcript" },
                        { label: "Activity", value: "activity" },
                    ]}
                >
                    <AiTools 
                        plan={'PRO'}
                        trial={true}
                        videoId={videoId}
                    />
                    <VideoTranscript 
                        transcript={video.description} 
                    />
                    <Activity 
                        author={video.user?.firstName as string}
                        videoId={videoId}
                    />
                </TabMenu>
            </div>
        </div>
    </div>
  )
}

export default VideoPreview