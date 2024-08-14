'use client'
import Image from "next/image";
import {useState,useEffect} from 'react'
import moment from 'moment'
import CountUp from 'react-countup';

export default function Home() {
  const [currentTime, setCurrentTime] = useState(moment());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(moment()); // Update the current time every minute
    }, 60000); // 60000 milliseconds = 1 minute

    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, []);
  return (
      <main className="flex min-h-screen flex-col items-center  ">
        <div className={'flex justify-start w-full '}>
          <div className={'flex flex-col '}>
            <span className={'text-2xl text-[#17255a]'}>{currentTime.format('h:mm a')}</span>
            <span className={'text-lg text-[#17255a]/40'}>{currentTime.format('MMMM Do, YYYY')}</span>
          </div>

        </div>
        <div className={'flex justify-between py-2 px-10 gap-4 '}>
          <div className={'w-40 flex flex-col items-center bg-blue-100/30 px-4 py-2 rounded-md shadow-xl shadow-blue-800/20'}>
            <span className={'text-blue-300'}>Total projects  </span>
            <b className={'text-3xl text-blue-900 font-black'}>
              <CountUp end={12} duration={5} />
              </b>
          </div>
          <div className={'w-40 flex flex-col items-center bg-green-100/30 px-4 py-2 rounded-md shadow-xl shadow-blue-800/20'}>
            <span className={'text-green-300'}>Total plots sold</span>
            <b className={'text-3xl text-green-900 font-bold'}>
              <CountUp end={154} duration={5} />
              </b>
          </div>
          <div className={'w-40 flex flex-col items-center bg-orange-100/30 px-4 py-2 rounded-md shadow-xl shadow-blue-800/20'}>
            <span className={'text-orange-300'}>Total Sales</span>
            <b className={'text-3xl text-orange-900 font-bold'}>
              <CountUp end={15400}  suffix="/=" duration={5} />
              </b>
          </div>
          <div className={'w-40 flex flex-col items-center bg-purple-100/30 px-4 py-2 rounded-md shadow-xl shadow-blue-800/20'}>
            <span className={'text-purple-300'}>New customers</span>
            <b className={'text-3xl text-purple-900 font-bold'}>
              <CountUp end={400}   duration={5} />
              </b>
          </div>
        </div>

      </main>
  );
}
