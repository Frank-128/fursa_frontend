"use client";
import React, { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { sidebar_links } from "@/constants/links";
import { Drawer, Input } from "@material-tailwind/react";
import {
    Popover,
    PopoverHandler,
    PopoverContent,
    Avatar,
    List,
    ListItem,
    ListItemPrefix,
} from "@material-tailwind/react";
import {
    IoCalendarOutline,
    IoSettingsOutline,
    IoMenuOutline,
    IoClose,
} from "react-icons/io5";
import { BiLogOut, BiMessageSquareDetail, BiUser } from "react-icons/bi";
import { CiBellOn } from "react-icons/ci";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { FaSearch } from "react-icons/fa";
import moment from "moment";
import { globalStore } from "@/context/store";
import Image from "next/image";

export default function Main({ children }: { children: React.ReactNode }) {
    const {openNavbar, handleNavbar,openSmallScreenNavbar,handleSmallScreenNavbar} = globalStore(state=>({openNavbar:state.openNavbar,handleNavbar:state.handleNavbar,openSmallScreenNavbar:state.openSmallScreenNavbar,handleSmallScreenNavbar:state.handleSmallScreenNavbar}))
    const pathname = usePathname();
    const router = useRouter();
    const user = globalStore((state) => state.user);
    const logout = globalStore((state) => state.logout);


    const [currentTime, setCurrentTime] = useState(moment());

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentTime(moment());
        }, 60000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <main
            className={`  ${
                openSmallScreenNavbar && "fixed"
            }  top-0 left-0 h-screen w-screen `}
        >
            <div
                className={`${openNavbar ?'md:w-[80vw]  md:left-[20vw]' : 'md:w-[92vw]  md:left-[8vw]'} transition-all duration-300 ease-in-out  absolute h-screen   w-screen mt-24 `}
            >
                <div className="p-4">

                {children}
                </div>
                <div
                className={`bg-[#ff8427] text-[#17255a] flex items-center justify-center relative bottom-0  w-full p-2`}
            >
                &copy; 2024 Fursa Credit Services
            </div>
            </div>
            <div
                className={
                    `${openNavbar ?'md:w-[80vw]  md:left-[20vw]' : 'md:w-[92vw]  md:left-[8vw]'} transition-all duration-300 ease-in-out flex   justify-between  bg-[#ff8427] items-center top-0 left-0 fixed h-16 md:px-10 px-4 w-full shadow-xl shadow-blue-800/20 `
                }
            >
                <div className={`flex gap-4 items-center text-gray-200/80`}>
                    <span className="md:hidden" onClick={handleSmallScreenNavbar}>
                        <IoMenuOutline fontSize={40} />
                    </span>
                    <span className="hidden md:block" onClick={handleNavbar}>
                        {openNavbar ? <IoClose fontSize={40} /> : <IoMenuOutline fontSize={40} /> }
                    </span>
                    <div>
                        <Input
                            placeholder="search"
                            icon={<FaSearch />}
                            className="!border !border-gray-300 text-[#ff8427] bg-white  shadow-lg shadow-gray-900/5 ring-1 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-[#17255a]/20"
                            labelProps={{
                                className: "hidden",
                            }}
                            containerProps={{ className: "min-w-[100px]" }}
                        />
                    </div>
                </div>

                <div className="flex gap-2 justify-start">
                    <div className={"md:flex hidden items-center justify-between gap-2 w-full "}>
                        <div className={"flex  flex-col justify-end"}>
                            <span className={"text-lg text-gray-200"}>
                                {currentTime.format("h:mm a")}
                            </span>
                            <span className={"text-sm text-gray-200/80"}>
                                {currentTime.format("dddd, MMMM Do YYYY")}
                            </span>
                        </div>

                        <div className={"flex text-gray-200/80 gap-3"}>
                            <span>
                                <BiMessageSquareDetail size={25} />
                            </span>
                            <span>
                                <CiBellOn size={25} />
                            </span>
                            <span className={"text-sm self-start"}>
                                Welcome,{" "}
                                {user?.last_name}
                            </span>
                        </div>
                    </div>

                    <Popover>
                        <PopoverHandler>
                            <Avatar src={"/amandla.jpg"} alt={"avatar"} />
                        </PopoverHandler>
                        <PopoverContent className={""}>
                            <div
                                className={
                                    "p-2 border-b-[0.8px] flex items-center gap-2  border-gray-600 text-xs"
                                }
                            >
                                <IoCalendarOutline />
                                <span>My calendar</span>
                            </div>
                            <div
                                className={
                                    "p-2 border-b-[0.8px] flex items-center gap-2 border-gray-600 text-xs"
                                }
                            >
                                <BiUser/>
                                <span> My profile</span>
                            </div>
                            <div
                                className={
                                    "p-2 border-b-[0.8px] flex items-center gap-2 border-gray-600 text-xs"
                                }
                                onClick={
                                    ()=>{
                                    router.push('/signin')
                                    logout()}
                                }
                            >
                                <BiLogOut/>
                                <span>Logout</span>
                            </div>
                        </PopoverContent>
                    </Popover>
                </div>
            </div>
            <Drawer
                className={"relative flex items-center bg-[#17255a] flex-col py-2"}
                placement={"left"}
                open={openSmallScreenNavbar}
                onClose={handleSmallScreenNavbar}
            >
                 <Image src='/logo1.jpg' className={` rounded-full shadow-sm shadow-[#ff8427] w-[78px] h-[78px] overflow-y-scroll`} width={100} height={100} alt='FCS' />
            <div className={'text-[#ff8427] border-b-[0.8px] border-gray-500 w-full font-helveticaBold text-2xl py-4 text-center'}>FCS</div>

                <List className={"flex flex-col items-center"}>
                    {sidebar_links.map((item, index) => (
                        <ListItem
                            key={index}
                            onClick={() => {
                                item && router.push(item?.link);
                                handleSmallScreenNavbar()
                            }}
                            className={`flex w-32 items-center font-helvetica ${
                                pathname === item?.link ||
                                (item?.link !== "/" &&
                                    pathname.startsWith(item?.link as string))
                                    ? " text-[#ff8427]  rounded-r-xl hover:opacity-80"
                                    : "text-[#abcadd] hover:scale-105"
                            }`}
                        >
                            <ListItemPrefix>
                                {item && <item.icon />}
                            </ListItemPrefix>
                            <span>{item?.name}</span>
                        </ListItem>
                    ))}
                </List>
                <div
                    className={
                        "absolute flex flex-col items-center bottom-0 left-0 w-full border-t-[0.9px] border-gray-500"
                    }
                >
                    <div className={"flex gap-2 items-center p-2 text-[#abcadd]"}>
                        <BiMessageSquareDetail />
                        <span>Messages</span>
                    </div>
                    <div className={"flex gap-2 items-center p-2 text-[#abcadd]"}>
                        <CiBellOn />
                        <span>Notifications</span>
                    </div>
                   
                </div>
            </Drawer>
        </main>
    );
}
