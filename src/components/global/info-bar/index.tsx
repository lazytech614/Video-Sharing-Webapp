"use client"

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { UserButton } from '@clerk/nextjs'
import { Search, UploadIcon, VideoIcon } from 'lucide-react'
import React, { useState } from 'react'

const InfoBar = () => {
    //TODO: Implement search functionality
    //TODO: Implement upload functionality

    const [showDownload, setShowDownload] = useState(false)
    const handleRecordClick = async () => {
        try {
            const protocolUrl = 'nuevue-recorder://record'
            
            // Method 1: Try window.open first (most reliable)
            const newWindow = window.open(protocolUrl, '_self')
            
            // Method 2: Fallback to location.href
            if (!newWindow || newWindow.closed) {
                window.location.href = protocolUrl
            }
            
            // Check if app launched successfully after a delay
            setTimeout(() => {
                // If we're still focused on the browser, assume the app didn't launch
                if (document.hasFocus()) {
                    setShowDownload(true)
                }
            }, 3000) // Increased timeout to 3 seconds
            
        } catch (error) {
            console.error('Failed to launch recorder:', error)
            setShowDownload(true)
        }
    }

    const handleDownloadApp = () => {
        // Replace with your actual download URL
        window.open('https://your-domain.com/download/nuevue-recorder-setup.exe', '_blank')
    }


  return (
    <header className='pl-20 md:pl-[265px] fixed p-4 px-8 w-full flex flex-col md:flex-row items-end md:items-center justify-between gap-4 z-[20]'>
        <div className='flex gap-4 justify-center items-center border border-purple-400 rounded-full px-4 w-full max-w-lg'>
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
            <Button onClick={handleRecordClick} className='bg-[#9d9d9d] flex items-center gap-2'>
                <VideoIcon size={30} />
                <span className='flex items-center gap-2'>Record</span>
            </Button>
            <UserButton />
        </div>
    </header>
  )
}

export default InfoBar