import Image from "next/image"

const Heros = () => {
  return (
    <div className=' flex flex-col items-center justify-center max-w-5xl'>
        <div className=' flex items-center'>
            <div className=" relative w-[300px] h-[300px] sm:w-[350px] sm:h-[350px] md:h-[400px] md:w-[400px]">
                <Image src="/Multitaskingc.svg" fill objectFit="contain"  alt=""/>
            </div>
            <div className=" relative w-[400px] h-[400px] hidden md:block">
                <Image src={"/Task Management.svg"} fill objectFit="contain" alt=""/>

            </div>
        </div>
      
    </div>
  )
}

export default Heros
