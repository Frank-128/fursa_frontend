"use client"
import {Checkbox, Input, Option, Radio, Select} from "@material-tailwind/react";
import React, {useState} from "react";
import FileUpload from "@/components/drag_n_drop_component/DragNDrop";
import {roles} from "@/constants/roles";


interface ExtendedFile extends File {
    preview: string;
}

export default function CreateStaff(){
    const [nida, setNida] = useState<ExtendedFile[]>([])
    const [applicationLetter, setApplicationLetter] = useState<ExtendedFile[]>([])
    const [profile,setProfile] = useState<ExtendedFile[]>([])
    return(
        <div className={'flex flex-col gap-4 py-5'}>
            <div className={'flex justify-center text-3xl text-gray-900 w-full'}>Add new staff</div>
            <div className={'flex justify-start  w-full'}>Basic Details</div>
            <div
                className={'flex flex-col items-center w-full gap-y-6  gap-4 p-2  border-[0.9px] border-gray-500 '}>
                <div
                    className={'w-full grid md:grid-cols-2 grid-cols-1 gap-4  justify-between'}>

                    <Input label={'First name'}/>
                    <Input label={'Middle name'}/>
                </div>
                <div
                    className={'w-full grid md:grid-cols-2 grid-cols-1 gap-4  justify-between'}>
                    <Input label={'Surname'}/>
                    <Input label={'Date of birth'} type={'date'} className={'w-full'}/>

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
                    <Input label={'NIDA No'}/>
                    <Input label={'TIN No'} className={'w-full'}/>
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

                <Input label={'Mobile Phone'} className={'w-full'}/>
                <Input label={'Email address'} type={'email'} className={'w-full'}/>
                <Input label={'Second Mobile Phone'} className={'w-full'}/>
                <Input label={'Third Mobile Phone'} className={'w-full'}/>
                <Input label={'Postal Address Phone'} className={'w-full'}/>

            </div>
            <div className={'flex justify-start  w-full'}>Social Media Handles</div>
            <div
                className={'w-full grid md:grid-cols-2 grid-cols-1 gap-4 p-2  border-[0.9px] border-gray-500 '}>
                <Input label={'Instagram'} className={'w-full'}/>
                <Input label={'Facebook'} className={'w-full'}/>
                <Input label={'Twitter'} className={'w-full'}/>
                <Input label={'Others(specify)'} className={'w-full'}/>
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
                    roles.map((item,index)=>(
                        <div key={index}>
                            <Checkbox label={item} color={'green'} />
                        </div>
                    ))

                }
            </div>
        </div>
    );
}
