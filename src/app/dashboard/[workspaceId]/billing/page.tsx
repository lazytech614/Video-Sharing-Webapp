import React from 'react'

import BillingOverview from '@/components/global/billing/overview'
import PaymentHistory from '@/components/global/billing/payment-history'
import PaymentMethod from '@/components/global/billing/payment-method'

type Props = {}

const BillingPage = (props: Props) => {

  return (
    <div className='grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-4'>
        <div className="col-span-1">
            <BillingOverview />
        </div>
        <div className="lg:row-span-2">
            <PaymentHistory />
        </div>
        <div className="col-span-1">
            <PaymentMethod />
        </div>
    </div>
  )
}

export default BillingPage