'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import MeetingTypeList from '@/components/MeetingTypeList';

const Home = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // Update time every second
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Clean up interval on component unmount
    return () => clearInterval(timer);
  }, []);

  // Format time (e.g., 11:30 AM)
  const formattedTime = currentTime.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });

  // Format date (e.g., Wed, May 21, 2024)
  const formattedDate = currentTime.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <section className='flex size-full flex-col gap-10 text-white'>
      <div className="h-[300px] w-full rounded-[20px] relative overflow-hidden">
        <Image
          src="/images/hero-background.png"
          alt="Hero Background"
          fill
          className="object-cover"
          priority
        />
        <div className='absolute inset-0 flex flex-col justify-between p-4 lg:p-11 z-10'>
          <h2 className='glassmorphism max-w-[270px] rounded py-2 text-center text-base font-normal'>
            Upcoming Meeting At: {formattedTime}
          </h2>
          <div className='flex flex-col gap-2'>
            <h1 className='text-4xl font-extrabold lg:text-7xl'>
              {formattedTime}
            </h1>
            <p className='text-lg font-medium text-sky-600 lg:text-2xl'>
              {formattedDate}
            </p>
          </div>
        </div>
      </div>
      <MeetingTypeList/>
    </section>
  );
};

export default Home;