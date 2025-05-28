import React from 'react'
import Loader from '../loader'
import VideoCardMenu from './video-card-menu'
import ChangeVideolocation from '../forms/change-video-location'

type Props = {
    workspaceId: string,
    User: {
        firstName: string | null,
        lastName: string | null,
        image: string | null,
    } | null,
    id: string,
    Folder: {
        id: string,
        name: string
    } | null,
    processing: boolean,
    title: string | null,
    source: string,
    createdAt: Date,
    updatedAt: Date
}

const VideoCard = (props: Props) => {
    //TODO: Implement days ago functionality in video card

  return (
    <Loader state={false}>
        {/* <div className='overflow-hidden cursor-pointer bg-[#171717] relative border-[1px] border-[#252525] flex flex-col rounded-xl'>
            <div className='absolute top-3 right-3 flex flex-col gap-y-3 z-50'>
                <VideoCardMenu
                    videoId={props.id}
                    currentFolder={props.Folder?.id}
                    currentFolderName={props.Folder?.name}
                    currentWorkspace={props.workspaceId}
                />
            </div>
        </div> */}
        <ChangeVideolocation
            videoId={props.id}
            currentWorkspace={props.workspaceId}
            currentFolder={props.Folder?.id}
            currentFolderName={props.Folder?.name}
        />
    </Loader>
  )
}

export default VideoCard