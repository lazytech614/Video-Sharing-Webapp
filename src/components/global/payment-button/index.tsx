"use client"

import { Button } from '@/components/ui/button'
import React from 'react'
import Loader from '../loader'
import { useSubscription } from '@/hooks/useSubscription'

const PaymentButton = () => {
    const {onSubscribe, isProcessing} = useSubscription()

  return (
    <Button 
        type='button' 
        className="text-sm mt-2 w-full" 
        onClick={onSubscribe}
    >
        <Loader 
            state={isProcessing}
            color='#000'
        >
            <span>Upgrade Plan</span>
        </Loader>
    </Button> 
  )
}

export default PaymentButton