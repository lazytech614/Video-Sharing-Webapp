import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { UserButton } from '@clerk/nextjs'
import { Search, UploadIcon, VideoIcon } from 'lucide-react'
import React from 'react'

type Props = {}

const InfoBar = (props: Props) => {
    //TODO: Implement search functionality
    //TODO: Implement upload functionality
    //TODO: Implement record functionality

  return (
    <header className='pl-20 md:pl-[265px] fixed p-4 w-full flex items-center justify-between gap-4'>
        <div className='flex gap-4 justify-center items-center border-2 rounded-full px-4 w-full max-w-lg'>
            <Search className='w-4 h-4 text-[#707070]' />
            <Input
                className='bg-transparent border-none outline-none !placeholder-neutral-500' 
                placeholder='Search for people, projects, tags and folders'
            />
        </div>
        <div className='flex items-center gap-4'>
            <Button className='bg-[#9d9d9d] flex items-center gap-2'>
                <UploadIcon size={30} />
                <span className='flex items-center gap-2'>Upload</span>
            </Button>
            <Button className='bg-[#9d9d9d] flex items-center gap-2'>
                <VideoIcon size={30} />
                <span className='flex items-center gap-2'>Record</span>
            </Button>
            <UserButton />
        </div>
    </header>
  )
}

export default InfoBar