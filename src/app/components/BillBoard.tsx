"use client"
import React from 'react'

function BillBoard() {
    return (
        <div>
            <div className='relative h-[55vh] w-full'>
                <video src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" autoPlay muted className='h-[55vh] object-cover w-full opacity-40 '></video>
            </div>
            <div className='absolute top-[20%] left-[5%] text-white flex gap-2 flex-col max-w-[25rem] sm:max-w-[30rem] lg:max-w-[35rem] md:top-[20%] md:left-[10%] lg:left-[5%] '>
                <h1 className='text-2xl drop-shadow-lg sm:text-3xl md:text-4xl opacity-80 font-semibold'>Big Buck Bunny</h1>
                <p className='max-w-[20rem] text-sm sm:text-md md:text-lg opacity-80'>
                    Three rodents amuse themselves by harassing creatures of the forest. However, when they mess with a bunny, he decides to teach them a lesson.
                </p>
                <button className='w-[6rem] h-8 rounded-lg bg-white text-black text-md hover:bg-slate-200' onClick={() => {console.log("clicked")}} >Play</button>
            </div>
        </div>
    )
}

export default BillBoard