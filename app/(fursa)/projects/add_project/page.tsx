'use client'
import {useState} from 'react'
import {Input,Select,Option} from '@material-tailwind/react'
import FileUpload from '../../../../components/drag_n_drop_component/DragNDrop'


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

    return(
        <div className={'flex flex-col gap-y-4 items-center justify-center w-full pb-10 '}>
            <div className={'text-center  text-2xl text-[#17225a] font-bold p-2'}>Add new Project</div>
            {/* Project Details */}
            <div className={'w-full'}>
                Project Details
                <div className={'p-2 border-[0.8px] border-gray-600 space-y-4 shadow-md rounded-sm shadow-blue-800/20'}>
                    <div className={'flex gap-4 md:flex-row flex-col'}>
                        <Input label={'Name'}/>
                        <Input label={'Project ID from ministry(optional)'}/>

                    </div>
                    <div className={'flex gap-4 md:flex-row flex-col'}>
                        <Input label={'Size in ㎡'}/>
                        <Select label={"project type"}>
                            <Option>Residential</Option>
                            <Option>Residential and commercial</Option>
                            <Option>Industrial</Option>
                            <Option>Public utilities</Option>
                            <Option>Open space</Option>
                            <Option>Utilities</Option>
                        </Select>


                    </div>
                    <div className={'flex gap-4 md:flex-row flex-col'}>
                        <Input label={'Indicative Price(from broker)'} type={'number'}/>
                        <Input label={'Selling price'}/>

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
                        <Select label={"Region"}>
                            <Option>Dar es Salaam</Option>
                            <Option>Tanga</Option>
                            <Option>Arusha</Option>
                            <Option>Mwanza</Option>
                            <Option>Morogoro</Option>
                            <Option>Mbeya</Option>
                        </Select>
                        <Select label={"District"}>
                            <Option>Ilala</Option>
                            <Option>Kinondoni</Option>
                            <Option>Ubungo</Option>
                            <Option>Temeke</Option>
                            <Option>Bunju</Option>
                        </Select>

                    </div>
                    <div className={'flex gap-4 md:flex-row flex-col'}>
                        <Select label={"Ward"}>
                            <Option>Tabata</Option>
                            <Option>Sinza</Option>
                            <Option>Mbagala</Option>
                            <Option>Kigamboni</Option>
                            <Option>Masaki</Option>
                            <Option>Mbweni</Option>
                        </Select>
                        <Select label={"Division"}>
                            <Option>Segerea</Option>
                            <Option>Zakiem</Option>
                            <Option>Polisi</Option>
                            <Option>Toangoma</Option>
                            <Option>Kisutu</Option>
                        </Select>


                    </div>
                    <div className={'flex gap-4 md:flex-row flex-col'}>
                        <Input label={'Street'}/>
                        <Input className={'hidden'}/>
                    </div>

                </div>
            </div>

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

            {/* Owner's details */}
            <div className={'w-full'}>
                Owner Details
                <div className={'p-2 border-[0.8px] border-gray-600 space-y-4 shadow-md rounded-sm shadow-blue-800/20'}>
                    <div className={'flex gap-4 md:flex-row flex-col'}>
                        <Input label={'Full Name'}/>
                        <Input label={'Email'}/>

                    </div>
                    <div className={'flex gap-4 md:flex-row flex-col'}>
                        <Input label={'Phone'}/>
                        <Input label={'Alternative Phone(opt)'}/>

                    </div>
                    <div className={'flex gap-4 md:flex-row flex-col'}>
                        <Select label={"Identifaction type"}>
                            <Option>Driver licence</Option>
                            <Option>Voter Card</Option>
                            <Option>NIDA</Option>
                            <Option>Passport</Option>
                        </Select>
                        <Input label={'Identification No'}/>

                    </div>

                    <div className={'flex gap-4 md:flex-row flex-col'}>
                        <Input label={'TIN'}/>
                        <Input label={"BRELA"}/>
                    </div>


                    <div className={'flex gap-4 md:flex-row flex-col'}>
                        <Input label={'Mandate on behalf of corporate body'}/>
                        <Select label={"Ownership type"}>
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
                        <Input label={'Full Name'}/>
                        <Input label={'Email'}/>

                    </div>
                    <div className={'flex gap-4 md:flex-row flex-col'}>
                        <Input label={'Phone'}/>
                        <Input label={'Alternative Phone(opt)'}/>

                    </div>

                </div>
            </div>

            {/*  Neighbours Information  */}
            <div className={'w-full'}>
                First Neighbour Details
                <div className={'p-2 border-[0.8px] border-gray-600 space-y-4 shadow-md rounded-sm shadow-blue-800/20'}>
                    <div className={'flex gap-4 md:flex-row flex-col'}>
                        <Input label={'Full Name'}/>
                        <Input label={'Email'}/>

                    </div>
                    <div className={'flex gap-4 md:flex-row flex-col'}>
                        <Input label={'Phone'}/>
                        <Input label={'Alternative Phone(opt)'}/>

                    </div>

                </div>
            </div>

            {/*  2nd neighbour Information  */}
            <div className={'w-full'}>
                Second Neighbour Details(opt)
                <div className={'p-2 border-[0.8px] border-gray-600 space-y-4 shadow-md rounded-sm shadow-blue-800/20'}>
                    <div className={'flex gap-4 md:flex-row flex-col'}>
                        <Input label={'Full Name'}/>
                        <Input label={'Email'}/>

                    </div>
                    <div className={'flex gap-4 md:flex-row flex-col'}>
                        <Input label={'Phone'}/>
                        <Input label={'Alternative Phone(opt)'}/>

                    </div>

                </div>
            </div>

            {/*  3rd neighbour Information  */}
            <div className={'w-full'}>
                Third Neighbour Details(opt)
                <div className={'p-2 border-[0.8px] border-gray-600 space-y-4 shadow-md rounded-sm shadow-blue-800/20'}>
                    <div className={'flex gap-4 md:flex-row flex-col'}>
                        <Input label={'Full Name'}/>
                        <Input label={'Email'}/>

                    </div>
                    <div className={'flex gap-4 md:flex-row flex-col'}>
                        <Input label={'Phone'}/>
                        <Input label={'Alternative Phone(opt)'}/>

                    </div>

                </div>
            </div>

            {/*  Neighbouring features  */}
            <div className={'w-full'}>
                Neighbouring Features
                <div className={'p-2 border-[0.8px] border-gray-600 space-y-4 shadow-md rounded-sm shadow-blue-800/20'}>
                    <div className={'flex gap-4 md:flex-row flex-col'}>
                        <Input label={'First feature'}/>
                        <Input label={'Second feature(opt)'}/>

                    </div>
                    <div className={'flex gap-4 md:flex-row flex-col'}>
                        <Input label={'Third feature(opt)'}/>
                        <Input label={'Fourth feature(opt)'}/>

                    </div>

                </div>
            </div>

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
            </div>
        </div>
    )
}
