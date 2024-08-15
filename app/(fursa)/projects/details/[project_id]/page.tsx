'use client'
import {projects} from '../../../../../constants/projects'
import Image from 'next/image'

export default function Details({params}) {

    const project = projects.filter((item) => item.id == params.project_id)[0]
    console.log(project)
    return (
        <div className={'flex flex-col gap-y-4'}>
            <h1 className={'md:text-3xl text-xl font-bold text-gray-700'}>{project.name} Project</h1>
            <div
                className={'grid md:grid-cols-4 grid-cols-2  w-full h-[50vh] overflow-y-scroll bg-gray-100 rounded gap-3 p-2'}>
                {Array(project.number_of_plots).fill().map((item, index) => <div
                    key={index}
                    className={index === 3 ? 'md:w-36 hover:scale-95 relative text-gray-700 font-bold hover:shadow-xl hover:outline hover:outline-red-800/20 hover:shadow-red-800/20 cursor-not-allowed duration-300 transition ease-in-out md:h-28 w-20 h-16 flex items-center justify-center rounded shadow-md bg-green-500/20 shadow-blue-800/20 border-[0.8px] rounded' : 'md:w-36 hover:scale-105 hover:shadow-xl hover:outline hover:outline-yellow-800/20 hover:shadow-yellow-800/20 cursor-pointer duration-300 transition ease-in-out md:h-28 w-20 h-16 flex items-center justify-center rounded shadow-md bg-gray-500/20 shadow-blue-800/20 border-[0.8px] rounded text-gray-700'}>
                    Plot {index + 1}
                    {index === 3 &&
                        <Image src={'/sold.png'} className={'w-20 md:w-36 h-16 opacity-20 md:h-28 absolute'} width={100}
                               height={100}/>}
                </div>)}
            </div>
            <div className={'flex md:flex-row flex-col gap-3'}>
                <div>
                    <h1>Photo of the project</h1>
                    <Image src={'/kiwanja.jpg'} width={200} height={200} className={'object-cover w-[90vw] md:w-[40vw] h-[40vh]'}/>
                </div>
                <div>
                    <h1>Map of the project</h1>
                    <Image src={'/ramani.jpg'} width={200} height={200} className={'object-cover w-[90vw] md:w-[40vw] h-[40vh]'}/>
                </div>
            </div>

        </div>
    )
}
