"use client"

import { cn } from '@/lib/utils';
import { usePathname, useRouter } from 'next/navigation';
import React, { useRef, useState } from 'react'
import Loader from '../loader';
import { FolderIcon } from 'lucide-react';
import { useMutationData } from '@/hooks/useMutationData';
import { renameFolder } from '@/actions/workspace';
import { Input } from '@/components/ui/input';
import { useMutationDataState } from '@/hooks/useMutationDataState';

type Props = {
    name: string;
    id: string;
    optimistic?: boolean;
    count?: number;
}

const Folder = ({name, id, optimistic, count}: Props) => {
    const pathname = usePathname()
    const router = useRouter()

    const [onRename, setOnRename] = useState(false)
    const inputRef = useRef<HTMLInputElement | null>(null);
    const folderCardRef = useRef<HTMLDivElement | null>(null);

    const Rename = () => setOnRename(true)
    const Renamed = () => setOnRename(false)

    const {mutate, isPending} = useMutationData(
        ['rename-folder'],
        (data: {name: string}) => renameFolder(id, name),
        'workspace-folders',
        Renamed  // Onsuccess callback
    )

    const {latestVariables} = useMutationDataState(['rename-folder'])

    const handleFolderClick = () => {
        if(onRename) {
            return;
        }
        router.push(`${pathname}/folder/${id}`);
    }

    const handleNameDoubleClick = (e: React.MouseEvent<HTMLParagraphElement>) => {
        e.stopPropagation();
        Rename();
    }

    const updateFolderName = (e: React.FocusEvent<HTMLInputElement>) => {
        if(inputRef.current && folderCardRef.current) {
            if(inputRef.current.value) {
                mutate({name: inputRef.current.value, id});
            }else {
                Renamed();
            }
        }
    }

    return (
    <div 
        onClick={handleFolderClick} 
        ref={folderCardRef}
        className={cn( optimistic && "opacity-60", `flex hover:bg-purple-400/10 cursor-pointer transition duration-150 items-center gap-2 justify-between min-w-[250px] py-4 px-4 rounded-lg border-[1px] border-purple-400`)}>
        <Loader state={isPending}>
            <div className='flex flex-col gap-[1px]'>
                {onRename ? 
                    <Input 
                        autoFocus
                        onBlur={(e) => updateFolderName(e)}
                        placeholder={name}
                        className='border-none text-base w-full outline-none text-neutral-300 bg-transparent p-0'
                        ref={inputRef}
                    /> : <p 
                            onClick={(e) => e.stopPropagation()}
                            onDoubleClick={handleNameDoubleClick}
                            className='text-neutral-300'
                        >
                            {latestVariables && latestVariables.status === "pending" && latestVariables.variables.id === id ?
                            latestVariables.variables.name : name}
                        </p>
                }
                <span className='text-sm text-neutral-500'>{count || 0} Videos</span>
            </div>
        </Loader>
        <FolderIcon size={20} className='text-[#fff]' />
    </div>
  )
}

export default Folder