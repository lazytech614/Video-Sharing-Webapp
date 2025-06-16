'use client'

import { Menu, User, X } from 'lucide-react'
import Image from 'next/image'
import React, { useState } from 'react'
import { usePathname } from 'next/navigation'

import logo from "../../../../public/Nuvue-logo.svg"
import Link from 'next/link'
import { Button } from '@/components/ui/button'

const LandingPageNavbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const pathname = usePathname()

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const closeSidebar = () => {
    setIsSidebarOpen(false)
  }

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/pricing', label: 'Pricing' },
    { href: '/contact', label: 'Contact' }
  ]

  const isActiveLink = (href: string) => {
    return pathname === href
  }

  return (
    <>
      {/* Main Navbar */}
      <nav className='w-full bg-gradient-to-r from-gray-900/80 via-purple-900/80 to-violet-900/80 backdrop-blur-xl border-b border-purple-500/20 sticky top-0 z-30'>
        <div className='container mx-auto px-6 py-4'>
          <div className='w-full flex justify-between items-center'>
            {/* Logo Section */}
            <div className='flex items-center gap-x-3 text-2xl font-bold text-white'>

              <Image src={logo} width={36} height={36} alt='logo' className='drop-shadow-lg' />
              <span className='bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent'>
                Nuevue
              </span>
            </div>
            
            {/* Desktop Navigation */}
            <div className='hidden gap-x-8 items-center lg:flex'>
              {navLinks.map((link) => (
                <Link 
                  key={link.href}
                  href={link.href} 
                  className={`font-semibold px-6 py-2.5 rounded-full transition-all duration-300 ${
                    isActiveLink(link.href) 
                      ? 'bg-gradient-to-r from-purple-600 to-violet-600 text-white shadow-lg shadow-purple-500/25 transform scale-105' 
                      : 'text-purple-200 hover:text-white hover:bg-purple-500/20 hover:shadow-md hover:shadow-purple-500/10'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
            
            {/* Get Started Button */}
            <div className='flex items-center gap-2'>
                <Link href='/auth/sign-in'>
                <Button className='bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white font-semibold px-6 py-2.5 rounded-full flex items-center gap-x-2 border-0 shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300 transform hover:scale-105'>
                    <User className='w-4 h-4' />
                    Get Started
                </Button>
                </Link>
                <Menu 
                    className='w-7 h-7 cursor-pointer lg:hidden text-purple-300 hover:text-purple-200 transition-colors' 
                    onClick={toggleSidebar}
                />
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Mobile Sidebar */}
      <div className={`fixed top-0 left-0 h-full w-80 bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 shadow-2xl transform transition-transform duration-300 ease-out z-50 lg:hidden ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        {/* Sidebar Background Effects */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 right-5 w-32 h-32 bg-purple-500 rounded-full blur-2xl"></div>
          <div className="absolute bottom-20 left-5 w-40 h-40 bg-violet-500 rounded-full blur-2xl"></div>
        </div>
        
        <div className='relative p-6'>
          {/* Sidebar Header */}
          <div className='flex justify-between items-center mb-10'>
            <div className='flex items-center gap-x-3 text-xl font-bold'>
              <Image src={logo} width={32} height={32} alt='logo' className='drop-shadow-lg' />
              <span className='bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent'>
                Nuevue
              </span>
            </div>
            <button
              onClick={closeSidebar}
              className='p-2 rounded-full hover:bg-purple-500/20 transition-colors'
            >
              <X className='w-6 h-6 text-purple-200 hover:text-white' />
            </button>
          </div>
          
          {/* Sidebar Navigation */}
          <nav className='flex flex-col gap-y-4 mb-8'>
            {navLinks.map((link) => (
              <Link 
                key={link.href}
                href={link.href} 
                className={`font-semibold px-6 py-4 rounded-xl text-center transition-all duration-300 ${
                  isActiveLink(link.href)
                    ? 'bg-gradient-to-r from-purple-600 to-violet-600 text-white shadow-lg shadow-purple-500/25'
                    : 'text-purple-200 hover:text-white hover:bg-purple-500/20 hover:shadow-md hover:shadow-purple-500/10'
                }`}
                onClick={closeSidebar}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          
          {/* Sidebar Footer */}
          <div className='absolute bottom-6 left-6 right-6 text-center'>
            <p className='text-sm text-purple-300/60'>
              Join millions of creators
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default LandingPageNavbar