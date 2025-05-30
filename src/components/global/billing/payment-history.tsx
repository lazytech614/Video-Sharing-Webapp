import { Button } from '@/components/ui/button'
import { Download } from 'lucide-react'
import React from 'react'

type Props = {}

const PaymentHistory = (props: Props) => {
  return (
    <div className='bg-[#1d1d1d] p-5 rounded-xl flex flex-col gap-y-8'>
        <div className='flex justify-between items-start'>
            <div className='flex flex-col'>
                <h2 className='text-2xl'>Payment History</h2>
                <p className='text-[#9d9d9d] capitalize'>Your payment history</p>
            </div>
            {/* //TODO: make this button functional */}
            <Button variant={"secondary"}>
                <Download size={12} className='text-[#9d9d9dce]' />
                <p className='text-[#9d9d9dce] capitalize'>Download PDF</p>
            </Button>
        </div>
        {/* //TODO: Make hook to get this transaction value */}
        <div className='grid grid-cols-[1fr_1fr_0.5fr] gap-x-2'>
            <div className='flex flex-col gap-y-4'>
                <p className='text-[#6b6b6bbc] capitalize'>Billing date</p>
                <div className='flex flex-col gap-y-2'>
                    <p className='text-[#9d9d9d]'>July 1st 2024</p>
                    <p className='text-[#9d9d9d]'>December 23rd 2024</p>
                    <p className='text-[#9d9d9d]'>January 1st 2025</p>
                </div>
            </div>
            <div className='flex flex-col gap-y-4'>
                <p className='text-[#6b6b6bbc] capitalize'>Transaction ID</p>
                <div className='flex flex-col gap-y-2'>
                    <p className='text-[#9d9d9d]'>WIUERHI32</p>
                    <p className='text-[#9d9d9d]'>IUWEIU323</p>
                    <p className='text-[#9d9d9d]'>32IEBIDDD</p>
                </div>
            </div>
            <div className='flex flex-col items-end gap-y-4'>
                <p className='text-[#6b6b6bbc] capitalize'>Amount</p>
                <div className='flex flex-col gap-y-2'>
                    <p className='text-[#9d9d9d]'>$ 99</p>
                    <p className='text-[#9d9d9d]'>$ 99</p>
                    <p className='text-[#9d9d9d]'>$ 99</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default PaymentHistory