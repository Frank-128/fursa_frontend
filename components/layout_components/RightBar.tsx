"use client"
import moment from 'moment'
import {useState} from 'react'
import { BiMessageSquareDetail } from "react-icons/bi";
import { IoIosLogOut } from "react-icons/io";
import { CiBellOn } from "react-icons/ci";
import { IoListOutline } from "react-icons/io5";
import { IoCalendarOutline } from "react-icons/io5";

import Link from 'next/link'
import {sidebar_links} from '../../constants/links'
import {tasks} from '../../constants/tasks'
import Image from 'next/image'
import { globalStore } from '@/context/store';
import { useRouter } from 'next/navigation';

export default function RightBar(){
    const [isCalendar,setIsCalendar] = useState(false);
    const [openRightBar,setOpenRightBar] = useState(false)
    
    const route = useRouter()
    
    const logout = globalStore(state=>state.logout)
    const user = globalStore(state=>state.user)
    


    function formatDate(dateTimeString:string) {
        const date = moment(dateTimeString);

        if (date.isSame(moment(), 'day')) {
            return 'Today';
        } else if (date.isSame(moment().add(1, 'days'), 'day')) {
            return 'Tomorrow';
        } else if (date.isSame(moment().subtract(1, 'days'), 'day')) {
            return 'Yesterday';
        } else {
            return date.format('MMMM Do YYYY'); // Default date format
        }
    }

    function formatTime(dateTimeString:string) {
        return moment(dateTimeString).format('hh:mm A'); // Time in 12-hour format
    }

    

    
    return(
        <section className={'w-[25%] hidden md:block fixed h-[100vh] right-0 shadow-xl shadow-blue-800/20'}>
        <div className={'p-4 items-center flex gap-4 shadow-xl shadow-blue-800/20'}>
            <Image src={'http://localhost:8000/'+user?.profile_image} className={'rounded-full w-12 h-12 object-cover'} width={100} height={100} alt={'profile_pic'} />
            <div className={'flex justify-between items-center w-full '}>
                <div className={'flex flex-col'}>
                    <span className={'text-xs'}>Hello,</span>
                    <span className={'text-xs'}>{user?.first_name+ " "+user?.last_name}</span>
                </div>
                <div className={'flex gap-3'}>
                    <span>
                        <BiMessageSquareDetail/>
                    </span>
                    <span>
                        <CiBellOn/>
                    </span>
                    <span className='cursor-pointer' onClick={()=>{
                        route.push('/signin')
                        logout()
                        }}>
                        <IoIosLogOut/>
                    </span>

                </div>
            </div>
        </div>

         <div className={'relative'}>
             <div className={'flex justify-between p-4'}>
                 <span className={'font-bold'}>My calendar</span>
                 <div className={'flex gap-4'}>
                     <Link className={` ${!isCalendar && 'border-b-2 border-[#17255a]'}`} href={'#'}>
                         <IoListOutline />
                     </Link>
                     <Link className={` ${isCalendar && 'border-b-2  border-[#17255a]'}`} href={'#'}>
                         <IoCalendarOutline />
                     </Link>
                 </div>
             </div>
             <div className={'flex justify-around bg-[#17255a]/20 p-2'}>
                 <span className={'bg-[#17255a] text-white px-2 py-1 rounded-md text-xs cursor-pointer'}>All</span>
                 <span className={` ${1!==1 && 'bg-[#17255a]'} text-whlite px-2 py-1 rounded-md text-xs cursor-pointer`}>Meetings</span>
                 <span className={` ${1!==1 && 'bg-[#17255a]'} text-whilte px-2 py-1 rounded-md text-xs cursor-pointer`}>Reminders</span>
             </div>
             {
                 isCalendar?
                 <div>
                    calendar
                 </div> :
                 <div>
                     {
                         tasks.map((item,index)=>(
                             <div key={index} className={'flex flex-col m-2 border-b-[0.8px] border-gray-300'}>
                                 <span className={'font-bold py-3'}>{formatDate(item.date)}</span>
                                 <div className={'flex items-center gap-4'}>
                                <span className={'text-gray-400 text-xs'}>
                                    {formatTime(item.date)}
                                </span>
                                     <span className={'text-gray-800 text-sm'}>
                                    {item.description}
                                </span>

                                 </div>
                             </div>
                         ))
                     }
                 </div>
             }
            </div>
            <div className={'rounded-lg p-2 shadow-lg bottom-8 bg-white z-50 left-1/3  shadow-blue-500 absolute'}>
                + add new task
            </div>
        </section>
    )
}
