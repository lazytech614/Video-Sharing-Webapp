import React from 'react'
import LandingPageNavbar from './_components/navbar'

const layout = ({children}: {children: React.ReactNode}) => {
  return (
    <div className='min-h-screen flex flex-col px-10 py-10 xl:px-0 container'>
        <LandingPageNavbar />
        {children}
    </div>
  )
}

export default layout