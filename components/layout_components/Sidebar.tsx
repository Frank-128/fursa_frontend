'use client'
import {usePathname} from 'next/navigation'
import {sidebar_links} from '../../constants/links'
import Link from 'next/link'

export default function Sidebar(){

    const pathname = usePathname()




    return(
        <section className={'w-[8%] hidden  md:flex fixed h-[100vh]  flex-col items-center shadow-xl shadow-blue-800/20 '}>

            <div className={'text-[#17255a] text-2xl py-8 text-center'}>FEBO</div>

            {

                sidebar_links.map((item,index)=>(
                    <Link href={item.link} className={`  ${pathname === item.link || (item.link !== '/' && pathname.startsWith(item.link)) ? 'bg-[#17255a] text-white w-[112%]  -mr-2 rounded-r-xl hover:opacity-80' : 'text-[#abcadd] hover:scale-105'}  w-full py-4 transition duration-300 ease-in-out cursor-pointer  flex flex-col items-center`} key={index}>
                        <h1>
                            <item.icon/>
                        </h1>
                        <h1 className={'text-xs'}>{item.name}</h1>

                    </Link>
                ))
            }
        </section>
    )
}
