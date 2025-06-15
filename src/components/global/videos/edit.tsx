import React from 'react'
import Modal from '../modal'
import { Button } from '@/components/ui/button'
import { Edit } from 'lucide-react'
import EditVideoForm from '../forms/edit-video'

type Props = {
    videoId: string
    title: string 
    description: string
}

const EditVideo = ({videoId, title, description}: Props) => {
  return (
    <Modal
        title="Edit your video"
        description='You can update your video details here'
        trigger={
            <Button
                variant={'ghost'}
            >
                <Edit className='text-[#6c6c6c]'/>
            </Button>
        }
    >
        <EditVideoForm videoId={videoId} title={title} description={description}/>
    </Modal>
  )
}

export default EditVideo