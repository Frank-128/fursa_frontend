'use client'
import {useState} from 'react'
import {Input,Select,Option} from '@material-tailwind/react'
import Dropzone from 'react-dropzone'
import FileUpload from '../../../../components/drag_n_drop_component/DragNDrop'

export default  function AddProject(){
    const [files, setFiles] = useState([]);
    return(
        <div className={'flex flex-col gap-y-4 items-center justify-center w-full bg-green-700 '}>
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


                        <FileUpload title={'map'} files={files} setFiles={setFiles}/>
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

                </div>
            </div>

        </div>
    )
}
