import React from 'react'
import Image from 'next/image'
import { Poppins } from 'next/font/google'
import { cn } from '@/lib/utils'
const poppins = Poppins({
    subsets: ['latin'],
    weight: ["400", "600"]
})
const Logo = () => {
  return (
    <div className=' hidden md:flex items-center gap-x-2'>
        <Image src={"/icon.svg"} alt='logo' height={35} width={35} />

        <p className={cn(" font-semibold", poppins.className)}>
            Gotion
        </p>
      
    </div>
  )
}

export default Logo
