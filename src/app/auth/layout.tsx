import React from 'react'

type Props = {
    children: React.ReactNode
}

const layout = ({children}: Props) => {
  return (
    <div className='container min-h-screen flex items-center justify-center'>
        {children}
    </div>
  )
}

export default layout