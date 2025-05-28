"use client";

import { getAllUserVideos } from '@/actions/workspace';
import { useQueryData } from '@/hooks/useQueryData';
import { cn } from '@/lib/utils';
import { VideosProps } from '@/types/index.type';
import { Video } from 'lucide-react';
import React from 'react'
import VideoCard from './video-card';

type Props = {
    folderId: string;
    workspaceId: string;
    videoKey: string;
}

//TODO: Mock data for now, later we will fetch the data from the server
const video = {
    User: {
        firstName: 'John',
        lastName: 'Doe',
        image: 'https://via.placeholder.com/150'
    },
    id: 'video-1',
    Folder: {
        id: 'folder-1',
        name: 'Folder 1'
    },
    processing: false,
    title: 'Video 1',
    source: 'https://via.placeholder.com/150',
    createdAt: new Date(),
    updatedAt: new Date()
}

const Videos = ({folderId, workspaceId, videoKey}: Props) => {
    const {data: videoData} = useQueryData(
        [videoKey],
        () => getAllUserVideos(folderId),
    )

    const {status: videoStatus, data: videos} = videoData as VideosProps

  return (
    <div className='flex flex-col gap-4 mt-4'>
        <div className='flex items-center justify-between'>
            <div className='flex items-center gap-4'>
                <Video className='text-[#707070]' />
                <h2 className='text-[#bdbdbd] text-xl'>Videos</h2>
            </div>
        </div>
        <section className={cn(videoStatus !==200 ? 'p-5' : 'grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5')}>
            {/* //TODO: Add the videos conditional logic here */}
            {/* {videoStatus === 200 ? (
                <VideoCard />
            ) : (
                <p className='text-[#bdbdbd]'>No videos in workspace</p>
            )} */}

            <VideoCard
                workspaceId={workspaceId}
                {...video}
            />
        </section>
    </div>
  )
}

export default Videos