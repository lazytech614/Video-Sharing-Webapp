import { 
    dehydrate, 
    HydrationBoundary, 
    QueryClient 
} from '@tanstack/react-query'
import React from 'react'

import { getPreviewVideo } from '@/actions/workspace'
import VideoPreview from '@/components/global/videos/preview'

type Props = {
    params: Promise<{
        videoId: string
    }>
}

const VideoPage = async ({params}: Props) => {
    const { videoId } = await params
    const query = new QueryClient()

    await query.prefetchQuery({
        queryKey: ['preview-video'],
        queryFn: () => getPreviewVideo(videoId)
    })

  return (
    <HydrationBoundary state={dehydrate(query)}>
        <VideoPreview videoId={videoId} />
    </HydrationBoundary>
  )
}

export default VideoPage