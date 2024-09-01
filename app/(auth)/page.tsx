import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function Onboard() {
  return (
    <div className='onboard_bg -z-10 flex items-center justify-center '>
        <div className="bg-white/50 backdrop-blur-[30px] gap-y-6 px-10 rounded-[10px] w-[90%] sm:w-2/6 py-2 flex flex-col items-center h-[90%] z-20 relative ">
        
            <div className=' text-[#17255A] sm:text-6xl text-4xl font-helveticaBold '>FCS</div>
            <Image src={'/logo1.jpg'}  width={120} height={120} alt='logo' className='shadow-xl sm:w-[120px] sm:h-[120px] w-[80px] h-[80px] shadow-gray-800/20 drop-shadow-2xl rounded-full' />
            <div>
                <p className='sm:text-xl text-sm  px-6 text-[#17255A] font-helveticaBold  w-full '>
                    <b className='text-[#FF8427] font-helveticaBold'>Revolutionalize Our</b>  <b>Business</b>
                </p>
                <p className=' text-[#17255A] font-helveticaBold text-center sm:text-xl text-sm pb-8 '>  Workflow</p>
                <p className='text-[#2c2c90]  border-b border-gray-800 pb-2 '><i>Welcome to the future of business management. Our  Web App  empowers our
                            organization with a new way of working that's simple, efficient, and effective. Say goodbye to
                            complicated systems and hello to streamlined processes that boost productivity and drive
                            growth.</i> </p>

            </div>
            <Link href={'/signin'} className='bg-[#17255A] hover:bg-[#FF8427] text-center text-[#FF8427] hover:text-[#17255A] font-helveticaBold rounded-md w-full  p-4 mx-10'>CLICK HERE TO LOGIN</Link>
        </div>
    </div>
  )
}

export default Onboard