"use client"

import { ArrowRight, FolderIcon } from 'lucide-react'
import React from 'react'
import { cn } from '@/lib/utils'
import Folder from './folder'
import { useQueryData } from '@/hooks/useQueryData'
import { getWorkspaceFolders } from '@/actions/workspace'
import { useMutationDataState } from '@/hooks/useMutationDataState'
import { FoldersProps } from '@/types/index.type'

type Props = {
    workspaceId: string
}

const Folders = ({workspaceId}: Props) => {
  // Fetching workspace folders
  const {data, isFetched} = useQueryData(
    ['workspace-folders'],
    () => getWorkspaceFolders(workspaceId),
  )

  const {latestVaribles} = useMutationDataState(['create-folder'])

  
  
  const {status, data: folders} = data as FoldersProps
  
  console.log("useQueryData result:", folders);

  //TODO: Add the classnames for the folder based on success response or error response
  //TODO: Add the redux stuff

  return (
    <div className='flex flex-col gap-4'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-4'>
          <FolderIcon size={20} className='text-[#707070]' />
          <h2 className='text-[#bdbdbd] text-xl'>Folders</h2>
        </div>
        <div className='flex items-center gap-2 cursor-pointer'>
          <p className='text-[#bdbdbd] '>See All</p>
          <ArrowRight size={20} className='text-[#707070]'/>
        </div>
      </div>
      <section className={cn(status !==200 && "justify-center",  `flex items-center gap-4 overflow-x-auto w-full`)}>
        {status !== 200 ? 
          <p className='text-neutral-300'>No Folders</p> : 
          <>
            {latestVaribles && latestVaribles.status==="pending" && (
              <Folder 
                name={latestVaribles.variables.name}
                id={latestVaribles.variables.id}
                count={0}
                optimistic
              />
            )}
            {folders?.map((folder) => (
              <Folder 
                name={folder.name}
                count={folder._count.videos} 
                id={folder.id}
                key={folder.id}
              />
            ))}
          </>
        }
      </section>
    </div>
  )
}

export default Folders