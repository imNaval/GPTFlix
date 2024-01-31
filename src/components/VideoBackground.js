import React from 'react'
import { useSelector } from 'react-redux'
import useTrailerVideo from '../hooks/useTrailerVideo'

const VideoBackground = ({movieId}) => {

  const trailerVideo = useSelector(store => store.movies?.trailerVideo)

  useTrailerVideo({movieId})

  return (
    <div className='overflow-x-hidden'>
      {/* <iframe
        className='w-screen aspect-video'
         src={"https://www.youtube.com/embed/"+ trailerVideo?.key +"?si=05RGkzBUTwjLrmWU&autoplay=1&mute=1&loop=1&controls=0&rel=0&showinfo=0"}
          title="YouTube video player"
          // allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
      ></iframe> */}

      <iframe
        className='w-screen aspect-video'
        src={`https://www.youtube.com/embed/${trailerVideo?.key}?si=05RGkzBUTwjLrmWU&autoplay=1&mute=1&loop=1&controls=0&rel=0&showinfo=0&modestbranding=1`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      ></iframe>

    </div>
  )
}

export default VideoBackground