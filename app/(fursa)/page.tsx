'use client'
import Image from "next/image";
import {useState,useEffect} from 'react'
import moment from 'moment'
import CountUp from 'react-countup';

export default function Home() {
  const [currentTime, setCurrentTime] = useState(moment());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(moment());
    }, 60000); 

    return () => clearInterval(intervalId); 
  }, []);
  return (
      <main className="flex min-h-screen flex-col items-center  ">
        <div className={'flex justify-start w-full '}>
          <div className={'flex flex-col '}>
            <span className={'text-2xl text-[#17255a]'}>{currentTime.format('h:mm a')}</span>
            <span className={'text-lg text-[#17255a]/40'}>{currentTime.format('dddd, MMMM Do YYYY')}</span>
          </div>

        </div>
        <div className={' py-2 grid md:grid-cols-4 grid-cols-2  gap-8 '}>
          <div className={'sm:w-40 w-32 flex flex-col items-center bg-blue-100/30 px-4 py-2 rounded-md shadow-xl shadow-blue-800/20'}>
            <span className={'text-blue-300 sm:text-md text-xs'}>Total projects  </span>
            <b className={'sm:text-3xl text-xl text-blue-900 font-black'}>
              <CountUp end={12} duration={5} />
              </b>
          </div>
          <div className={'sm:w-40 w-32 flex flex-col items-center bg-green-100/30 px-4 py-2 rounded-md shadow-xl shadow-blue-800/20'}>
            <span className={'text-green-300 sm:text-md text-xs'}>Total plots sold</span>
            <b className={'sm:text-3xl text-xl text-green-900 font-bold'}>
              <CountUp end={154} duration={5} />
              </b>
          </div>
          <div className={'sm:w-40 w-32 flex flex-col items-center bg-orange-100/30 px-4 py-2 rounded-md shadow-xl shadow-blue-800/20'}>
            <span className={'text-orange-300 sm:text-md text-xs'}>Total Sales</span>
            <b className={'sm:text-3xl text-xl text-orange-900 font-bold'}>
              <CountUp end={15400}  suffix="/=" duration={5} />
              </b>
          </div>
          <div className={'sm:w-40 w-32 flex flex-col items-center bg-purple-100/30 px-4 py-2 rounded-md shadow-xl shadow-blue-800/20'}>
            <span className={'text-purple-300 sm:text-md text-xs'}>New customers</span>
            <b className={'sm:text-3xl text-xl text-purple-900 font-bold'}>
              <CountUp end={400}   duration={5} />
              </b>
          </div>
        </div>

        <div className="w-full py-4">
          <h1 className='text-xl text-gray-700 self-start '>Client activities</h1>

        </div>

      </main>
  );
}
