'use client'
import {useState} from 'react'
import {usePathname, useRouter} from 'next/navigation'
import {sidebar_links} from '../../constants/links'
import Link from 'next/link'
import {Drawer} from '@material-tailwind/react'
import {
    Popover,
    PopoverHandler,
    PopoverContent,
    Button,
    Avatar,
    List,
    ListItem,
    ListItemPrefix
} from "@material-tailwind/react";
import {IoCalendarOutline, IoSettingsOutline, IoMenuOutline, IoListOutline} from "react-icons/io5";
import {BiMessageSquareDetail} from "react-icons/bi";
import {CiBellOn} from "react-icons/ci";
import {RiLogoutCircleRLine} from "react-icons/ri";
import {tasks} from '../../constants/tasks'
import moment from 'moment'

export default function Main({children}) {
    const [openNavbar, setOpenNavbar] = useState(false)
    const pathname = usePathname()
    const router = useRouter()
    const [isCalendar, setIsCalendar] = useState(false);
    const [openRightBar, setOpenRightBar] = useState(false)

    return (
        <main className={`  ${openNavbar && 'fixed'}  top-0 left-0 h-screen w-screen oz-10 `}>
            <div className={`md:w-[67%]  md:left-[8%]   absolute h-screen  w-screen mt-24 md:mt-0  p-4`}>
                {children}
            </div>
            <div
                className={'flex md:hidden justify-between  bg-white items-center top-0 left-0 fixed h-24 px-10 w-full bg-white shadow-xl shadow-blue-800/20 '}>
                <div>
                    <span onClick={() => setOpenNavbar(true)}><IoMenuOutline fontSize={40}/></span>
                </div>
                <div className={'text-[#17255a] text-2xl font-bold'}>
                    FEBO
                </div>

                <Popover>
                    <PopoverHandler>
                        <Avatar src={'/amandla.jpg'} alt={"avatar"}/>
                    </PopoverHandler>
                    <PopoverContent className={''}>
                        <div className={'p-2 border-b-[0.8px] border-gray-600 text-xs'}>
                            <IoCalendarOutline/>
                            <span>My calendar</span>

                        </div>
                        <div className={'p-2 border-b-[0.8px] border-gray-600 text-xs'}>

                            <span> My profile</span>
                        </div>
                        <div className={'p-2 border-b-[0.8px] border-gray-600 text-xs'}>
                            <span>Logout</span>
                        </div>
                    </PopoverContent>
                </Popover>

            </div>
            <Drawer className={'relative'} placement={"left"} open={openNavbar}
                    onClose={() => setOpenNavbar(false)}>

                <div
                    className={'text-[#17255a] flex items-center justify-center font-bold text-3xl p-4 border-b-[0.9px] border-gray-500'}>
                    FEBO
                </div>
                <List className={''}>
                    {
                        sidebar_links.map((item, index) => <ListItem key={index} onClick={() => {
                            router.push(item.link);
                            setOpenNavbar(false)
                        }}
                                                                     className={`flex justify-center items-center  ${pathname === item.link || (item.link !== '/' && pathname.startsWith(item.link))? 'bg-[#17255a] text-white  rounded-r-xl hover:opacity-80' : 'text-[#abcadd] hover:scale-105'}`}>
                            <ListItemPrefix>
                                <item.icon/>
                            </ListItemPrefix>
                            <span>{item.name}</span>
                        </ListItem>)
                    }
                </List>
                <div className={'absolute bottom-0 left-0 w-full border-t-[0.9px] border-gray-500'}>
                    <div className={'flex gap-2 items-center p-2'}>
                        <BiMessageSquareDetail/>
                        <span>Messages</span>
                    </div>
                    <div className={'flex gap-2 items-center p-2'}>
                        <CiBellOn/>
                        <span>Notifications</span>
                    </div>
                    <div className={'flex gap-2 items-center p-2'}>
                        <IoSettingsOutline/>
                        <span>Settings</span>
                    </div>
                    <div className={'flex gap-2 items-center p-2'}>
                        <RiLogoutCircleRLine/>
                        <span>Logout</span>
                    </div>
                </div>
            </Drawer>

        </main>
    )
}
