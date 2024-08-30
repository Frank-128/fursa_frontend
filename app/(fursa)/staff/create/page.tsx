"use client"
import {Checkbox, Input, Option, Radio, Select} from "@material-tailwind/react";
import React, {useState} from "react";
import FileUpload from "@/components/drag_n_drop_component/DragNDrop";
import {roles} from "@/constants/roles";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { globalStore } from "@/context/store";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import api from "@/axiosInstance";


interface ExtendedFile extends File {
    preview: string;
}

export default function CreateStaff(){
    const route = useRouter()

    const [nida, setNida] = useState<ExtendedFile[]>([])
    const [applicationLetter, setApplicationLetter] = useState<ExtendedFile[]>([])
    const [profile,setProfile] = useState<ExtendedFile[]>([])
    const [contract,setContract] = useState<ExtendedFile[]>([])
    const [localGvt,setLocalGvt] = useState<ExtendedFile[]>([])
    const [roles,setRoles] = useState<string[]>([])
    const token = globalStore(state=>state.token)


    const {register,handleSubmit,formState:{errors}} = useForm()


    const handleRole = (val:string)=>{
        setRoles(prev=>{
            if (prev.includes(val)){

            return    prev.filter(item=>item !== val)
            }
            return [...prev,val]

        })
    }


    const postData = async (data:FieldValues)=>{
      const response = await  axios.post('http://localhost:8000/user/staff/',data,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })

        return response.data
    }

    const mutation = useMutation({
        mutationFn: postData,
        onSuccess: (data) => {
            alert('user created')
            route.push('/staff')
        },
        onError: (error) => {
            
            console.error('Error:', error);
        }
    });

    const getRoles = async ()=>{ 
        
      
        
        const {data} = await api.get('user/roles',{
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

    Object.entries(data).forEach(([key,value]:[string,string]) => {
        formData.append(key,value)
    });

    

    profile.forEach(file => {
        formData.append('profile_image', file, file.name);
    });

    // formData.append('profile_picture',profile[0])

    
    nida.forEach(file => {
        formData.append('NIDA_COPY', file, file.name);
    });

    
    applicationLetter.forEach(file => {
        formData.append('application_letter', file, file.name);
    });

    contract.forEach(file => {
        formData.append('contract', file, file.name);
    });

    localGvt.forEach(file => {
        formData.append('local_government_document', file, file.name);
    });
    
    applicationLetter.forEach(file => {
        formData.append('application_letter', file, file.name);
    });


    roles.forEach(role => {
        formData.append('groups_data',role);
    });
    
    formData.append('password',data.last_name.toUpperCase()+'1234')

    mutation.mutate(formData)
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
                    <Input {...register('last_name')} label={'Surname'}/>
                    <Input {...register('date_of_birth')} label={'Date of birth'} type={'date'} className={'w-full'}/>
                    <Input {...register('date_joined')} label={'Date Joined'} type={'date'} className={'w-full'}/>
                    <div className={'flex justify-start items-start flex-col'}>
                        <div>Gender</div>
                        <div className={'flex'}>
                            <Radio id='male' value={'male'} {...register('gender')} label="Male"/>
                            <Radio id='female'  value={'female'} {...register('gender')} label="Female"/>
                        </div>
                    </div>
                    
                </div>
               

                <div className={'w-full grid md:grid-cols-2 grid-cols-1 gap-4  '}>
                    <Input {...register('NIDA')} label={'NIDA Number'}/>
                    <Input {...register('TIN')} label={'TIN Number'} className={'w-full'}/>
                </div>
                
                <FileUpload title={'Profile Picture'} files={profile} setFiles={setProfile}/>

            </div>
            <div className={'flex justify-start  w-full'}>Contact Details</div>
            <div
                className={'w-full grid md:grid-cols-2 grid-cols-1 gap-4 p-2  border-[0.9px] border-gray-500 '}>

                <Input {...register('phonenumber')} label={'Mobile Phone'} className={'w-full'}/>
                <Input {...register('email')} label={'Email address'} type={'email'} className={'w-full'}/>
                <Input {...register('alt_phonenumber')} label={'Second Mobile Phone'} className={'w-full'}/>
                

            </div>
            <div className={'flex justify-start  w-full'}>Bank Details</div>
            <div
                className={'w-full grid md:grid-cols-2 grid-cols-1 gap-4 p-2  border-[0.9px] border-gray-500 '}>

                <Input {...register('bank_name')} value={'CRDB'} disabled label={'Bank Name'} className={'w-full'}/>
                <Input {...register('bank_card_number')} label={'Account Number'}  className={'w-full'}/>
                

            </div>
            <div className={'flex justify-start  w-full'}>Referral Details</div>
            <div
                className={'w-full grid md:grid-cols-2 grid-cols-1 gap-4 p-2  border-[0.9px] border-gray-500 '}>

                <Input {...register('referral_name')} label={'Referral Name'} className={'w-full'}/>
                <Input {...register('referral_contacts')} label={'Referral Contacts'}  className={'w-full'}/>
                

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
                <FileUpload title={'Contract'} files={contract} setFiles={setContract} fileType="pdf" />
                <FileUpload title={'Local Government Documents'} files={localGvt} setFiles={setLocalGvt} fileType="pdf"/>
                <FileUpload title={'Application Letter'} files={applicationLetter} setFiles={setApplicationLetter} fileType="pdf"/>
            </div>
            <div className={'flex justify-start  w-full'}>Is Internal Employee?</div>
            <div className={'flex justify-start items-start flex-col'}>
                        
                        <div className={'flex'}>
                            <Radio id='no' value={0} {...register('is_internal_employee')} label="NO"/>
                            <Radio id='yes'  value={1} {...register('is_internal_employee')} label="YES"/>
                        </div>
                    </div>
            <div className={'flex justify-start  w-full'}>Assign roles</div>
            <div className={'flex justify-start flex-col w-full gap-2 p-2  border-[0.9px] border-gray-500'}>
                {
                    data?.map((item:{name:string,permissions:{}[]},index:number)=>(
                        <div key={index}>
                            <Checkbox label={item.name} onChange={()=>handleRole(item.name)} color={'green'} />
                        </div>
                    ))

                }
            </div>
            <button className='p-2 bg-[#17225a] w-full rounded-sm shadow-lg shadow-blue-800/20 text-white'>Add new staff</button>
        </form>
    );
}
