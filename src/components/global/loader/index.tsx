import React from 'react'
import Spinner from './spinner'

type Props = {
    state: boolean
    className?: string
    color?: string
    children?: React.ReactNode
}

const Loader = ({
    state,
    children
}: Props) => {
    if(state) 
        return <Spinner />
    else 
        return <>{children}</>
}

export default Loader