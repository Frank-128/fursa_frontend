'use client'
import {projects} from '@/constants/projects'
import Image from 'next/image'
import {Button, Chip, Dialog, DialogBody, DialogFooter, DialogHeader, Typography} from "@material-tailwind/react";
import {FaCopy, FaDownload, FaEdit} from "react-icons/fa";
import {useState} from "react";
import Link from "next/link";

export default function Details({params}: { params: { project_id: string } }) {

    const project = projects.filter((item) => item.id === Number(params.project_id))[0]
    const [showProfile, setShowProfile] = useState(false)
    const [showPlot,setShowPlot] = useState(false)

    return (
        <div className={'flex flex-col gap-y-4 pb-5'}>
            <div className={'flex gap-2'}>
                <h1 className={'md:text-3xl text-xl font-bold text-gray-700'}>{project.name} Project </h1>
                {!project.status ? <Chip value={'ongoing'} color={'orange'}/> :
                    <Chip value={'sold out'} color={'green'}/>}
            </div>
            <div className={'flex md:flex-row flex-col justify-between w-full gap-4'}>

                <div className={'border-[0.9px] border-gray-500 p-4 md:w-1/2 rounded shadow-md shadow-blue-900/30'}>
                    <h2 className={'font-bold text-[#17225a]'}>Project Details</h2>
                    <div className={' grid  grid-cols-2   '}>

                        <div className={'flex items-center gap-2'}>
                            <h1 className={'text-gray-400 text-sm'}>Name </h1>
                            <h2 className={'text-gray-800 text-lg font-bold'}>{project.name}</h2>
                        </div>
                        <div className={'flex items-center gap-2 '}>
                            <h1 className={'text-gray-400 text-sm'}>Ministry ID </h1>
                            <h2>12345</h2>
                        </div>
                        <div className={'flex items-center gap-2 '}>
                            <h1 className={'text-gray-400 text-sm'}>Size </h1>
                            <h2>{project.size}</h2>
                        </div>
                        <div className={'flex items-center gap-2'}>
                            <h1 className={'text-gray-400 text-sm'}>Number of plots </h1>
                            <h2>{project.number_of_plots}</h2>
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
                            <h2 className={'text-gray-800 text-lg font-bold'}>Arusha</h2>
                        </div>
                        <div className={'flex items-center gap-2'}>
                            <h1 className={'text-gray-400 text-sm'}>District </h1>
                            <h2>Arumeru</h2>
                        </div>
                        <div className={'flex items-center gap-2'}>
                            <h1 className={'text-gray-400 text-sm'}>Ward </h1>
                            <h2>Munincipal</h2>
                        </div>
                        <div className={'flex items-center gap-2'}>
                            <h1 className={'text-gray-400 text-sm'}>Division </h1>
                            <h2 className={'text-gray-800 text-lg font-bold'}>Seriani</h2>
                        </div>
                        <div className={'flex items-center gap-2'}>
                            <h1 className={'text-gray-400 text-sm'}>Street </h1>
                            <h2>Uzunguni</h2>
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
                            <h2 className={'text-gray-800 text-lg font-bold'}>12,000/=</h2>
                        </div>
                        <div className={'flex items-center gap-2 '}>
                            <h1 className={'text-gray-400 text-sm'}>Selling Price </h1>
                            <h2>45,000/=</h2>
                        </div>
                        <div className={'flex items-center gap-2 '}>
                            <h1 className={'text-gray-400 text-sm'}>Plot type </h1>
                            <h2>residential</h2>
                        </div>
                        <div className={'flex items-center gap-2'}>
                            <h1 className={'text-gray-400 text-sm'}>Features </h1>
                            <h2 className={'text-gray-800 text-lg font-bold'}>River, Crater</h2>
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
                className={'grid md:grid-cols-4 grid-cols-2  w-full h-[50vh] overflow-y-scroll bg-gray-100 rounded gap-3 p-2'}>
                {Array(project.number_of_plots).fill(null).map((_, index) => <div
                    key={index}
                    onClick={()=>setShowPlot(true)}
                    // onDoubleClick={()=>{
                    //     alert('hi')
                    // }}
                    className={index === 3 ? 'md:w-36 hover:scale-95 relative text-gray-700 font-bold hover:shadow-xl hover:outline hover:outline-red-800/20 hover:shadow-red-800/20 cursor-pointer duration-300 transition ease-in-out md:h-28 w-20 h-16 flex items-center justify-center  shadow-md bg-green-500/20 shadow-blue-800/20 border-[0.8px] rounded' : 'md:w-36 hover:scale-105 hover:shadow-xl hover:outline hover:outline-yellow-800/20 hover:shadow-yellow-800/20 cursor-pointer duration-300 transition ease-in-out md:h-28 w-20 h-16 flex items-center justify-center rounded shadow-md bg-gray-500/20 shadow-blue-800/20 border-[0.8px]  text-gray-700'}>
                    Plot {index + 1}
                    {index === 3 &&
                        <Image alt={"sold"} src={'/sold.png'}
                               className={'w-20 md:w-36 h-16 opacity-20 md:h-28 absolute'} width={100}
                               height={100}/>}
                </div>)}
            </div>
            <div className={'flex md:flex-row flex-col gap-3'}>
                <div className={'relative'}>
                    <h1>Photo of the project</h1>
                    <Image alt={"kiwanja"} src={'/kiwanja.jpg'} width={200} height={200}
                           className={'object-cover w-[90vw] md:w-[40vw] h-[40vh] '}/>
                    <span className={'absolute top-8 cursor-pointer right-5 bg-[#17225a] rounded-md p-2'}>
                        <FaDownload color={'white'}  />
                    </span>
                </div>
                <div className={'relative'}>
                    <h1>Map of the project</h1>
                    <Image alt={"ramani"} src={'/ramani.jpg'} width={200} height={200}
                           className={'object-cover w-[90vw] md:w-[40vw] h-[40vh]'}/>
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

        </div>
    )
}
