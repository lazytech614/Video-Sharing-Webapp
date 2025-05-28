import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { register } from 'module';
import React from 'react'

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
    //TODO: Create the useMoveVideoLocation hook to handle the video location change

  return (
    <form className='flex flex-col gap-y-5'>
        <div className='border-[1px] rounded-xl p-5'>
            <h2 className='text mb-5 text-[#a4a4a4]'>Current</h2>
            <p className='text-[#a4a4a4]'>Workspace</p>
            <p className='text-[#a4a4a4]'>This video has no folder</p>
        </div>
        <Separator orientation='horizontal' />
        <div className='flex flex-col gap-y-5 p-5 border-[1px] rounded-xl'>
            <h2 className='text-xs text-[#a4a4a4]'>Move to</h2>
            <Label className='flex flex-col gap-y-2'>
                <p className='text-xs'>Workspace</p>
                <select
                    // {...register('workspace_id')}
                    className='rounded-xl text-base bg-transparent'
                >
                    <option 
                        className='text-[#a4a4a4]'
                        value={"Workspace 1"}
                    >Workspace 1</option>
                </select>
            </Label>
        </div>
    </form>
  )
}

export default ChangeVideolocation