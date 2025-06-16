"use client"

import { Button } from '@/components/ui/button'
import { useCreateFolder } from '@/hooks/useCreateFolder'
import { FolderPlusIcon } from 'lucide-react'
import React from 'react'

type Props = {
    workspaceId: string
}

const CreateFolder = ({ workspaceId }: Props) => {
  const {onCreateNewFolder} = useCreateFolder(workspaceId)

  return (
    <Button onClick={onCreateNewFolder} className='z-[20] border border-purple-400 bg-purple-400/10 hover:bg-purple-400/20 text-white flex items-center gap-2 py-6 px-4 rounded-2xl'>
      <FolderPlusIcon size={20} />
      <span className='text-white'>Create Folder</span>
    </Button>
  )
}

export default CreateFolder