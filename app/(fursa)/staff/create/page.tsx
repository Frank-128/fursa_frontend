"use client"
import {Checkbox, Input, Option, Radio, Select} from "@material-tailwind/react";
import React, {useState} from "react";
import FileUpload from "@/components/drag_n_drop_component/DragNDrop";
import {roles} from "@/constants/roles";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { globalStore } from "@/context/store";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";


interface ExtendedFile extends File {
    preview: string;
}

export default function CreateStaff(){
    const [nida, setNida] = useState<ExtendedFile[]>([])
    const [applicationLetter, setApplicationLetter] = useState<ExtendedFile[]>([])
    const [profile,setProfile] = useState<ExtendedFile[]>([])
    const token = globalStore(state=>state.token)

    const {register,handleSubmit,formState:{errors}} = useForm()


    const getRoles = async ()=>{ 
        
      
        
        const {data} = await axios.get('http://localhost:8000/user/roles',{
        headers:{
            Authorization:`Bearer ${token}`
        }

       
    })
    return data

}

const { data, error, isLoading } = useQuery({
    queryKey: ['getRoles'], 
    queryFn: getRoles,        
    refetchOnWindowFocus: true,
});

const submitData:SubmitHandler<FieldValues> = (data)=>{
    const formData = new FormData()

    data.forEach(([key,value]:[string,string]) => {
        formData.append(key,value)
    });

    console.log(nida)

    formData.append('nida',nida);
    formData.append('applicationLetter',applicationLetter);
    formData.append('profile_picture',profile)
}


    return(
        <form onSubmit={handleSubmit(submitData)} className={'flex flex-col gap-4 py-5'}>
            <div className={'flex justify-center text-3xl text-gray-900 w-full'}>Add new staff</div>
            <div className={'flex justify-start  w-full'}>Basic Details</div>
            <div
                className={'flex flex-col items-center w-full gap-y-6  gap-4 p-2  border-[0.9px] border-gray-500 '}>
                <div
                    className={'w-full grid md:grid-cols-2 grid-cols-1 gap-4  justify-between'}>

                    <Input {...register('first_name')} label={'First name'}/>
                    <Input {...register('middle_name')} label={'Middle name'}/>
                </div>
                <div
                    className={'w-full grid md:grid-cols-2 grid-cols-1 gap-4  justify-between'}>
                    <Input {...register('surname')} label={'Surname'}/>
                    <Input {...register('date_of_birth')} label={'Date of birth'} type={'date'} className={'w-full'}/>

                </div>
                <div className={'w-full grid md:grid-cols-2 grid-cols-1   '}>
                    <div className={'flex justify-start items-start flex-col'}>
                        <div>Gender</div>
                        <div className={'flex'}>
                            <Radio name="gender" label="Male"/>
                            <Radio name="gender" label="Female"/>
                        </div>
                    </div>
                    <div className={'flex justify-start items-start flex-col'}>
                        <div>Marital status</div>
                        <div className={' grid md:grid-cols-2 grid-cols-1 '}>
                            <Radio className={'text-xs'} name="marital_status" label="Married"/>
                            <Radio className={'text-xs'} name="marital_status" label="Single"/>
                            <Radio className={'text-xs'} name="marital_status"
                                   label="Divorced"/>
                            <Radio className={'text-xs'} name="marital_status"
                                   label="Widow/widower"/>
                        </div>
                    </div>
                </div>

                <div className={'w-full grid md:grid-cols-2 grid-cols-1 gap-4  '}>
                    <Input {...register('nida')} label={'NIDA No'}/>
                    <Input {...register('TIN')} label={'TIN No'} className={'w-full'}/>
                </div>
                <div className={'w-full grid md:grid-cols-2 grid-cols-1 gap-4  '}>

                    <Select label={'ID Type'}>
                        <Option value={'nida'}>National ID </Option>
                        <Option value={'nida'}>Voters ID </Option>
                        <Option value={'nida'}>Passport </Option>
                    </Select>
                    <Input label={'ID No'} className={'w-full'}/>
                </div>
                <FileUpload title={'Profile Picture'} files={profile} setFiles={setProfile}/>

            </div>
            <div className={'flex justify-start  w-full'}>Contact Details</div>
            <div
                className={'w-full grid md:grid-cols-2 grid-cols-1 gap-4 p-2  border-[0.9px] border-gray-500 '}>

                <Input {...register('mobile_phone')} label={'Mobile Phone'} className={'w-full'}/>
                <Input {...register('email')} label={'Email address'} type={'email'} className={'w-full'}/>
                <Input {...register('alt_mobile')} label={'Second Mobile Phone'} className={'w-full'}/>
                {/* <Input label={'Third Mobile Phone'} className={'w-full'}/> */}
                <Input {...register('postal_address')} label={'Postal Address Phone'} className={'w-full'}/>

            </div>
            <div className={'flex justify-start  w-full'}>Social Media Handles</div>
            <div
                className={'w-full grid md:grid-cols-2 grid-cols-1 gap-4 p-2  border-[0.9px] border-gray-500 '}>
                <Input {...register('instagram')} label={'Instagram'} className={'w-full'}/>
                <Input {...register('facebook')} label={'Facebook'} className={'w-full'}/>
                <Input {...register('twitter')} label={'Twitter'} className={'w-full'}/>
                <Input {...register('others')} label={'Others(specify)'} className={'w-full'}/>
            </div>
            <div>

            </div>
            <div className={'flex justify-start  w-full'}>Attachments</div>
            <div className={'flex justify-start flex-col w-full gap-2 p-2  border-[0.9px] border-gray-500'}>
                <FileUpload title={'Nida'} files={nida} setFiles={setNida}/>
                <FileUpload title={'Application Letter'} files={applicationLetter} setFiles={setApplicationLetter}/>
            </div>
            <div className={'flex justify-start  w-full'}>Assign roles</div>
            <div className={'flex justify-start flex-col w-full gap-2 p-2  border-[0.9px] border-gray-500'}>
                {
                    data?.map((item:{name:string,permissions:{}[]},index:number)=>(
                        <div key={index}>
                            <Checkbox label={item.name} color={'green'} />
                        </div>
                    ))

                }
            </div>
            <button className='p-2 bg-[#17225a] w-full rounded-sm shadow-lg shadow-blue-800/20 text-white'>Add new staff</button>
        </form>
    );
}
