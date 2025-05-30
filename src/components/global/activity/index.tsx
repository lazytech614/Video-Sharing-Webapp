import { TabsContent } from '@/components/ui/tabs'
import React from 'react'

type Props = {}

const Activity = (props: Props) => {
  return (
    <TabsContent
        value='activity'
        className='p-5 bg-[#1d1d1d] rounded-xl flex flex-col gap-y-6'
    >
        Make changes to your account.
    </TabsContent>
  )
}

export default Activity