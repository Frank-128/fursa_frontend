'use client'
import {usePathname} from 'next/navigation'
import {sidebar_links} from '@/constants/links'
import Link from 'next/link'
import { globalStore } from '@/context/store'

export default function Sidebar(){

    const pathname = usePathname()
    const user = globalStore(state=>state.user)

    console.log(user?.permissions)

    return(
        <section className={'w-[8vw] hidden  md:flex fixed h-[100vh]  flex-col items-center shadow-xl shadow-blue-800/20 '}>

            <div className={'text-[#17255a] text-2xl py-4 text-center'}>FEBO</div>

            {

                sidebar_links.filter((item)=>user?.permissions.includes(item?.permission as string) || item?.permission === "all").map((item,index)=>(
                    <Link href={item?.link as string} className={`  ${pathname === item?.link || (item?.link !== '/' && pathname.startsWith(item?.link as string)) ? 'bg-[#17255a] text-white  w-[9.5vw]  rounded-r-xl hover:opacity-80' : 'text-[#abcadd] hover:scale-105'}  w-full py-4 transition duration-300 ease-in-out cursor-pointer  flex flex-col items-center`} key={index}>
                        <h1>
                            {item && <item.icon/>}
                        </h1>
                        <h1 className={'text-xs'}>{item?.name}</h1>

                    </Link>
                ))
            }
        </section>
    )
}
