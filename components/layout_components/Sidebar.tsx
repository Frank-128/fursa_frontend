'use client'
import {usePathname} from 'next/navigation'
import {sidebar_links} from '@/constants/links'
import Link from 'next/link'
import { globalStore } from '@/context/store'
import Image from 'next/image'

export default function Sidebar(){

    const pathname = usePathname()
    const user = globalStore(state=>state.user)
    const openNavbar = globalStore(state=>state.openNavbar)

    

    return(
        <section className={` ${openNavbar ?'w-[20vw]' : 'w-[8vw] z-10'} transition-all duration-300 ease-in-out hidden bg-[#17255a]  md:flex fixed h-[100vh]  flex-col items-center shadow-xl shadow-blue-800/20  py-8 `}>

            <Image src='/logo1.jpg' className={` rounded-full shadow-md shadow-[#ff8427] ${openNavbar ? 'w-[100px] h-[100px]':'w-[48px] h-[48px]'} transition-all duration-300 ease-in-out`} width={100} height={100} alt='FCS' />
            <div className={'text-[#ff8427] border-b-[0.8px] border-gray-500 w-full font-helveticaBold text-2xl py-4 text-center'}>FCS</div>

            <div className='flex flex-col items-center'>
            {

                sidebar_links.filter((item)=>user?.permissions.includes(item?.permission as string) || item?.permission === "all").map((item,index)=>(
                    <Link href={item?.link as string || "/dashboard"} className={` ${pathname.startsWith(item?.link as string) ? ' text-[#ff8427]  w-[9.5vw]  rounded-r-xl hover:opacity-80' : 'text-[#abcadd] hover:scale-105'}  w-full py-4 transition duration-300 ease-in-out cursor-pointer   flex px-4 gap-x-4 items-center`} key={index}>
                        <h1>
                            {item && <item.icon  className={` transition-all ${openNavbar ? 'text-lg' : 'text-2xl'} duration-300 ease-in-out`} />}
                        </h1>
                        <h1 className={`text-xs ${!openNavbar && 'hidden'}`}>{item?.name}</h1>

                    </Link>
                ))
            }
            </div>
        </section>
    )
}
