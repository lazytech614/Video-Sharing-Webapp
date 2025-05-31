import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { useMoveVideoLocation } from '@/hooks/useMoveVideoLocation';
import React from 'react'
import Loader from '../../loader';

type Props = {
    videoId: string;
    currentWorkspace?: string;
    currentFolder?: string;
    currentFolderName?: string;
}

const ChangeVideolocation = ({
    videoId,
    currentWorkspace,
    currentFolder,
    currentFolderName
}: Props) => {
    const {
        register,
        isPending,
        onFormSubmit,
        folders,
        workspaces,
        isFetching,
        isFolders
    } = useMoveVideoLocation(videoId, currentWorkspace!)

    const folder = folders?.find((folder: any) => folder.id === currentFolder);
    const workspace = workspaces?.find((workspace) => workspace.id === currentWorkspace);

  return (
    <form className='flex flex-col gap-y-5' onSubmit={onFormSubmit}>
        <div className='border-[1px] rounded-xl p-5'>
            <h2 className='text-xs mb-2 text-[#a4a4a4]'>Current Workspace</h2>
            {workspace && <p className='text-[#a4a4a4] capitalize'>{workspace.name}</p>}
            <h2 className='text-xs mt-4 mb-2 text-[#a4a4a4]'>Current Folder</h2>
            <p className='text-[#a4a4a4]'>{folder ? '' : 'This video is not in any folder'}</p>
        </div>
        <Separator orientation='horizontal' />
        <div className='flex flex-col gap-y-5 p-5 border-[1px] rounded-xl'>
            <h2 className='text-xs text-[#a4a4a4]'>Move to</h2>
            <Label className='flex flex-col gap-y-2'>
                <p className='text-xs'>Workspace</p>
                <select
                    {...register("workspaceId")}
                    className='rounded-xl text-base bg-transparent'
                >
                    {workspaces?.map((workspace) => (
                        <option 
                            key={workspace.id} 
                            value={workspace.id}
                            className='text-[#a4a4a4]'
                        >
                            {workspace.name}
                        </option>
                    ))}
                </select>
            </Label>
            {isFetching ? (
                <Skeleton className='w-full h-[40px] rounded-xl' />
            ) : (
                <Label className='flex flex-col gap-y-2'>
                    <p className='text-xs'>Folders in this workspace</p>
                    {isFolders && isFolders.length>0 ? (
                        <select
                            className='rounded-xl bg-transparent text-base'
                            {...register("folderId")}
                        >
                            {/* 1) Render the first folder as a disabled “placeholder” */}
                            <option
                                value=""
                                disabled
                                className="text-[#a4a4a4] italic"
                            >
                                {isFolders[0].name}
                            </option>
                            {isFolders?.map((folder, key) => (
                                key === 0 ? (
                                    <option 
                                        key={folder.id} 
                                        value={folder.id}
                                        className='text-[#a4a4a4]'
                                    >
                                        {folder.name}
                                    </option>
                                ) : (
                                    <option 
                                        key={folder.id} 
                                        value={folder.id}
                                        className='text-[#a4a4a4]'
                                    >
                                        {folder.name}
                                    </option>
                                )
                            ))}
                        </select>
                    ) : (
                        <p className='text-[#a4a4a4] text-sm'>No Folders</p>
                    )}
                </Label>
            )}
        </div>
        <Button>
            <Loader 
                state={isPending}
                color='#000'
            >
                Move
            </Loader>
        </Button>
    </form>
  )
}

export default ChangeVideolocation