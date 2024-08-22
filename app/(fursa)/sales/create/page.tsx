"use client"
import React from "react";
import {Stepper, Step, CardHeader, Typography, Button, Radio, Input, Select, Option} from "@material-tailwind/react";
import {MdOutlineAutorenew, MdPerson} from "react-icons/md";
import {IoMdBriefcase} from "react-icons/io";
import {BiBuilding} from "react-icons/bi";
import {FaBuilding, FaCircleInfo} from "react-icons/fa6";
import {projects} from "@/constants/projects";
import SearchableSelect from "@/components/searchable_select/SearchableSelect";


export default function Create() {
    const [activeStep, setActiveStep] = React.useState(0);


    const handleNext = () =>  setActiveStep((cur) => cur + 1);
    const handlePrev = () => setActiveStep((cur) => cur - 1);


    return (
        <div className="w-full py-4 px-8">
            <CardHeader floated={false} variant="gradient" color="blue" className="grid h-24 m-0 place-items-center">
                <div className="w-full md:px-20 px-4 pt-4 pb-8">
                    <Stepper
                        activeStep={activeStep}
                        lineClassName="bg-white/50"
                        activeLineClassName="bg-[#17225a]"
                    >
                        <Step
                            className="h-4 w-4 !bg-blue-gray-50 text-white/75 cursor-pointer"
                            activeClassName="ring-0 !bg-[#17225a] text-[#17225a]"
                            completedClassName="!bg-[#17225a] text-[#17225a]"
                            onClick={() => setActiveStep(0)}
                        >
                            <div className="absolute -bottom-[2.3rem] w-max text-center text-xs">

                                <Typography className={'text-xs'} variant="h6"
                                            color="inherit"><MdOutlineAutorenew size={20}/></Typography>

                            </div>
                        </Step>
                        <Step
                            className="h-4 w-4 !bg-blue-gray-50 text-white/75 cursor-pointer"
                            activeClassName="ring-0 !bg-[#17225a] text-[#17225a]"
                            completedClassName="!bg-[#17225a] text-[#17225a]"
                            onClick={() => setActiveStep(1)}
                        >
                            <div className="absolute -bottom-[2.3rem] w-max text-center text-xs">
                                <Typography className={'text-xs'} variant="h6" color="inherit"><MdPerson
                                    size={20}/></Typography>

                            </div>
                        </Step>
                        <Step
                            className="h-4 w-4 !bg-blue-gray-50 text-white/75 cursor-pointer"
                            activeClassName="ring-0 !bg-[#17225a] text-[#17225a]"
                            completedClassName="!bg-[#17225a] text-[#17225a]"
                            onClick={() => setActiveStep(2)}
                        >
                            <div className="absolute -bottom-[2.3rem] w-max text-center text-xs">
                                <Typography className={'text-xs'} variant="h6"
                                            color="inherit"><IoMdBriefcase size={20}/></Typography>

                            </div>
                        </Step>
                        <Step
                            className="h-4 w-4 !bg-blue-gray-50 text-white/75 cursor-pointer"
                            activeClassName="ring-0 !bg-[#17225a] text-[#17225a]"
                            completedClassName="!bg-[#17225a] text-[#17225a]"
                            onClick={() => setActiveStep(3)}
                        >
                            <div className="absolute -bottom-[2.3rem] w-max text-center text-xs">
                                <Typography className={'text-xs'} variant="h6"
                                            color="inherit"><BiBuilding size={20}/></Typography>

                            </div>
                        </Step>
                        <Step
                            className="h-4 w-4 !bg-blue-gray-50 text-white/75 cursor-pointer"
                            activeClassName="ring-0 !bg-[#17225a] text-[#17225a]"
                            completedClassName="!bg-[#17225a] text-[#17225a]"
                            onClick={() => setActiveStep(4)
                            }
                        >
                            <div className="absolute -bottom-[2.3rem] w-max text-center text-xs">
                                <Typography className={'text-xs'} variant="h6"
                                            color="inherit"><FaCircleInfo size={20}/></Typography>

                            </div>
                        </Step>
                        <Step
                            className="h-4 w-4 !bg-blue-gray-50 text-white/75 cursor-pointer"
                            activeClassName="ring-0 !bg-[#17225a] text-[#17225a]"
                            completedClassName="!bg-[#17225a] text-[#17225a]"
                            onClick={() => setActiveStep(5)
                            }
                        >
                            <div className="absolute -bottom-[2.3rem] w-max text-center text-xs">
                                <Typography className={'text-xs'} variant="h6"
                                            color="inherit"><FaBuilding size={20}/></Typography>

                            </div>
                        </Step>
                    </Stepper>
                </div>


            </CardHeader>
            <div className=" flex w-full flex-col gap-y-2 items-center mt-16">
                <div>
                    {
                        activeStep === 0 ? "Client type" :
                            activeStep === 1 ? "Personal Info" :
                                activeStep === 2 ? "Address,Spouse and Kin details" :
                                    activeStep === 3 ? "Employment Details" :
                                        activeStep === 4 ? "Property details and Loan status" :
                                        "Plots"


                    }
                </div>
                <div className={'flex justify-between w-full'}>
                    <Button className={'text-xs bg-blue-600'} onClick={handlePrev} disabled={activeStep < 1}>
                        Prev
                    </Button>

                    <Button className={'text-xs bg-blue-600'} onClick={handleNext} disabled={activeStep > 4}>
                        Next
                    </Button>
                </div>
                <form className={'w-full py-2 '}>
                    {
                        activeStep === 0 ?
                            <div className={'flex flex-col items-center'}>
                                <span>New client or existing???</span>

                                <div className={'flex'}>
                                    <Radio name="type" label="New client" defaultChecked/>
                                    <Radio name="type" label="Existing client"/>
                                </div>
                            </div>
                            :
                            activeStep === 1 ?
                                <div className={'flex flex-col items-center w-full gap-y-6'}>

                                    <div className={'flex justify-start  w-full'}>Client Details</div>
                                    <div
                                        className={'flex flex-col items-center w-full gap-y-6  gap-4 p-2  border-[0.9px] border-gray-500 '}>
                                        <div
                                            className={'w-full grid md:grid-cols-2 grid-cols-1 gap-4  justify-between'}>
                                            <Select label={'Title'}>
                                                <Option value={'mr'}>
                                                    Mr.
                                                </Option>
                                                <Option value={'mrs'}>
                                                    Mrs.
                                                </Option>
                                                <Option value={'hon'}>
                                                    Honorable
                                                </Option>
                                                <Option value={'dr'}>
                                                    Dr.
                                                </Option>
                                                <Option value={'prof'}>
                                                    Professor
                                                </Option>
                                                <Option value={'other'}>
                                                    Other
                                                </Option>
                                            </Select>

                                            <Input label={'Surname'}/>
                                        </div>
                                        <div
                                            className={'w-full grid md:grid-cols-2 grid-cols-1 gap-4  justify-between'}>
                                            <Input label={'Middle name'}/>

                                            <Input label={'First name'}/>
                                        </div>
                                        <div className={'w-full grid md:grid-cols-2 grid-cols-1   '}>
                                            <div className={'flex justify-start items-start flex-col'}>
                                                <div>Gender</div>
                                                <div className={'flex'}>
                                                    <Radio name="gender" label="Male" defaultChecked/>
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
                                        <div className={'w-full flex md:flex-row flex-col  items-center '}>
                                            <div className={'flex justify-start items-start w-full flex-col'}>
                                                <div>Residential Status</div>
                                                <div className={'flex md:flex-row flex-col'}>
                                                    <Radio name="residential_status" label="Tanzanian" defaultChecked/>
                                                    <Radio name="residential_status" label="Non-Tanzanian"/>
                                                </div>
                                            </div>
                                            <Input label={'Residence permit no'} disabled={true} className={'w-full'}/>
                                        </div>
                                        <div className={'w-full grid md:grid-cols-2 grid-cols-1 gap-4  '}>

                                            <Input label={'Date of birth'} type={'date'} className={'w-full'}/>
                                            <Input label={'Occupation'} className={'w-full'}/>
                                        </div>
                                        <div className={'w-full grid md:grid-cols-2 grid-cols-1 gap-4  '}>

                                            <Select label={'ID Type'}>
                                                <Option value={'nida'}>National ID No</Option>
                                                <Option value={'nida'}>Voters ID No</Option>
                                                <Option value={'nida'}>Passport No</Option>
                                            </Select>
                                            <Input label={'ID No'} className={'w-full'}/>
                                        </div>
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

                                    <div className={'flex justify-start  w-full'}>Employment Details</div>
                                    <div
                                        className={'w-full grid md:grid-cols-2 grid-cols-1 gap-4 p-2  border-[0.9px] border-gray-500 '}>
                                        <Input label={"Employer Name"} className={'w-full'}/>
                                        <Input label={'Nature of business'} className={'w-full'}/>
                                        <Input label={'Postal Address'} className={'w-full'}/>
                                        <Input label={'Mobile No'} className={'w-full'}/>
                                        <Input label={'Job title'} className={'w-full'}/>
                                        <Select label={'Contract terms'}>
                                            <Option value={'temporary'}>Temporary</Option>
                                            <Option value={'short_term'}>Short Term</Option>
                                            <Option value={'permanent'}>Permanent</Option>
                                        </Select>
                                        <Input label={'Contract expiry date'} type={'date'} className={'w-full'}/>
                                        <Input label={'Monthly salary'} className={'w-full'}/>
                                        <Input label={'Income from other sources'} className={'w-full'}/>
                                        <Input label={'Monthly Expenditures'} className={'w-full'}/>
                                        <Input label={'Source of income(for unemployed)'} className={'w-full'}/>

                                    </div>

                                </div>
                                :
                                activeStep === 2 ?
                                    <div className={'gap-4 flex flex-col'}>
                                        <div className={'flex justify-start  w-full'}>Physical Residential Address</div>
                                        <div
                                            className={'w-full grid md:grid-cols-2 grid-cols-1 gap-4 p-2  border-[0.9px] border-gray-500 '}>

                                            <Select label={"Region"}>
                                                <Option>Dar es Salaam</Option>
                                                <Option>Tanga</Option>
                                                <Option>Arusha</Option>
                                                <Option>Mwanza</Option>
                                                <Option>Morogoro</Option>
                                                <Option>Mbeya</Option>
                                            </Select>
                                            <Select label={"Town"}>
                                                <Option>Segerea</Option>
                                                <Option>Zakiem</Option>
                                                <Option>Polisi</Option>
                                                <Option>Toangoma</Option>
                                                <Option>Kisutu</Option>
                                            </Select>
                                            <Select label={"District"}>
                                                <Option>Ilala</Option>
                                                <Option>Kinondoni</Option>
                                                <Option>Ubungo</Option>
                                                <Option>Temeke</Option>
                                                <Option>Bunju</Option>
                                            </Select>


                                            <Select label={"Ward"}>
                                                <Option>Tabata</Option>
                                                <Option>Sinza</Option>
                                                <Option>Mbagala</Option>
                                                <Option>Kigamboni</Option>
                                                <Option>Masaki</Option>
                                                <Option>Mbweni</Option>
                                            </Select>


                                            <Input label={'Street'}/>
                                            <Input label={'House No'}/>

                                        </div>
                                        <div className={'flex justify-start  w-full'}>Spouse Details</div>
                                        <div
                                            className={'w-full grid md:grid-cols-2 grid-cols-1 gap-4 p-2  border-[0.9px] border-gray-500 '}>
                                            <Input label={'Surname'} className={'w-full'}/>
                                            <Input label={'Firstname'} className={'w-full'}/>
                                            <Input label={'Middle Name'} className={'w-full'}/>
                                            <Input label={'Nationality(Non-tanzanian)'} className={'w-full'}/>
                                            <Input label={'Passport No'} className={'w-full'}/>
                                            <Input label={'Mobile'} className={'w-full'}/>
                                            <Input label={'Occupation'} className={'w-full'}/>
                                            <Input label={'Name of employer'} className={'w-full'}/>
                                            <Input label={'Instagram'} className={'w-full'}/>
                                            <Input label={'Facebook'} className={'w-full'}/>
                                            <Input label={'Twitter'} className={'w-full'}/>
                                            <Input label={'Others'} className={'w-full'}/>

                                        </div>
                                        <div className={'flex justify-start  w-full'}>Next Of Kin Details</div>
                                        <div
                                            className={'w-full grid md:grid-cols-2 grid-cols-1 gap-4 p-2  border-[0.9px] border-gray-500 '}>
                                            <Input label={'Surname'} className={'w-full'}/>
                                            <Input label={'Firstname'} className={'w-full'}/>
                                            <Input label={'Middle Name'} className={'w-full'}/>
                                            <Input label={'Postal Address'} className={'w-full'}/>
                                            <Input label={'Mobile No'} className={'w-full'}/>
                                            <Input label={'Mobile No 2'} className={'w-full'}/>
                                            <Input label={'Email'} className={'w-full'}/>
                                            <Input label={'Instagram'} className={'w-full'}/>
                                            <Input label={'Facebook'} className={'w-full'}/>
                                            <Input label={'Twitter'} className={'w-full'}/>
                                            <Input label={'Others'} className={'w-full'}/>

                                        </div>
                                    </div>
                                    :
                        activeStep === 3 ?
                            <div className={'flex flex-col items-center w-full gap-y-6'}>
                                <div className={'flex justify-start  w-full'}>Employment Details</div>
                                <div
                                    className={'w-full grid md:grid-cols-2 grid-cols-1 gap-4 p-2  border-[0.9px] border-gray-500 '}>
                                    <Input label={"Employer Name"} className={'w-full'}/>
                                    <Input label={'Nature of business'} className={'w-full'}/>
                                    <Input label={'Postal Address'} className={'w-full'}/>
                                    <Input label={'Mobile No'} className={'w-full'}/>
                                    <Input label={'Job title'} className={'w-full'}/>
                                    <Select label={'Contract terms'}>
                                        <Option value={'temporary'}>Temporary</Option>
                                        <Option value={'short_term'}>Short Term</Option>
                                        <Option value={'permanent'}>Permanent</Option>
                                    </Select>
                                    <Input label={'Contract expiry date'} type={'date'} className={'w-full'}/>
                                    <Input label={'Monthly salary'} className={'w-full'}/>
                                    <Input label={'Income from other sources'} className={'w-full'}/>
                                    <Input label={'Monthly Expenditures'} className={'w-full'}/>
                                    <Input label={'Source of income(for unemployed)'} className={'w-full'}/>

                                </div>
                            </div> :
                            activeStep === 4 ?
                            <div className={'flex flex-col gap-y-6'}>
                                <div className={'flex justify-start  w-full'}>Property Details</div>
                                <div
                                    className={'w-full grid md:grid-cols-2 grid-cols-1 gap-4 p-2  border-[0.9px] border-gray-500 '}>
                                    <Input label={'Property Value'} className={'w-full'}/>
                                    <Input label={'Monthly instalments TZS'} className={'w-full'}/>
                                    <Input label={'Payment Period'} className={'w-full'}/>
                                    <Input
                                        label={'Payment Details'}
                                        placeholder={'how are you going to finance monthly installments'}
                                        className={'w-full'}/>


                                </div>
                                <div className={'flex justify-start  w-full'}>Information on existing loans/credits with
                                    other institutions
                                </div>
                                <div
                                    className={'w-full grid md:grid-cols-2 grid-cols-1 gap-4 p-2  border-[0.9px] border-gray-500 '}>
                                    <Input label={'Loan amount'} className={'w-full'}/>
                                    <Input label={'Name of Institution'} className={'w-full'}/>
                                    <Input label={'Monthly installment'} className={'w-full'}/>
                                    <Input
                                        label={'Expiry Date'}
                                        className={'w-full'}/>


                                </div>

                            </div>:
                                <div className={'flex gap-4 md:flex-row flex-col'}>
                                    <Select label={'Project'} classname={'w-full'} >
                                        {
                                            projects.map((item,index)=>(
                                                <Option key={index} value={item.name}>{item.name}</Option>
                                            ))
                                        }

                                    </Select>
                                    <SearchableSelect />


                                </div>


                    }
                </form>


            </div>
        </div>
    )
        ;
}
