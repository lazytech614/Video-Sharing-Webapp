import { completeSubscription } from '@/actions/user'
import { redirect } from 'next/navigation'
import React from 'react'

type Props = {
    searchParams: Promise<{
        session_id?: string, 
        cancel?: boolean
    }>
}

const PaymentPage = async ({
    searchParams
}: Props) => {
    const { session_id, cancel } = await searchParams
    if(session_id) {
        const customer = await completeSubscription(session_id)

        if(customer.status === 200) {
            return redirect(`/auth/callback`)
        }
    }

    if(cancel) {
        return (
            <div className='flex flex-col justify-center items-center h-screen w-full'>
                <h4 className='text-5xl font-bold'>Error 404</h4>
                <p className='text-xl text-center'>Oops! Something went wrong</p>
            </div>
        )
    }
}

export default PaymentPage