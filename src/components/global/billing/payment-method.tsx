import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import React from 'react'

type Props = {}

const PaymentMethod = (props: Props) => {
  return (
    <div className='bg-[#1d1d1d] p-5 rounded-xl flex flex-col gap-y-8'>
        <div className='flex justify-between items-start'>
            <div className='flex flex-col'>
                <h2 className='text-2xl capitalize'>Payment Method</h2>
                <p className='text-[#9d9d9d] capitalize'>Your current payment method</p>
            </div>
            {/* TODO: make this button functional  */}
            <Button variant={"ghost"}>
                <Plus size={12} className='text-[#9d9d9dce]' />
                <p className='text-[#9d9d9dce] capitalize'>add new</p>
            </Button>
        </div>
        <div className='flex flex-col gap-y-4'>
            {/* TODO: Will fetch different payment methods used later. Now mock data is used. */}
            <div className='bg-[#252525] hover:bg-[#252525d8] p-5 rounded-xl flex gap-x-4 items-start cursor-pointer'>
                <div className='flex flex-col gap-y-2'>
                    <h2 className='uppercase font-bold text-2xl text-[#9d9d9d]'>VISA</h2>
                    <p className='text-sm capitalize text-[#a4a4a4]'>Express</p>
                </div>
                <div className='flex flex-col gap-y-2 text-[#a4a4a4]'>
                    <p>**** **** **** 1234</p>
                    <p>01/23</p>
                </div>
            </div>
            <div className='bg-[#252525] hover:bg-[#252525d8] p-5 rounded-xl flex gap-x-4 items-start cursor-pointer'>
                <div className='flex flex-col gap-y-2'>
                    <h2 className='uppercase font-bold text-2xl text-[#9d9d9d]'>America</h2>
                    <p className='text-sm capitalize text-[#a4a4a4]'>Express</p>
                </div>
                <div className='flex flex-col gap-y-2 text-[#a4a4a4]'>
                    <p>**** **** **** 3434</p>
                    <p>12/25</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default PaymentMethod