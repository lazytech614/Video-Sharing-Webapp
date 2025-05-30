import { Button } from '@/components/ui/button'
import { TabsContent } from '@/components/ui/tabs'
import React from 'react'
import Loader from '../loader'
import { Bot, Captions, Download, FileTextIcon, Pencil, StarsIcon, Video } from 'lucide-react'

type Props = {
    plan: 'PRO' | 'FREE',
    trial: boolean,
    videoId: string
}

const AiTools = ({plan, trial, videoId}: Props) => {
    //TODO: Setup the ai hook

  return (
    <TabsContent
        value='ai tools'
        className='p-5 bg-[#1d1d1d] rounded-xl flex flex-col gap-y-10'
    >
        <div className='flex flex-col gap-y-4'>
            <div className='flex lg:flex-col'>
                <div className='w-8/12'>
                    <h2 className='text-3xl font-bold'>AI Tools</h2>
                    <p className='text-[#bdbdbd]'>
                        Taking your video to next <br /> step with the power of AI!
                    </p>
                </div>
                <div className='flex items-center justify-between gap-4 lg:justify-start lg:gap-2'>
                    <Button className='text-sm mt-2'>
                        <Loader
                            state={false}
                            color='#000'
                        >
                            Try Now
                        </Loader>
                    </Button>
                    {/* TODO: pay button */}
                    <Button className='text-sm mt-2' variant={"secondary"}>
                        <Loader
                            state={false}
                            color='#000'
                        >
                            Pay Now
                        </Loader>
                    </Button>
                    {/* //TODO: generate button */}
                    {/* <Button className='text-sm mt-2'>
                        <Loader
                            state={false}
                            color='#000'
                        >
                            Generate Now
                        </Loader>
                    </Button> */}
                </div>
            </div>
            <div className='flex flex-col bg-[#1b0f1b7f] border-[1px] rounded-xl p-4 gap-4'>
                <div className='flex items-center gap-2'>
                    <h2 className='text-2xl font-bold text-[#a22fe0]'>Nuvue AI</h2>
                    <StarsIcon color='#a22fe0' fill='#a22fe0' />
                </div>
                <div className='flex gap-2 items-start'>
                    <div className='p-2 rounded-full border-[#2d2d2d] border-[2px] bg-[#2b2b2b]'>
                        <Pencil color='#a22fe0' />
                    </div>
                    <div className='flex flex-col'>
                        <h3 className='font-medium'>Summary</h3>
                        <p className='text-muted-foreground text-sm'>
                            Generate a description for your video using AI.
                        </p>
                    </div>
                </div>
                <div className='flex gap-2 items-start'>
                   <div className='p-2 rounded-full border-[#2d2d2d] border-[2px] bg-[#2b2b2b]'>
                    <FileTextIcon color='#a22fe0' />
                   </div>
                   <div className='flex flex-col'>
                    <h3 className='font-medium'>Transcript</h3>
                    <p className='text-muted-foreground text-sm'>
                        Generate a transcript for your video using AI.
                    </p>
                   </div>
                </div>
                <div className='flex gap-2 items-start'>
                   <div className='p-2 rounded-full border-[#2d2d2d] border-[2px] bg-[#2b2b2b]'>
                    <Bot color='#a22fe0' />
                   </div>
                   <div className='flex flex-col'>
                    <h3 className='font-medium'>AI Agent</h3>
                    <p className='text-muted-foreground text-sm'>
                        Viewers can ask questions on your video and our AI agent will answer them.
                    </p>
                   </div>
                </div>
            </div>
        </div>
    </TabsContent>
  )
}

export default AiTools