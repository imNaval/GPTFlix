import React from 'react'
import VideoBackground from './VideoBackground'
import VideoTitle from './VideoTitle'
import { useSelector } from 'react-redux'

const MainContainer = () => {

    const movies = useSelector(store => store.movies?.nowPlayingMovies)

    //early return
    if(!movies) return;

    const mainMovie = movies[0]
    // console.log(mainMovie)
    const {original_title, overview, id} = mainMovie

  return (
    <div>
        <VideoBackground movieId={id} />
        <VideoTitle title={original_title} overview={overview} />
    </div>
  )
}

export default MainContainer