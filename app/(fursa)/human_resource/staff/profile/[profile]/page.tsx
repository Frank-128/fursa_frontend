'use client'
import { Avatar,Chip } from "@material-tailwind/react";
import {FaDownload, FaFacebookF } from "react-icons/fa";
import { IoLogoInstagram } from "react-icons/io5";
import { BsTwitterX } from "react-icons/bs";
import { GiNotebook } from "react-icons/gi";
import { TiTick } from "react-icons/ti";
import { FaUsersViewfinder } from "react-icons/fa6";
import { BsCashCoin } from "react-icons/bs";
import { globalStore } from "@/context/store";
import { useQuery } from "@tanstack/react-query";
import api from "@/axiosInstance";



export default function Staff({params}:{params:{profile:string}}) {
    const token = globalStore(state=>state.token)

    const getStaff = async ()=>{ 
        
      
        
      const {data} = await api.get('user/staff/'+params.profile,{
      headers:{
          Authorization:`Bearer ${token}`
      }

     
  })
  return data

}

const { data, error, isLoading } = useQuery({
  queryKey: ['getStaff'], 
  queryFn: getStaff,        
  refetchOnWindowFocus: true,
});

    
    return (
        <main className="flex  flex-col items-center gap-y-5 justify-between pb-12">

            <div
                className={'flex sm:flex-row flex-col w-full border-[0.8px]  border-gray-500 shadow-xl shadow-blue-800/20 h-fit '}>
                <div
                    className={'p-6 gap-3 sm:border-r-[0.9px] basis-3/12 sm:border-b-0  border-b-[0.9px] border-gray-500 flex flex-col items-center justify-center'}>
                    <Avatar src={'http://localhost:8000/'+data?.profile_image} alt={'profile picture'}
                            className={'outline-4 outline outline-offset-1 outline-red-300'} size="xxl"/>

                    <div className={'flex flex-col items-center'}>
                   <span className={'text-xl text-gray-800'}>
                    {data?.first_name+" "+data?.last_name}
                </span>
                        <span className={'text-sm text-gray-600'}>
                    {
                        data?.groups?.map((item:string,index:number)=>
                     <i key={index}> {item}</i>
                    )
                    }
                </span>
                    </div>
                    <div>
                        <span className={'text-xs'}>Member since {data?.date_joined}</span>
                    </div>
                    <Chip value={'Internal employee'} color={'green'}/>
                    <div className={'gap-2 flex justify-around'}>
                        <FaFacebookF className={'text-gray-600'}/>
                        <IoLogoInstagram className={'text-gray-600'}/>
                        <BsTwitterX className={'text-gray-600'}/>
                    </div>
                </div>
                <div className={'basis-9/12 '}>
                    <div className={'py-4 border-b-[0.8px] px-10 gap-y-3 flex flex-col border-gray-500'}>
                        <span>Official information</span>
                        <div className={'grid grid-cols-1 sm:grid-cols-3 gap-y-4'}>
                            <div className={'flex flex-col'}>
                                <span className={'text-xs font-bold text-gray-800'}>Email</span>
                                <span className={'text-sm text-gray-500'}>{data?.email}</span>
                            </div>
                            <div className={'flex flex-col'}>
                                <span className={'text-xs text-gray-800'}>Phone number</span>
                                <span className={'text-sm text-gray-500'}>{data?.phonenumber}</span>
                            </div>
                            <div className={'flex flex-col'}>
                                <span className={'text-xs text-gray-800'}>NIDA</span>
                                <span className={'text-sm text-gray-500'}>{data?.NIDA}</span>
                            </div>
                            <div className={'flex flex-col'}>
                                <span className={'text-xs text-gray-800'}>TIN</span>
                                <span className={'text-sm text-gray-500'}>{data?.TIN}</span>
                            </div>
                            <div className={'flex flex-col'}>
                                <span className={'text-xs text-gray-800'}>Bank</span>
                                <span className={'text-sm text-gray-500'}>CRDB</span>
                            </div>
                            <div className={'flex flex-col'}>
                                <span className={'text-xs text-gray-800'}>Bank No</span>
                                <span className={'text-sm text-gray-500'}>4532123212328</span>
                            </div>
                        </div>
                    </div>
                    <div className={'py-4 border-b-[0.8px] px-10 gap-y-3 flex flex-col border-gray-500'}>
                        <span>Personal information</span>
                        <div className={'grid grid-cols-1 sm:grid-cols-3 gap-y-4'}>
                            <div className={'flex flex-col'}>
                                <span className={'text-xs font-bold text-gray-800'}>Name</span>
                                <span className={'text-sm text-gray-500'}>Violet Green John</span>
                            </div>

                            <div className={'flex flex-col'}>
                                <span className={'text-xs text-gray-800'}>Marital Status</span>
                                <span className={'text-sm text-gray-500'}>{data?.marital_status}</span>
                            </div>
                            <div className={'flex flex-col'}>
                                <span className={'text-xs text-gray-800'}>Address</span>
                                <span className={'text-sm text-gray-500'}>{data?.subtown +","+data?.ward+" "+data?.street}</span>
                            </div>
                            <div className={'flex flex-col'}>
                                <span className={'text-xs text-gray-800'}>Date of birth</span>
                                <span className={'text-sm text-gray-500'}>{data?.date_of_birth}</span>
                            </div>
                            <div className={'flex flex-col'}>
                                <span className={'text-xs text-gray-800'}>Bank No</span>
                                <span className={'text-sm text-gray-500'}>{data?.bank_card_number || "null"}</span>
                            </div>
                        </div>
                    </div>
                    <div className={'py-4  px-10 gap-y-3 flex flex-col '}>
                        <span>Attachments</span>
                        <div className={'grid grid-cols-1 sm:grid-cols-3 gap-y-4 gap-x-4'}>
                            <div className={'flex flex-col'}>
                                <span className={'text-xs font-bold text-gray-800'}>Contract</span>
                                <span
                                    className={'text-sm text-gray-500 bg-gray-200 flex justify-center p-2 shadow-xl shadow-blue-800/20 rounded cursor-pointer'}>
                                <FaDownload/>
                            </span>
                            </div>
                            <div className={'flex flex-col '}>
                                <span className={'text-xs text-gray-800'}>NIDA</span>
                                <span
                                    className={'text-sm text-gray-500 bg-gray-200 flex justify-center p-2 shadow-xl shadow-blue-800/20 rounded cursor-pointer'}>
                                <FaDownload/>
                            </span>
                            </div>
                            <div className={'flex flex-col '}>
                                <span className={'text-xs text-gray-800'}>Application Table</span>
                                <span
                                    className={'text-sm text-gray-500 bg-gray-200 flex justify-center p-2 shadow-xl shadow-blue-800/20 rounded cursor-pointer'}>
                                <FaDownload/>
                            </span>
                            </div>

                        </div>

                    </div>
                </div>
            </div>

            <div className={'px-2 w-full'}>
                <span>Perfomance</span>
                <div className={'flex sm:flex-row flex-col gap-y-4 justify-between '}>
                    <div
                        className={'rounded shadow-xl bg-white shadow-blue-800/20 p-2 flex items-center gap-3 border-[0.3px] border-gray-300'}>
                        <GiNotebook size={60} color={'purple'}/>
                        <div className={'flex flex-col items-center'}>
                            <span className={'text-xs text-gray-500'}>Ongoing sales</span>
                            <span className={'text-2xl  text-purple-500'}>10</span>
                        </div>
                    </div>
                    <div className={'rounded shadow-xl bg-white shadow-blue-800/20 p-2 flex items-center gap-3 border-[0.3px] border-gray-300'}>
                        <FaUsersViewfinder size={60} color={'green'}/>
                        <div className={'flex flex-col items-center'}>
                            <span className={'text-xs text-gray-500'}>Clients added</span>
                            <span className={'text-2xl  text-green-500'}>3</span>
                        </div>
                    </div>
                    <div className={'rounded shadow-xl bg-white shadow-blue-800/20 p-2 flex items-center gap-3 border-[0.3px] border-gray-300'}>
                        <TiTick size={60} className={'text-blue-500'}/>
                        <div className={'flex flex-col items-center'}>
                            <span className={'text-xs text-gray-500'}>Completed sales</span>
                            <span className={'text-2xl  text-blue-500'}>57</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className={'px-2 w-full'}>
                <span>Further Details</span>
                <div className={'flex justify-between '}>
                    <div className={'rounded shadow-xl bg-white shadow-blue-800/20 p-2 flex items-center gap-3 border-[0.3px] border-gray-300'}>
                        <BsCashCoin size={60} className={'text-yellow-600'}/>
                        <div className={'flex flex-col items-center'}>
                            <span className={'text-xs text-gray-500'}>Commission to be paid</span>
                            <span className={'text-2xl  text-yellow-600'}>100,000/=</span>
                        </div>
                    </div>

                </div>
            </div>

        </main>
    );
}
