"use client"
import Image from "next/image";
import {Input} from '@material-tailwind/react'
import { SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useEffect, useState } from "react";
import Cookies from 'js-cookie'
import { globalStore } from "@/context/store";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "@/firebase";


interface FieldValues{
    email:string,
    password:string
}

export default function SignIn(){
    const {register,handleSubmit,formState:{errors},} = useForm<FieldValues>()
    const [showPassword,setShowPassword] = useState(false);
    const [authError,setAuthError] = useState(false)
    const [loading,setLoading] = useState(false)
    const setUser = globalStore(state=>state.setUser)
    
    const route = useRouter()


    


    const submitData:SubmitHandler<FieldValues> = async(data)=>{
       
        setLoading(true)
       
        try {
           const res =  await signInWithEmailAndPassword(auth, data.email, data.password);
           
           Cookies.set('token',res.user?.accessToken)

           route.push('/')
          } catch (error) {
            setAuthError(true)
            setLoading(false)
            console.error(error);
          }
    }


    useEffect(()=>{
        return ()=>
            {
                setAuthError(false)
                setLoading(false)}
    },[])

    return (
        <main className={'h-screen font-helvetica w-screen flex  justify-center  items-center'}>
            <form onSubmit={handleSubmit(submitData)} className={' border-gray-400 border-[0.8px] w-[90%] md:w-1/3 py-10 h-fit  flex flex-col items-center gap-5  md:justify-between pb-1j0 shadow-xl shadow-blue-800/20 rounded-lg'}>
                <Image width={200} height={200} src={'/fursa.png'} alt={'logo'} className="w-36 h-24 self-center  object-contain"/>
                {
                    authError && <span className="text-xs text-red-500">email  or password provided is incorrect</span>
                }
                <div className={'md:px-10 px-2 w-full'}>
                    <Input label={"Email"} {...register('email',{required:"Staff ID is required",onChange:()=>setAuthError(false)})} className={' w-full'}/>
                    {
                        errors.email && <span className="text-xs text-red-500">{errors.email.message}</span>
                    }
                </div>

                <div className={'md:px-10 px-2 w-full'}>
                    <Input type={showPassword?"text":"password"} label={"Password"} {...register('password',{required:"Password is required",onChange:()=>setAuthError(false)})} className={' w-full'} icon={showPassword?<FaEyeSlash className="cursor-pointer" onClick={()=>setShowPassword(false)} />:<FaEye className="cursor-pointer" onClick={()=>setShowPassword(true)} />} />
                    {
                        errors.password && <span className="text-xs text-red-500">{errors.password.message}</span>
                    }
                </div>
                <div className={'md:px-10 px-2  w-full cursor-pointer'}>
                    <input value={loading?"Signing in...":"Signin"} type="submit" disabled={loading} className={`bg-[#17255a] p-2 w-full ${loading && 'opacity-25 cursor-wait'} cursor-pointer rounded-md  text-gray-200`} />
                </div>

            </form>
        </main>
    )
}
