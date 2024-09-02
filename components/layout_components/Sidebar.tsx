'use client'
import {usePathname, useRouter} from 'next/navigation'
import {sidebar_links} from '@/constants/links'
import Link from 'next/link'
import { globalStore } from '@/context/store'
import Image from 'next/image'
import { Accordion, AccordionBody, AccordionHeader } from '@material-tailwind/react'
import { useState } from 'react'

export default function Sidebar(){

    const pathname = usePathname()
    const user = globalStore(state=>state.user)
    const openNavbar = globalStore(state=>state.openNavbar)
    const [openLinks, setOpenLinks] = useState<string[]>([]);
    const router = useRouter();


    function Icon({ open }: { open: boolean }) {
        return (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className={`${
                    open ? "rotate-180 text-[#ff8427]" : "text-[#abcadd]"
                } h-5 w-5 transition-transform`}
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
            </svg>
        );
    }
    

    return(
        <section className={` ${openNavbar ?'w-[20vw]' : 'w-[8vw] z-10'} transition-all duration-300 ease-in-out hidden bg-[#17255a]  md:flex fixed h-[100vh]  flex-col items-center shadow-xl shadow-blue-800/20  py-8 `}>

            <Image src='/logo1.jpg' className={` rounded-full shadow-md shadow-[#ff8427] ${openNavbar ? 'w-[100px] h-[100px]':'w-[48px] h-[48px]'} transition-all duration-300 ease-in-out`} width={100} height={100} alt='FCS' />
            <div className={'text-[#ff8427] border-b-[0.8px] border-gray-500 w-full font-helveticaBold text-2xl py-4 text-center'}>FCS</div>

            <div className='flex flex-col items-center'>
            {

                sidebar_links.filter((item)=>user?.permissions.includes(item?.permission as string) || item?.permission === "all").map((item,index)=>{
                   
                    if (item?.sublinks?.length === 0) {
                        return (
                             <Link href={item?.link as string } className={` ${pathname.startsWith(item?.link as string) ? ' text-[#ff8427]  w-[9.5vw]  rounded-r-xl hover:opacity-80' : 'text-[#abcadd] hover:scale-105'}  w-full py-4 transition duration-300 ease-in-out cursor-pointer   flex px-4 gap-x-4 items-center`} key={index}>
                        <h1>
                            {item && <item.icon  className={` transition-all ${openNavbar ? 'text-lg' : 'text-2xl'} duration-300 ease-in-out`} />}
                        </h1>
                        <h1 className={`text-xs ${!openNavbar && 'hidden'}`}>{item?.name}</h1>

                    </Link>
                        );
                    } else {
                        return (
                            <Accordion
                                open={openLinks.includes(
                                    item?.name as string
                                )}
                               icon={openNavbar &&
                                    <Icon
                                        open={openLinks.includes(
                                            item?.name as string
                                        )}
                                    />
                                }
                            >
                                <AccordionHeader
                                    onClick={() =>
                                        setOpenLinks((prev) => {
                                            if (
                                                prev.includes(
                                                    item?.name as string
                                                )
                                            ) {
                                                return prev.filter(
                                                    (itm) =>
                                                        itm !== item?.name
                                                );
                                            }
                                            return [
                                                ...prev,
                                                item?.name as string,
                                            ];
                                        })
                                    }
                                    className="border-none"
                                >
                                    <span
                                        className={`text-[#abcadd] gap-2 px-2 flex items-center font-helvetica text-xs ${
                                            
                                            pathname.startsWith(
                                                item?.link as string
                                            )
                                                ? " text-[#ff8427]  rounded-r-xl hover:opacity-80"
                                                : "text-[#abcadd] hover:scale-105"
                                        }`}
                                    >
                                        {item && <item.icon className={` transition-all ${openNavbar ? 'text-lg' : 'text-2xl'} duration-300 ease-in-out`} />}

                                        {openNavbar && item?.name}
                                    </span>
                                </AccordionHeader>
                                <AccordionBody
                                    className={"p-0  space-y-2 w-full"}
                                >
                                    {item?.sublinks?.map(
                                        (subItm, subItmKey) => (
                                            <div
                                                key={subItmKey}
                                                onClick={() => {
                                                    router.push(
                                                        subItm?.link as string
                                                    );
                                                    
                                                }}
                                                className={`flex w-full items-center font-helvetica gap-4 px-8 cursor-pointer ${
                                                    pathname ===
                                                        subItm?.link ||

                                                        (pathname ===
                                                        subItm?.link &&    
                                                    pathname.startsWith(
                                                        subItm?.link as string)
                                                    )
                                                        ? " text-[#ff8427]  rounded-r-xl hover:opacity-80"
                                                        : "text-[#abcadd] hover:scale-105"
                                                }`}
                                            >
                                                <div>
                                                    {subItm && (
                                                        <subItm.icon className={` transition-all ${openNavbar ? 'text-lg' : 'text-2xl'} duration-300 ease-in-out`} />
                                                    )}
                                                </div>
                                                <span className={!openNavbar ? 'hidden' : ''}>{subItm?.name}</span>
                                            </div>
                                        )
                                    )}
                                </AccordionBody>
                            </Accordion>
                        );
                    }
                })}


            
            </div>
        </section>
    )
}
