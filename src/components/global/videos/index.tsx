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

const Videos = ({folderId, workspaceId, videoKey}: Props) => {
    const {data: videoData, isPending, isFetching} = useQueryData(
        [videoKey],
        () => getAllUserVideos(folderId),
    )

    if (isPending || isFetching) {
        return (
        <p className="p-5 text-center text-[#bdbdbd]">
            Loading videos…
        </p>
        );
    }

    if (!videoData) {
        return (
        <p className="p-5 text-center text-[#bdbdbd]">
            Couldn't load videos. Try again later.
        </p>
        );
    }

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
            {videoStatus === 200 ? (
                videos.map((video) => (
                    <VideoCard 
                        key={video.id}
                        workspaceId={workspaceId} 
                        {...video} 
                    />
                ))
            ) : (
                <p className='text-[#bdbdbd]'>No videos in workspace</p>
            )}
        </section>
    </div>
  )
}

export default Videos