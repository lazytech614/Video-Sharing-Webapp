import Spinner from '@/components/global/loader/spinner'
import React from 'react'

type Props = {}

const PaymentPageLoading = (props: Props) => {
  return (
    <div className='h-screen flex justify-center items-center'>
        <Spinner />
    </div>
  )
}

export default PaymentPageLoading