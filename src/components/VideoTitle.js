import React from 'react'
// import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const VideoTitle = ({title, overview, movieId, genresIds}) => {
  // const trailerVideo = useSelector(store => store.movies?.trailerVideo)
  const navigate = useNavigate()
  return (
    <div className='absolute pt-[30%] sm:pt-[20%] pl-[5%] text-white bg-gradient-to-r from-black w-screen aspect-video'>
        <h1 className='text-xl md:text-3xl font-bold'>{title}</h1>
        <p className='py-4 w-1/3 text-lg hidden md:inline-block md:h-24 overflow-hidden'>{overview}</p>
        <div className='my-2'>
            <button className='bg-white text-black text-xl py-1 md:py-4 px-4 md:px-12 mr-2 rounded-lg hover:bg-opacity-70' onClick={()=> navigate(`/watch/${movieId}`)}>▶️ Play</button>
            <button className='bg-white text-black text-xl py-4 px-12 mr-2 rounded-lg hover:bg-opacity-70 hidden md:inline-block' onClick={()=> navigate(`/detail/${movieId}`, {state:{genres:genresIds}} )}>ℹ️ More Info</button>
        </div>
    </div>
  )
}

export default VideoTitle