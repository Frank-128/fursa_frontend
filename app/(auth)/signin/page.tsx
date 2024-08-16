"use client"
import Image from "next/image";
import {Input} from '@material-tailwind/react'

export default function SignIn(){
    return (
        <main className={'h-screen font-helvetica w-screen flex  justify-center  items-center'}>
            <div className={'md:mt-20   border-gray-400 border-[0.8px] w-[90%] md:w-1/3  h-fit md:h-1/2 flex flex-col items-center gap-5  md:justify-between pb-10 shadow-xl shadow-blue-800/20 rounded-lg'}>
                <Image width={200} height={200} src={'/fursa.png'} alt={'logo'}/>
                <div className={'md:px-10 px-2 w-full'}>
                    <Input label={"Staff ID"} className={' w-full'}/>
                </div>

                <div className={'md:px-10 px-2 w-full'}>
                    <Input label={"Password"} className={' w-full'}/>
                </div>
                <div className={'md:px-10 px-2  w-full'}>
                    <button className={'bg-[#17255a] p-2 w-full rounded-sm  text-gray-200'}>Signin</button>
                </div>

            </div>
        </main>
    )
}
