"use client";
import React from 'react'
import { useScrollTop } from '@/hooks/use-scroll-top'
import { cn } from '@/lib/utils';
import Logo from './Logo';
import { ModeToggle } from '@/components/mode-toggle';
import { useConvexAuth } from 'convex/react';
import { SignInButton } from '@clerk/clerk-react';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/Spinner';
const Navbar = () => {
    const isScrolled = useScrollTop()
    const { isAuthenticated, isLoading } = useConvexAuth()
  return (
    <div className={cn(" z-50 w-full fixed top-0 flex items-center p-6 bg-background dark:bg-dark-bg", isScrolled && "border-b shadow-sm")} >
        <Logo />
        <div className=' md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-2'>
          {
            isLoading && 
            <Spinner />
          }
          {
            ! isAuthenticated && !isLoading && 
            <>
              <SignInButton mode='modal'>
                <Button variant={"ghost"} size={"sm"}>Log in</Button>
              </SignInButton>
              <SignInButton mode='modal'>
                <Button  size={"sm"}>Get Gotion free</Button>
              </SignInButton>
            </>
          }
            <ModeToggle />

        </div>
    </div>
  )
}

export default Navbar
