"use client";

import React from 'react'
import Link from 'next/link';
import { 
    CircleUser, 
    Dot, 
    Share2 
} from 'lucide-react';

import Loader from '../loader'
import VideoCardMenu from './video-card-menu'
import CopyLink from './copy-link';
import { 
    Avatar, 
    AvatarFallback, 
    AvatarImage 
} from "@/components/ui/avatar"


type Props = {
    workspaceId: string,
    user: {
        firstName: string | null,
        lastName: string | null,
        image: string | null,
    } | null,
    id: string,
    folder: {
        id: string,
        name: string
    } | null,
    processing: boolean,
    title: string | null,
    description: string | null,
    source: string,
    createdAt: Date,
    updatedAt: Date
}

const VideoCard = (props: Props) => {
    const createdDate = new Date(props.createdAt);
    const daysAgo = Math.floor(
    (Date.now() - createdDate.getTime()) / (1000 * 60 * 60 * 24)
    );

  return (
    <Loader state={props.processing} className='bg-[#171717] flex justify-center items-center border-[1px] border-[#252525] rounded-xl'>
        <div className='group overflow-hidden cursor-pointer bg-[#171717] relative border-[1px] border-[#252525] flex flex-col rounded-xl'>
            <div className='absolute top-3 right-3 gap-y-3 z-50 gap-x-3 hidden group-hover:flex'>
                <VideoCardMenu
                    videoId={props.id}
                    currentFolder={props.folder?.id}
                    currentFolderName={props.folder?.name}
                    currentWorkspace={props.workspaceId}
                />
                <CopyLink 
                    variant={"ghost"}
                    className='p-0 h-5 hover:bg-transparent' 
                    videoId={props.id} 
                />
            </div>
            <Link
                href={`/preview/${props.id}`}
                className='hover:bg-[#252525] transition duration-150 flex flex-col justify-between h-full'
            >
                <video
                    controls={false}
                    preload='metadata'
                    className='w-full aspevio-video opacity-50 z-20'
                >
                    <source
                        src={`${process.env.NEXT_PUBLIC_CLOUD_FRONT_STRAM_URL}/${props.source}#t=1`}
                    />
                </video>
                <div className='px-5 py-3 flex flex-col gap-y-2 z-20'>
                    <h2 className='text-sm font-semibold text-[#bdbdbd]'>{props.title}</h2>
                    <div className='flex gap-x-2 items-center mt-2'>
                        <Avatar className='h-8 w-8'>
                            <AvatarImage 
                                src={props.user?.image as string}
                            />
                            <AvatarFallback>
                                <CircleUser />
                            </AvatarFallback>
                        </Avatar>
                        <div>
                            <p className='capitalize text-xs text-[#bdbdbd]'>{props.user?.firstName} {props.user?.lastName}</p>
                            <p className='flex items-center text-[#6b6b6b] text-xs'><Dot /> {daysAgo === 0 ? 'Today' : `${daysAgo} days ago`}</p>
                        </div>
                    </div>
                    <div className='mt-2'>
                        <span className='flex gap-x-2 items-center'>
                            <Share2 
                                size={12} 
                                className='text-[#9d9d9d]'
                                fill='#9d9d9d'
                            />
                            <p className='text-[#9d9d9d] text-xs capitalize'>{props.user?.firstName}'s workspace</p>
                        </span>
                    </div>
                </div>
            </Link>
        </div>
    </Loader>
  )
}

export default VideoCard