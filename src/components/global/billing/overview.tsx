import { getPaymentInfo } from '@/actions/user'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'
import React from 'react'

type Props = {}

const BillingOverview = async (props: Props) => {
    const {data: payment} = await getPaymentInfo()

  return (
    <div className='bg-[#1d1d1d] p-5 rounded-xl flex justify-between items-start'>
        <div className='flex flex-col items-start gap-y-8'>
            <div>
                <h2 className='text-2xl'>Current Plan</h2>
                <p className='text-[#9d9d9d] capitalize'>Your payment history</p>
            </div>
            <div>
                <h2 className='text-2xl'>
                    ${payment?.subscription?.plan === 'PRO' ? '99' : '0'} / Month
                </h2>
                <p className='text-[#9d9d9d] capitalize'>{payment?.subscription?.plan} Plan</p>
            </div>
        </div>
        {/* //TODO: make this button functional */}
        <Button className='text-sm mt-2' variant={"ghost"}>
            <X size={12} className='text-[#9d9d9dce]' />
            <p className='text-[#9d9d9dce] capitalize'>cancel your plan</p>
        </Button>
    </div>
  )
}

export default BillingOverview