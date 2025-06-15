import React from 'react'
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs"
import CreateWorkspace from '@/components/global/create-workspace'
import CreateFolder from '@/components/global/create-folder'
import Folders from '@/components/global/Folders'
import Videos from '@/components/global/videos'

type Props = {
  params: {workspaceId: string}
}

const WorkspaceIdPage = async ({ params }: Props) => {
  
  return (
    <div>
      <Tabs defaultValue='videos' className='mt-6'>
        <div className='w-full flex justify-between items-center'>
          <TabsList className='bg-transparent gap-2 pl-0'>
            <TabsTrigger 
              value='videos' 
              className='p-[13px] px-6 rounded-full data-[state=active]:bg-[#252525]'
            >
              Videos
            </TabsTrigger>
            <TabsTrigger 
              value='archive'
              className='p-[13px] px-6 rounded-full data-[state=active]:bg-[#252525]'
            >
              Archive
            </TabsTrigger>
          </TabsList>
          <div className='flex gap-x-3'>
            <CreateWorkspace />
            <CreateFolder workspaceId={params.workspaceId} />
          </div>
        </div>
        <section className='py-9'>
          <TabsContent value='videos'>
            <Folders workspaceId={params.workspaceId} />
            {/* TODO: Add logic to show first few videos or something like that */}
            <Videos  folderId={params.workspaceId} workspaceId={params.workspaceId} videoKey=''/>
          </TabsContent>
        </section>
      </Tabs>
    </div>
  )
}

export default WorkspaceIdPage