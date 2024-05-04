"use client";
import React from 'react'
import { useScrollTop } from '@/hooks/use-scroll-top'
import { cn } from '@/lib/utils';
import Logo from './Logo';
const Navbar = () => {
    const isScrolled = useScrollTop()
  return (
    <div className={cn(" z-50 w-full fixed top-0 flex items-center p-6 bg-background", isScrolled && "border-b shadow-sm")} >
        <Logo />
        <div className=' md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-2'>
            Login

        </div>
    </div>
  )
}

export default Navbar
