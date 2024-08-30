'use client'
import {useEffect, useState} from 'react'
import {Input,Select,Option, Stepper, Step, Button} from '@material-tailwind/react'
import FileUpload from '../../../../components/drag_n_drop_component/DragNDrop'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import api from '@/axiosInstance';
import { globalStore } from '@/context/store';
import { useQuery } from '@tanstack/react-query';


interface ExtendedFile extends File {
    preview: string;
}

export default  function AddProject(){
    const [files, setFiles] = useState<ExtendedFile[]>([]);
    const [projectPictures, setProjectPictures] = useState<ExtendedFile[]>([]);
    const [projectCoordinates, setProjectCoordinates] = useState<ExtendedFile[]>([]);
    const [contract, setContract] = useState<ExtendedFile[]>([]);
    const [townplan, setTownplan] = useState<ExtendedFile[]>([]);
    const [searchFromMinistry, setSearchFromMinistry] = useState<ExtendedFile[]>([]);
    const [activeStep,setActiveStep] = useState(0)
    const [regions,setRegions] = useState<[]|null>(null)
    const [districts,setDistricts] = useState<[]|null>(null)
    const [wards,setWards] = useState<[]|null>(null)
    const [selectedDistrict,setSelectedDistrict] = useState<number | null>(null)
    const [selectedRegion,setSelectedRegion] = useState<number | null>(null)
    const [projectType,setProjectType] = useState("")
    const [ownership,setOwnership] = useState({ mandate:"",ownership_type:""})


    const token = globalStore(state=>state.token)

    const {register,handleSubmit,formState:{errors}} = useForm()


    const submitData:SubmitHandler<FieldValues> = async (data)=>{

        const formData = new FormData() 
        const {broker,owner,first_neighbour,second_neighbour,third_neighbour,fourth_neighbour,...rest} = data

        Object.entries(rest).forEach(([key,value]) => {
            formData.append(key,value)
        });
        formData.append('project_type',projectType)
        formData.append('broker',JSON.stringify(broker))
        formData.append('owner',JSON.stringify(owner))
        formData.append('first_neighbour',JSON.stringify(first_neighbour))
        formData.append('second_neighbour',JSON.stringify(second_neighbour))
        formData.append('third_neighbour',JSON.stringify(third_neighbour))
        formData.append('fourth_neighbour',JSON.stringify(fourth_neighbour))
    townplan.forEach(file => {
        formData.append('profile_image', file, file.name);
    });

    projectPictures.forEach(file => {
        formData.append('profile_image', file, file.name);
    });

    projectCoordinates.forEach(file => {
        formData.append('profile_image', file, file.name);
    });

    contract.forEach(file => {
        formData.append('profile_image', file, file.name);
    });

    searchFromMinistry.forEach(file => {
        formData.append('profile_image', file, file.name);
    });
    formData.append('project_type',projectType)


    const {data:projectData} = await api.post('project/',formData,{
        headers:{
            Authorization :`Bearer ${token}`
        }
    }) 

    console.log(res)

    }

    const getRegions = async ()=>{
        const {data} = await api.get('address/regions',{
            headers:{
                Authorization :`Bearer ${token}`
            }
        }) 

        return data
    }

    const {data,error,isLoading} = useQuery({
        queryKey:['getRegions'],
        queryFn:getRegions,
    })

    

    const getDistricts = async ()=>{
        const {data} = await api.get('address/region/'+selectedRegion,{
            headers:{
                Authorization :`Bearer ${token}`
            }
        }) 

        return data
    }

    const {data:districtData,error:districtError,isLoading:districtIsLoading} = useQuery({
        queryKey:['getDistricts',selectedRegion],
        queryFn:getDistricts,
    })

   

    const getWards = async ()=>{
        const {data} = await api.get('address/district/'+selectedDistrict,{
            headers:{
                Authorization :`Bearer ${token}`
            }
        }) 

        return data
    }

    const {data:wardData,error:wardError,isLoading:wardIsLoading} = useQuery({
        queryKey:['getWards',selectedDistrict],
        queryFn:getWards,
    })

    
    useEffect(() => {
        if (data && data.length > 0) {
          setSelectedRegion(data[0].id);
        }
      }, [data]);

      useEffect(() => {
        if (districtData && districtData.length > 0) {
          setSelectedDistrict(districtData[0].id);
        }
      }, [districtData]);

      console.log(selectedRegion)
      console.log("__||__")
      console.log(wardData)
    
    
    return(
        <form onSubmit={handleSubmit(submitData)} className={'flex flex-col gap-y-4 items-center justify-center w-full pb-10 '}>
            <div className={'text-center  text-2xl text-[#17225a] font-bold p-2'}>Add new Project</div>
            <Stepper
        activeStep={activeStep}
        
      >
        <Step onClick={() => setActiveStep(0)}>1</Step>
        <Step onClick={() => setActiveStep(1)}>2</Step>
        <Step onClick={() => setActiveStep(2)}>3</Step>
        <Step onClick={() => setActiveStep(3)}>4</Step>
        <Step onClick={() => setActiveStep(4)}>5</Step>
      </Stepper>
      <div className="mt-16 flex justify-between w-full">
        <Button onClick={()=>setActiveStep(activeStep - 1)} disabled={activeStep === 0}>
          Prev
        </Button>
        <Button onClick={()=>setActiveStep(activeStep + 1)} disabled={activeStep > 4}>
          Next
        </Button>
      </div>

           {
               
               activeStep === 0 &&
               <>
               {/* Project Details */}
            <div className={'w-full'}>
                Project Details
                <div className={'p-2 border-[0.8px] border-gray-600 space-y-4 shadow-md rounded-sm shadow-blue-800/20'}>
                    <div className={'grid grid-cols-1 gap-4 md:grid-cols-2 flex-col'}>
                        <Input {...register('name')} label={'Project Name'}/>
                       

                        <Input {...register('size')} label={'Size in ㎡'}/>
                        <Select onChange={(e)=>setProjectType(e)} label={"project type"}>
                            <Option>Residential</Option>
                            <Option>Residential and commercial</Option>
                            <Option>Industrial</Option>
                            <Option>Public utilities</Option>
                            <Option>Open space</Option>
                            <Option>Utilities</Option>
                        </Select>


                        <Input {...register('broker_price')} label={'Indicative Price(from broker)'} type={'number'}/>
                        <Input {...register('selling_price')} label={'Selling price'}/>

                    </div>

                    <div className={'flex gap-4 md:flex-row flex-col justify-center'}>
                        <FileUpload title={'Agreement contract'} files={contract} setFiles={setContract}
                                    fileType={'pdf'}/>


                    </div>


                </div>
            </div>

            {/*  Project location  */}
            <div className={'w-full'}>
                Project Location
                <div className={'p-2 border-[0.8px] border-gray-600 space-y-4 shadow-md rounded-sm shadow-blue-800/20'}>
                    <div className={'flex gap-4 md:flex-row flex-col'}>
                    { !isLoading &&
                        <Select onChange={(e)=>setSelectedRegion(e)} label={"Region"}>
                           {  data?.map((item:{id:number,name:string},index:number)=><Option value={item.id} key={index}>{item.name}</Option>)}
                             </Select> 
}

                    { districtData?.length > 0 &&
                        <Select onChange={(e)=>setSelectedDistrict(e)} label={"District"}>
                            {
                                districtData?.map((item,index)=><Option key={index} value={item.id}>{item.name}</Option>)
                            }
                        </Select>
} 
                    </div>
                        
                    <div className={'flex gap-4 md:flex-row flex-col'}>
                    

                        <Input {...register('division')} label={'Division'}/>
                        <Input {...register('ward')} label={'Ward'}/>


                    </div>
                    <div  className={'flex gap-4 md:flex-row flex-col'}>
                        <Input {...register('street')} label={'Street'}/>
                        <Input className={'hidden'}/>
                    </div>

                </div>
            </div>
            </>
}
           { 
           activeStep ===1 && 
           <>
           {/*  Map and coordinates   */}

            <div className={'w-full'}>
                Project Map and coordinates
                <div className={'p-2 border-[0.8px] border-gray-600 space-y-4 shadow-md rounded-sm shadow-blue-800/20'}>
                    <div className={'flex gap-4 md:flex-row flex-col'}>


                        <FileUpload title={'map'}  files={files} setFiles={setFiles}/>
                        <FileUpload title={'project picture'} files={projectPictures} setFiles={setProjectPictures}
                                    fileType={'pdf'}/>

                    </div>
                    <div className={'flex gap-4 md:flex-row flex-col'}>
                        <FileUpload title={'project coordinates'} files={projectCoordinates}
                                    setFiles={setProjectCoordinates}/>

                    </div>

                </div>
            </div>
            </>

}

    {
        activeStep === 2 &&
        <>
        
            {/* Owner's details */}
            <div className={'w-full'}>
                Owner Details
                <div className={'p-2 border-[0.8px] border-gray-600 space-y-4 shadow-md rounded-sm shadow-blue-800/20'}>
                    <div className={'flex gap-4 md:flex-row flex-col'}>
                        <Input {...register('owner.full_name')} label={'Full Name'}/>
                        <Input {...register('owner.email')} label={'Email'}/>

                    </div>
                    <div className={'flex gap-4 md:flex-row flex-col'}>
                        <Input {...register('owner.phonenumber')} label={'Phone'}/>
                        <Input {...register('owner.alt_phonenumber')} label={'Alternative Phone(opt)'}/>

                    </div>
                    <div className={'flex gap-4 md:flex-row flex-col'}>
                        <Select label={"Identifaction type"}>
                            <Option>Driver licence</Option>
                            <Option>Voter Card</Option>
                            <Option>NIDA</Option>
                            <Option>Passport</Option>
                        </Select>
                        <Input {...register('owner.identification_type')} label={'Identification No'}/>

                    </div>

                    <div className={'flex gap-4 md:flex-row flex-col'}>
                        <Input {...register('TIN')} label={'TIN'}/>
                        <Input {...register('BRELA')} label={"BRELA"}/>
                    </div>


                    <div className={'flex gap-4 md:flex-row flex-col'}>
                        
                        <Select onChange={(e)=>setOwnership({...ownership,mandate:e})} label={"Mandate on behalf of corporate body"}>
                            <Option>Yes</Option>
                            <Option>No</Option>
                        </Select>
                        <Select onChange={(e)=>setOwnership({...ownership,ownership_type:e})} label={"Ownership type"}>
                            <Option>Sole ownership</Option>
                            <Option>Family</Option>
                            <Option>Company</Option>

                        </Select>


                    </div>

                </div>
            </div>

            {/*  Supervisor/Broker's Information  */}
            <div className={'w-full'}>
                Broker/Supervisor Details
                <div className={'p-2 border-[0.8px] border-gray-600 space-y-4 shadow-md rounded-sm shadow-blue-800/20'}>
                    <div className={'flex gap-4 md:flex-row flex-col'}>
                        <Input {...register('broker.fullname')} label={'Full Name'}/>
                        <Input {...register('broker.email')} label={'Email'}/>

                    </div>
                    <div className={'flex gap-4 md:flex-row flex-col'}>
                        <Input {...register('broker.phonenumber')} label={'Phone'}/>
                        <Input {...register('broker.alt_phonenumber')} label={'Alternative Phone(opt)'}/>

                    </div>

                </div>
            </div>

            </>


    }


{
            activeStep === 3 &&

            <>
            
            {/*  Neighbours Information  */}
            <div className={'w-full'}>
                First Neighbour Details
                <div className={'p-2 border-[0.8px] border-gray-600 space-y-4 shadow-md rounded-sm shadow-blue-800/20'}>
                    <div className={'flex gap-4 md:flex-row flex-col'}>
                        <Input {...register('first_neighbour.fullname')} label={'Full Name'}/>
                        <Input {...register('first_neighbour.email')} label={'Email'}/>

                    </div>
                    <div className={'flex gap-4 md:flex-row flex-col'}>
                        <Input {...register('first_neighbour.phonenumber')} label={'Phone'}/>
                        <Input {...register('first_neighbour.alt_phonenumber')} label={'Alternative Phone(opt)'}/>

                    </div>

                </div>
            </div>


           

            {/*  2nd neighbour Information  */}
            <div className={'w-full'}>
                Second Neighbour Details(opt)
                <div className={'p-2 border-[0.8px] border-gray-600 space-y-4 shadow-md rounded-sm shadow-blue-800/20'}>
                    <div className={'flex gap-4 md:flex-row flex-col'}>
                        <Input {...register('second_neighbour.fullname')} label={'Full Name'}/>
                        <Input {...register('second_neighbour.email')} label={'Email'}/>

                    </div>
                    <div className={'flex gap-4 md:flex-row flex-col'}>
                        <Input {...register('second_neighbour.phonenumber')} label={'Phone'}/>
                        <Input {...register('second_neighbour.alt_phonenumber')} label={'Alternative Phone(opt)'}/>

                    </div>

                </div>
            </div>

            {/*  3rd neighbour Information  */}
            <div className={'w-full'}>
                Third Neighbour Details(opt)
                <div className={'p-2 border-[0.8px] border-gray-600 space-y-4 shadow-md rounded-sm shadow-blue-800/20'}>
                    <div className={'flex gap-4 md:flex-row flex-col'}>
                        <Input {...register('third_neighbour.fullname')} label={'Full Name'}/>
                        <Input {...register('third_neighbour.email')} label={'Email'}/>

                    </div>
                    <div className={'flex gap-4 md:flex-row flex-col'}>
                        <Input {...register('third_neighbour.phonenumber')} label={'Phone'}/>
                        <Input {...register('third_neighbour.alt_phonenumber')} label={'Alternative Phone(opt)'}/>

                    </div>

                </div>
            </div>

            {/*  Neighbouring features  */}
            <div className={'w-full'}>
                Neighbouring Features
                <div className={'p-2 border-[0.8px] border-gray-600 space-y-4 shadow-md rounded-sm shadow-blue-800/20'}>
                    <div className={'flex gap-4 md:flex-row flex-col'}>
                        <Input {...register('fourth_neighbour.fullname')} label={'Full Name'}/>
                        <Input {...register('fourth_neighbour.email')} label={'Email'}/>

                    </div>
                    <div className={'flex gap-4 md:flex-row flex-col'}>
                        <Input {...register('fourth_neighbour.phonenumber')} label={'Phone'}/>
                        <Input {...register('fourth_neighbour.alt_phonenumber')} label={'Alternative Phone(opt)'}/>

                    </div>

                </div>
            </div>

            </>
          } 

          {

            activeStep === 4
            && 
          
                <>
            {/*  Townplan and official search  */}
            <div className={'w-full'}>
                Townplan and Official search
                <div className={'p-2 border-[0.8px] border-gray-600 space-y-4 shadow-md rounded-sm shadow-blue-800/20'}>
                    <div className={'flex gap-4 md:flex-row flex-col'}>


                        <FileUpload title={'town plan'} files={townplan} setFiles={setTownplan}/>
                        <FileUpload title={'official search'} files={searchFromMinistry} setFiles={setSearchFromMinistry}
                                    fileType={'pdf'}/>

                    </div>
                </div>

                <div className='p-2 w-full  justify-center flex'>

                <button className='p-2 rounded w-1/2 bg-blue-900 text-white'>Add project</button>
                </div>

            </div>
            </>
          } 
        </form>
    )
}
