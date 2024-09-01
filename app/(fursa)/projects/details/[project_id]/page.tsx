'use client'
import {projects} from '@/constants/projects'
import Image from 'next/image'
import {
    Button,
    Chip,
    Dialog,
    DialogBody,
    DialogFooter,
    DialogHeader, List, ListItem,
    Popover, PopoverContent, PopoverHandler,
    Typography
} from "@material-tailwind/react";
import {FaCopy, FaDownload, FaEdit} from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import {useMemo, useState} from "react";
import Link from "next/link";
import api from '@/axiosInstance';
import { useQuery } from '@tanstack/react-query';
import { globalStore } from '@/context/store';
import Spinner from '@/components/spinner/Spinner';

export default function Details({params}: { params: { project_id: string } }) {

    const project = projects.filter((item) => item.id === Number(params.project_id))[0]
    const token = globalStore(state=>state.token)

    const getProject = async()=>{

        const res = await api.get('project/'+params.project_id,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })

        return res.data
    }


    const {data,error,isLoading} = useQuery({
        queryFn:getProject,
        queryKey:['getProject']
    });

    const [showProfile, setShowProfile] = useState(false)
    const [showPlot,setShowPlot] = useState(false)
    const [selectedPlots,setSelectedPlots] = useState<{index:number,plotNo:number}[]>([]);
    const [isPopoverOpen,setIsPopoverOpen] = useState(false)
    const [selectedPlot, setSelectedPlot] = useState<number | null>(null)
    const showMergeContainer = useMemo(()=>selectedPlots.length > 0,[selectedPlots])


    const handleSelected = (id: number,plotNo:number) => {
        setSelectedPlots(prevSelectedPlots => {
            if (prevSelectedPlots.some(item => item.index === id)) {
                // Remove the object if it already exists
                return prevSelectedPlots.filter(item => item.index !== id);
            } else {
                // Add a new object to the array
                return [...prevSelectedPlots, { index: id, plotNo:plotNo }];
            }
        });
    };


    return (
       <>
        {
         isLoading ? <Spinner /> : <div className={'flex flex-col gap-y-4 pb-5 relative'}>
            {
                showMergeContainer &&
                <div className={' h-24 rounded-lg p-2 z-[99] bg-[#17225a] md:w-[55%] flex flex-col justify-between w-[90%] text-gray-300 shadow-lg shadow-light-blue-800/20 fixed '}>
                    {
                        selectedPlots.length > 1 ?
                            <div className={'flex justify-between sm:text-sm text-xs'}>
                                <div><span className={'text-blue-600 cursor-pointer hover:underline '}>Merge</span>
                                    &nbsp;plots
                                    {
                                        selectedPlots.map((item,index)=><span>&nbsp;{item.plotNo},</span>)
                                    }
                                </div>
                                <span className={'sm:text-sm text-xs text-blue-600 hover:underline cursor-pointer'}>+ create sale</span>
                            </div> :
                            <div className={'flex  justify-between'}>

                                <span className={'sm:text-sm text-xs text-blue-600 hover:underline cursor-pointer'}>+ create sale</span>
                            </div>
                    }
                    <div onClick={()=>setSelectedPlots([])} className={'bg-red-400 cursor-pointer rounded text-center p-1 text-white w-1/6 self-end'}>
                        clear
                    </div>
                </div>

            }

            <div className={'flex gap-2'}>
                <h1 className={'md:text-3xl text-xl font-bold text-gray-700'}>{data?.name} Project </h1>
                 <Chip value={data?.status} color={data?.status === "Pending" ?"deep-orange":data.status==="Available"?"light-blue":"green"}/> 
                    
            </div>
            <div className={'flex md:flex-row flex-col justify-between w-full gap-4'}>

                <div className={'border-[0.9px] border-gray-500 p-4 md:w-1/2 rounded shadow-md shadow-blue-900/30'}>
                    <h2 className={'font-bold text-[#17225a]'}>Project Details</h2>
                    <div className={' grid  grid-cols-2   '}>

                        <div className={'flex items-center gap-2'}>
                            <h1 className={'text-gray-400 text-sm'}>Name </h1>
                            <h2 className={'text-gray-800 text-lg font-bold'}>{data?.name}</h2>
                        </div>
                        <div className={'flex items-center gap-2 '}>
                            <h1 className={'text-gray-400 text-sm'}>Ministry ID </h1>
                            <h2>12345</h2>
                        </div>
                        <div className={'flex items-center gap-2 '}>
                            <h1 className={'text-gray-400 text-sm'}>Size </h1>
                            <h2>{data?.size}</h2>
                        </div>
                        <div className={'flex items-center gap-2'}>
                            <h1 className={'text-gray-400 text-sm'}>Number of plots </h1>
                            <h2>{project?.number_of_plots}</h2>
                        </div>
                        <div className={'flex items-center gap-2'}>
                            <h1 className={'text-gray-400 text-sm'}>Prev owner </h1>
                            <h2 onClick={()=>setShowProfile(true)} className={'text-green-300 cursor-pointer'}>Khalid</h2>
                        </div>
                        <div className={'flex items-center gap-2'}>
                            <h1 className={'text-gray-400 text-sm'}>Supervisor </h1>
                            <h2 onClick={()=>setShowProfile(true)} className={'text-green-300 cursor-pointer'}>John</h2>
                        </div>

                    </div>
                </div>
                <div className={'border-[0.9px] border-gray-500 p-4 md:w-1/2 rounded shadow-md shadow-blue-900/30'}>
                    <h2 className={'font-bold text-[#17225a]'}>Project Location</h2>
                    <div className={' grid  grid-cols-2   '}>

                        <div className={'flex items-center gap-2'}>
                            <h1 className={'text-gray-400 text-sm'}>Region </h1>
                            <h2 className={'text-gray-800 text-lg font-bold'}>{data?.address.region_name}</h2>
                        </div>
                        <div className={'flex items-center gap-2'}>
                            <h1 className={'text-gray-400 text-sm'}>District </h1>
                            <h2>{data?.address.region_name}</h2>
                        </div>
                        <div className={'flex items-center gap-2'}>
                            <h1 className={'text-gray-400 text-sm'}>Ward </h1>
                            <h2>{data?.address.ward_name}</h2>
                        </div>
                        <div className={'flex items-center gap-2'}>
                            <h1 className={'text-gray-400 text-sm'}>Division </h1>
                            <h2 className={'text-gray-800 text-lg font-bold'}>{data?.division}</h2>
                        </div>
                        <div className={'flex items-center gap-2'}>
                            <h1 className={'text-gray-400 text-sm'}>Street </h1>
                            <h2>{data?.street}</h2>
                        </div>
                    </div>
                </div>
            </div>


            <div className={'flex md:flex-row flex-col justify-between w-full gap-4'}>

                <div className={'border-[0.9px] border-gray-500 p-4 md:w-1/2 rounded shadow-md shadow-blue-900/30'}>
                    <h2 className={'font-bold text-[#17225a]'}>Additional Details</h2>
                    <div className={' grid  grid-cols-1  gap-y-3 '}>

                        <div className={'flex items-center gap-2'}>
                            <h1 className={'text-gray-400 text-sm'}>Indicative Price </h1>
                            <h2 className={'text-gray-800 text-lg font-bold'}>{data?.broker_price}</h2>
                        </div>
                        <div className={'flex items-center gap-2 '}>
                            <h1 className={'text-gray-400 text-sm'}>Selling Price </h1>
                            <h2>{data?.selling_price}</h2>
                        </div>
                        <div className={'flex items-center gap-2 '}>
                            <h1 className={'text-gray-400 text-sm'}>Project type </h1>
                            <h2>{data?.project_type}</h2>
                        </div>
                        <div className={'flex items-center gap-2'}>
                            <h1 className={'text-gray-400 text-sm'}>Features </h1>
                            <h2 className={'text-gray-800 text-lg font-bold'}>{data?.first_neighbouring_feature},{data?.second_neighbouring_feature}, {data?.third_neighbouring_feature}</h2>
                        </div>
                        <div className={'flex items-start gap-2'}>
                            <h1 className={'text-gray-400 text-sm'}>Neighbours </h1>
                            <ul className={'flex flex-col  gap-1 '}>
                                <li onClick={()=>setShowProfile(true)} className={'text-green-300 cursor-pointer'}>Abdallah</li>
                                <li onClick={()=>setShowProfile(true)} className={'text-green-300 cursor-pointer'}>Kalvin</li>
                            </ul>
                        </div>


                    </div>
                </div>
                <div className={'border-[0.9px] border-gray-500 p-4 md:w-1/2 rounded shadow-md shadow-blue-900/30'}>
                    <h2 className={'font-bold text-[#17225a]'}>Relevant documents</h2>
                    <div className={' grid   gap-y-3  '}>

                        <div className={'flex items-center gap-2  justify-between'}>
                            <h1 className={'text-gray-400 text-sm'}>Contract for sale</h1>
                            <div
                                className={'shadow-xl bg-gray-500/30 cursor-pointer w-24 border-gray-500  rounded-sm flex items-center justify-center p-1'}>
                                <FaDownload color={'grey'}/>
                            </div>
                        </div>
                        <div className={'flex items-center gap-2  justify-between'}>
                            <h1 className={'text-gray-400 text-sm'}>Local gvt info</h1>
                            <div
                                className={'shadow-xl bg-gray-500/30 cursor-pointer w-24 border-gray-500  rounded-sm flex items-center justify-center p-1'}>
                                <FaDownload color={'grey'}/>
                            </div>
                        </div>
                        <div className={'flex items-center gap-2  justify-between'}>
                            <h1 className={'text-gray-400 text-sm'}>Ministry search</h1>
                            <div
                                className={'shadow-xl bg-gray-500/30 cursor-pointer w-24 border-gray-500  rounded-sm flex items-center justify-center p-1'}>
                                <FaDownload color={'grey'}/>
                            </div>
                        </div>
                        <div className={'flex items-center gap-2  justify-between'}>
                            <h1 className={'text-gray-400 text-sm'}>Fursa survey</h1>
                            <div
                                className={'shadow-xl cursor-pointer bg-gray-500/30 w-24 border-gray-500  rounded-sm flex items-center justify-center p-1'}>
                                <FaDownload color={'grey'}/>
                            </div>
                        </div>

                        <div className={'flex items-center gap-2  justify-between'}>
                            <h1 className={'text-gray-400 text-sm'}>Fursa search</h1>
                            <div
                                className={'shadow-xl cursor-pointer bg-gray-500/30 w-24 border-gray-500  rounded-sm flex items-center justify-center p-1'}>
                                <FaDownload color={'grey'}/>
                            </div>
                        </div>

                    </div>
                </div>
            </div>


            <div
                className={'grid md:grid-cols-4 grid-cols-2  w-full h-[50vh] overflow-y-scroll bg-gray-100  rounded gap-3 p-2'}>
                {Array(data?.number_of_plots).fill(null).map((_, index) => <div
                    key={index}

                    
                    className={index === 3 ? `md:w-36 hover:scale-95  relative text-gray-700 font-bold hover:shadow-xl hover:outline hover:outline-red-800/20 hover:shadow-red-800/20 cursor-pointer duration-300 transition ease-in-out md:h-28 w-20 h-16 flex items-center justify-center  shadow-md bg-green-500/20 shadow-blue-800/20 border-[0.8px] rounded`
                        :
                        ` ${selectedPlots.some( item=>item.index === index) && 'outline-yellow-800/20 shadow-yellow-800/20 shadow-xl scale-105 outline'} md:w-36  cursor-pointer duration-300 transition ease-in-out md:h-28 w-20 h-16 flex items-center justify-center rounded relative shadow-md bg-gray-500/20 shadow-blue-800/20 border-[0.8px]  text-gray-700`}>
                    Plot {index + 1}
                    {index === 3 &&
                        <Image alt={"sold"} src={'/sold.png'}
                               className={'w-20 md:w-36 h-16 opacity-20 md:h-28 absolute'} width={100}
                               height={100}/>}
                    <Popover placement={'bottom-end'} open={isPopoverOpen && index === selectedPlot} handler={()=>setIsPopoverOpen(false)}>
                        <PopoverHandler onClick={()=> {
                            setIsPopoverOpen(true)
                            setSelectedPlot(index)
                        }}>
                          <span  className={'absolute top-2 right-1'}>
                        <BsThreeDotsVertical/>
                    </span>
                        </PopoverHandler>
                        <PopoverContent className={'p-1'}>
                            <List className={
                                'p-0'
                            }>
                                <ListItem className='font-helvetica text-center' onClick={()=> {
                                    handleSelected(index,index+1);
                                    setIsPopoverOpen(false)
                                }}>
                                    {
                                        selectedPlots.some( item=>item.index === index) && (index === selectedPlot) ?
                                    "deselect" :"select"
                                    }
                                        </ListItem>
                                <ListItem className='font-helvetica text-center' onClick={() =>  setShowPlot(true) }>view</ListItem>
                                <ListItem className='font-helvetica text-center'>create sale</ListItem>
                            </List>
                        </PopoverContent>
                    </Popover>

                </div>)}
            </div>
            <div className={'flex md:flex-row flex-col gap-3'}>
                <div className={'relative'}>
                    <h1>Photo of the project</h1>
                    <Image alt={"kiwanja"} src={'/kiwanja.jpg'} width={200} height={200}
                           className={'object-cover w-[90vw] md:w-[40vw] h-[40vh] '}/>
                    <span className={'absolute top-8 cursor-pointer left-5 bg-[#abcabc] rounded-md p-2'}>
                        <FaEdit color={'white'}/>
                    </span>
                    <span className={'absolute top-8 cursor-pointer right-5 bg-[#17225a] rounded-md p-2'}>
                        <FaDownload color={'white'}/>
                    </span>
                </div>
                <div className={'relative'}>
                    <h1>Map of the project</h1>
                    <Image alt={"ramani"} src={'http://localhost:8000/'+data?.project_map} width={200} height={200}
                           className={'object-cover w-[90vw] md:w-[40vw] h-[40vh]'}/>
                    <span className={'absolute top-8 cursor-pointer left-5 bg-[#abcabc] rounded-md p-2'}>
                        <FaEdit color={'white'}/>
                    </span>
                    <span className={'absolute top-8 cursor-pointer right-5 bg-[#17225a] rounded-md p-2'}>
                        <FaDownload color={'white'}/>
                    </span>
                </div>
            </div>
            <Dialog size={'xs'} open={showProfile} handler={() => setShowProfile(false)}>

                <DialogHeader className={'flex justify-center'}>
                <Typography variant="h5" className={'text-center'} color="blue-gray">
                    Owner&apos;s Details
                </Typography>
            </DialogHeader>
                <DialogBody divider className="grid place-items-center gap-4">


                    <div className={'px-10 justify-between flex w-full items-center'}>
                    <span className={'text-gray-400'}>
                        name
                    </span>
                        <span className={'text-gray-700'}>
                        Kelvin John
                    </span>
                    </div>

                    <div className={'px-10 justify-between flex w-full items-center'}>
                    <span className={'text-gray-400'}>
                        Email
                    </span>
                        <span className={'text-gray-700 flex cursor-pointer items-center gap-2'}>
                        <i>kelvinjohn@gmail.com</i>
                         <b>
                        <FaCopy/>
                    </b>
                    </span>
                    </div>
                    <div className={'px-10 justify-between flex w-full items-center'}>
                    <span className={'text-gray-400'}>
                        Phone number
                    </span>
                        <span className={'text-gray-700 flex cursor-pointer items-center gap-2'}>
                        <i>+255745884099</i>
                         <b>
                        <FaCopy/>
                    </b>
                    </span>
                    </div>
                    <div className={'px-10 justify-between flex w-full items-center'}>
                    <span className={'text-gray-400'}>
                        Projects
                    </span>
                        <span className={'text-gray-700'}>
                        <Link className={'text-blue-700'} href={'/projects/details/1'}>Swala</Link>, <Link className={'text-blue-700'} href={'/projects/details/2'}>Chui</Link>, <Link className={'text-blue-700'} href={'/projects/details/3'}>Tembo</Link>
                    </span>
                    </div>
                </DialogBody>
                <DialogFooter className="space-x-2">
                    <Button variant="text" color="blue-gray" onClick={() => setShowProfile(false)}>
                        close
                    </Button>

                </DialogFooter>


                {/*    end */}
            </Dialog>

            <Dialog size={'xs'} open={showPlot} handler={()=>setShowPlot(false)}>

                <DialogHeader className={'flex justify-center'}>
                    <Typography variant="h5" className={'text-center'} color="blue-gray">
                        Plot 5 Details
                    </Typography>
                </DialogHeader>
                <DialogBody divider className="grid place-items-center gap-4">

                    <div className={'px-10 justify-between flex w-full items-center'}>
                    <span className={'text-gray-400'}>
                        Name
                    </span>
                        <span className={'text-gray-700 flex items-center gap-2'}>
                       Tandale
                    </span>
                    </div>
                    <div className={'px-10 justify-between flex w-full items-center'}>
                    <span className={'text-gray-400'}>
                        size
                    </span>
                        <span className={'text-gray-700 flex cursor-pointer items-center gap-2'}>
                       <b>112,000 msq </b>
                       <FaEdit/>
                    </span>
                    </div>

                    <div className={'px-10 justify-between flex w-full items-center'}>
                    <span className={'text-gray-400'}>
                        Status
                    </span>
                        <span className={'text-gray-700 flex items-center gap-2'}>
                        <Chip value={'available'} color={'light-blue'}/>
                    </span>
                    </div>
                    <div className={'px-10 justify-between flex w-full items-center'}>
                    <span className={'text-gray-400'}>
                        Price per 1 metre squared
                    </span>
                        <span className={'text-gray-700 flex cursor-pointer items-center gap-2'}>
                       <b>500,000/= </b>
                       <FaEdit/>
                    </span>
                    </div>
                    <div className={'px-10 justify-between flex w-full items-center'}>
                    <span className={'text-gray-400'}>
                        Total price
                    </span>
                        <span className={'text-gray-700 flex cursor-pointer items-center gap-2'}>
                       <b>62,500,000/=</b>
                            <FaEdit/>
                    </span>
                    </div>
                </DialogBody>
                <DialogFooter className="space-x-2">
                    <Button variant="text" color="blue-gray" onClick={() => setShowPlot(false)}>
                        close
                    </Button>

                </DialogFooter>


                {/*    end */}
            </Dialog>

        </div>}
        </>
    )
}
