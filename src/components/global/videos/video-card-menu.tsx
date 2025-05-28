import React from 'react'
import Modal from '../modal';
import { Move } from 'lucide-react';
import ChangeVideolocation from '../forms/change-video-location';

type Props = {
    videoId: string;
    currentWorkspace?: string;
    currentFolder?: string;
    currentFolderName?: string;
}

const VideoCardMenu = ({
    videoId,
    currentWorkspace,
    currentFolder,
    currentFolderName
}: Props) => {
  return (
    <Modal
        trigger={<Move size={20} className='text-[#a4a4a4]' fill='#a4a4a4' />}
        title='Video Options'
        description='Select an option for this video'
        className='flex items-center cursor-pointer gap-x-2'
    >
        <ChangeVideolocation
            videoId={videoId}
            currentWorkspace={currentWorkspace}
            currentFolder={currentFolder}
            currentFolderName={currentFolderName}
        />
    </Modal>
  )
}

export default VideoCardMenu