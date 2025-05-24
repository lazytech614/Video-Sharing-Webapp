import { Menu, User } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

import logo from "../../../../public/Nuvue-logo.svg"
import Link from 'next/link'
import { Button } from '@/components/ui/button'

const LandingPageNavbar = () => {
  return (
    <div className='w-full flex justify-between items-center'>
        <div className='flex items-center gap-x-3 text-3xl font-semibold'>
            <Menu className='w-8 h-8'/>
            <Image src={logo} width={40} height={40} alt='logo' />
            Nuevue
        </div>
        <div className='hidden gap-x-10 items-center lg:flex'>
            <Link href='/' className='font-semibold bg-[#7320DD] px-6 py-2 rounded-full hover:bg-[#7320DD]/80'>Home</Link>
            <Link href='/'>Pricing</Link>
            <Link href='/'>Contact</Link>
        </div>
        <Link href='/auth/sign-in'>
            <Button className='text-base flex gap-x-2'>
                <User className='w-4 h-4' fill='#000'/>
                Log in
            </Button>
        </Link>
    </div>
  )
}

export default LandingPageNavbar