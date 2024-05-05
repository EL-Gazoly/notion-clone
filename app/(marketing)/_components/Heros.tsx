import Image from "next/image"
import { useTheme } from "next-themes"

const Heros = () => {
    
  return (
    <div className=' flex flex-col items-center justify-center max-w-5xl'>
        <div className=' flex items-center'>
            <div className=" relative w-[300px] h-[300px] sm:w-[350px] sm:h-[350px] md:h-[400px] md:w-[400px]">
                <Image src="/Multitaskingc.svg" fill objectFit="contain"  alt="" className=" dark:hidden"/>
                <Image src="/Multitasking-dark.svg" fill objectFit="contain"  alt="" className=" hidden dark:block"/>
            </div>
            <div className=" relative w-[400px] h-[400px] hidden md:block">
                <Image src={"/Task Management.svg"} fill objectFit="contain" alt="" className=" dark:hidden"/>
                <Image src={"/Task Management-dark.svg"} fill objectFit="contain" alt="" className=" hidden dark:block mt-3 ml-6"/>

            </div>
        </div>
      
    </div>
  )
}

export default Heros
