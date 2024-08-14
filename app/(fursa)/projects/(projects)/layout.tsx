"use client"
import Image from "next/image";
import {usePathname} from 'next/navigation';
import { RiBuilding2Line } from "react-icons/ri";
import { TbDeviceImacSearch } from "react-icons/tb";
import { MdDomainVerification } from "react-icons/md";
import { TbFlagCancel } from "react-icons/tb";
import { IoTelescopeOutline } from "react-icons/io5";
import Link from 'next/link';


export default function ProjectsLayout({children}) {

    const pathname = usePathname()

    const project_links = [
        {
            name: 'Project',
            icon:RiBuilding2Line

        },
        {
            name: 'Official Search',
            icon:TbDeviceImacSearch

        },
        {
            name: 'Site Clearance',
            icon:MdDomainVerification

        },
        {
            name: 'Project Disputes',
            icon:TbFlagCancel

        },
        {
            name: 'Project Survey',
            icon:IoTelescopeOutline

        },

    ]

    return (
        <main className="flex  min-h-screen flex-col ">
            <div className={'flex justify-between  items-end w-full'}>
                <span className={'text-xs border-b-[1px] border-gray-600'}>{pathname}</span>
                <Link
                    href={'/projects/add_project'}
                    className={'shadow-lg  text-blue-800 cursor-pointer hover:scale-105 transition duration-300 ease-in-out shadow-blue-800/20 rounded-xl p-2 border-[0.8px] border-blue-800/20'}>
                    + add new project
                </Link>
            </div>
            <section className={'m-2 border-[0.8px] mt-10 w-full h-fit'}>
                <div className={' border-b-[0.9px] flex justify-around  border-gray-300 overflow-x-scroll'}>
                    {
                        project_links.map((item,index)=>(
                            <div className={'flex items-center gap-2 p-2 cursor-pointer'}>
                                <item.icon />
                                <span className={'hidden md:block'}>{item.name}</span>
                            </div>
                        ))
                    }
                </div>
                <div className={''}>
                    {children}
                </div>
            </section>
        </main>
    );
}
