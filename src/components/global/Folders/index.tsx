"use client"

import { ArrowRight, FolderIcon } from 'lucide-react'
import React from 'react'
import { cn } from '@/lib/utils'
import Folder from './folder'
import { useQueryData } from '@/hooks/useQueryData'
import { getWorkspaceFolders } from '@/actions/workspace'
import { useMutationDataState } from '@/hooks/useMutationDataState'
import { FoldersProps } from '@/types/index.type'
import { useDispatch } from 'react-redux'
import { FOLDERS } from '@/redux/slices/folders'

type Props = {
    workspaceId: string
}

const Folders = ({workspaceId}: Props) => {
  const dispatch = useDispatch()

  // Fetching workspace folders
  const {data, isFetched} = useQueryData(
    ['workspace-folders'],
    () => getWorkspaceFolders(workspaceId),
  )

  const {latestVariables} = useMutationDataState(['create-folder'])


  // 2) Guard: only run once data has arrived
  if (isFetched && data) {
    // Narrow to your known response shape
    const { status, data: apiFolders } = data as FoldersProps;

    // Only on success
    if (status === 200 && apiFolders) {
      // 3) Normalize: drop `updatedAt` and rename `workSpaceId` → `workspaceId`
      const normalized = apiFolders.map((f) => ({
        _count: f._count,
        id: f.id,
        name: f.name,
        createdAt: f.createdAt,
        workspaceId: f.workSpaceId ?? "",  // lowercase `workspaceId`
      }));

      // 4) Dispatch into your slice
      dispatch(FOLDERS({ folders: normalized }));
    }
  }

  // 5) Prepare for rendering
  const { status = 0, data: folders = [] } = (data as FoldersProps) ?? {};

  


  // const {status, data: folders} = data as FoldersProps

  // if(isFetched && folders) {
  //   dispatch(FOLDERS({folders: folders}))
  // }


  //TODO: Add the classnames for the folder based on success response or error response

  return (
    <div className='z-[20] relative flex flex-col gap-4'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-4'>
          <FolderIcon size={20} className='text-[#bdbdbd]' />
          <h2 className='text-[#bdbdbd] text-xl'>Folders</h2>
        </div>
        <div className='flex items-center gap-2 cursor-pointer'>
          <p className='text-[#bdbdbd] '>See All</p>
          <ArrowRight size={20} className='text-[#707070]'/>
        </div>
      </div>
      <section className={cn(status !==200 && "justify-center", `flex items-center gap-4 overflow-x-auto w-full`)}>
        {status !== 200 ? 
          <p className='text-neutral-300'>No Folders</p> : 
          <>
            {latestVariables && latestVariables.status==="pending" && (
              <Folder 
                name={latestVariables.variables.name}
                id={latestVariables.variables.id}
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