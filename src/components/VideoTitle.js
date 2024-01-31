import React from 'react'

const VideoTitle = ({title, overview}) => {
  return (
    <div className='absolute pt-[30%] sm:pt-[20%] pl-[5%] text-white bg-gradient-to-r from-black w-screen aspect-video'>
        <h1 className='text-xl md:text-3xl font-bold'>{title}</h1>
        <p className='py-4 w-1/3 text-lg hidden md:inline-block md:h-24 overflow-hidden'>{overview}</p>
        <div className='my-2'>
            <button className='bg-white text-black text-xl py-1 md:py-4 px-4 md:px-12 mr-2 rounded-lg hover:bg-opacity-70'>▶️ Play</button>
            <button className='bg-white text-black text-xl py-4 px-12 mr-2 rounded-lg hover:bg-opacity-70 hidden md:inline-block'>ℹ️ More Info</button>
        </div>
    </div>
  )
}

export default VideoTitle