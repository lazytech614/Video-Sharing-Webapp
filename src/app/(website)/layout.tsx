import React from 'react'
import LandingPageNavbar from './_components/navbar'
import Footer from './_components/footer'

const layout = ({children}: {children: React.ReactNode}) => {
  return (
    <div className='min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 text-white'>
        <LandingPageNavbar />
        {children}
        <Footer />
    </div>
  )
}

export default layout