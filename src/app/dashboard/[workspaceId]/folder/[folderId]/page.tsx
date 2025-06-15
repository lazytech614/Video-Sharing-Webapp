import { getAllUserVideos, getFolderInfo } from '@/actions/workspace';
import FolderInfo from '@/components/global/Folders/folder-info';
import Videos from '@/components/global/videos';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import React from 'react'

type Props = {
    params: Promise<{
        folderId: string;
        workspaceId: string;
    }>;
}

const FolderIdPage = async ({params}: Props) => {
    const { folderId, workspaceId } = await params;

    const query = new QueryClient()
    await query.prefetchQuery({
        queryKey: ['folder-videos'],
        queryFn: () => getAllUserVideos(folderId),
    });

    await query.prefetchQuery({
        queryKey: ['folder-info'],
        queryFn: () => getFolderInfo(folderId),
    });

  return (
    <HydrationBoundary state={dehydrate(query)}>
        <FolderInfo folderId={folderId} />
        <Videos 
            folderId={folderId} 
            workspaceId={workspaceId} 
            videoKey='folder-videos' 
        />
    </HydrationBoundary>
  )
}

export default FolderIdPage