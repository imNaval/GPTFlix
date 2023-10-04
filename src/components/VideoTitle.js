import React from 'react'

const VideoTitle = ({title, overview}) => {
  return (
    <div className='absolute pt-[20%] pl-[5%] text-white bg-gradient-to-r from-gray-500 w-screen aspect-video'>
        <h1 className='text-3xl'>{title}</h1>
        <p className='py-4 w-1/3 text-lg'>{overview}</p>
        <div>
            <button className='bg-white text-black text-xl py-4 px-12 mr-2 rounded-lg hover:bg-opacity-70'>▶️ Play</button>
            <button className='bg-white text-black text-xl py-4 px-12 mr-2 rounded-lg hover:bg-opacity-70'>ℹ️ More Info</button>
        </div>
    </div>
  )
}

export default VideoTitle