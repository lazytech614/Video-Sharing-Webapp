import { getWixContent } from '@/actions/workspace'
import VideoCard from '@/components/global/videos/video-card'
import React from 'react'

type Props = {}

const Home = async (props: Props) => {
    const videos = await getWixContent()

  return (
    <div className='grid grid-cols-1 lg:grid-cols-2 gap-5'>
        {videos.status === 200 ? (
            videos.data?.map((video: any) => (
                <VideoCard 
                    key={video.id} 
                    {...video} 
                    workspaceId={video.workSpaceId}
                />
            ))
        ) : (
            ''
        )}
    </div>
  )
}

export default Home