import React from 'react'

const VideoTitle = ({title, overview}) => {
  return (
    <div className='pt-40 pl-12'>
        <h1 className='text-3xl'>{title}</h1>
        <p className='py-4 w-1/3 text-lg'>{overview}</p>
        <div>
            <button className='bg-gray-500 text-white text-xl py-4 px-12 mr-2 bg-opacity-50 rounded-lg'>▶️ Play</button>
            <button className='bg-gray-500 text-white text-xl py-4 px-12 ml-2 bg-opacity-50 rounded-lg'>More Info</button>
        </div>
    </div>
  )
}

export default VideoTitle