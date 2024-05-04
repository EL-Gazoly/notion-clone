import React, { ReactNode } from 'react'
import Navbar from './_components/Navbar'

const MarketingLayout = ({children} : {children : ReactNode}) => {
  return (
    <div className=' h-full'>
        <Navbar />
        <div className=' h-full pt-40'>
        {children}
        </div>
    </div>
  )
}

export default MarketingLayout