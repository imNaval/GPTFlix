import React, { useEffect, useState } from 'react'
import { TMDB_API_OPTIONS } from '../utils/constant'
import { useDispatch, useSelector } from 'react-redux'
import { addTrailerVideo } from '../utils/moviesSlice'

const VideoBackground = ({movieId}) => {

  const trailerVideo = useSelector(store => store.movies?.trailerVideo)

  // const [trailerId, setTrailerId] = useState(null);
  const dispatch = useDispatch()

  const getMovieVideos = async() =>{
    const data = await fetch('https://api.themoviedb.org/3/movie/'+ movieId +'/videos?language=en-US', TMDB_API_OPTIONS)
    const json = await data.json()
    // console.log(json)

    const filterData = json.results.filter(video=> video.type === "Trailer")
    const trailer = filterData.length ? filterData[0] : json.results[0];
    console.log(trailer)

    // setTrailerId(trailer.key)
    dispatch(addTrailerVideo(trailer))
  }

  useEffect(()=>{
    getMovieVideos()
  }, [])
  return (
    <div>
      <iframe
       width="560"
        height="315"
         src={"https://www.youtube.com/embed/"+ trailerVideo?.key +"?si=05RGkzBUTwjLrmWU"}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
      ></iframe>
    </div>
  )
}

export default VideoBackground