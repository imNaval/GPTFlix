import React from 'react'
import VideoBackground from './VideoBackground'
import VideoTitle from './VideoTitle'
import { useSelector } from 'react-redux'

const MainContainer = () => {

    const movies = useSelector(store => store.movies?.nowPlayingMovies)

    //early return
    if(!movies) return;

    let x = Math.floor(Math.random() * movies.length);
    const mainMovie = movies[x]
    // console.log(mainMovie)
    const {original_title, overview, id, genre_ids} = mainMovie

  return (
    <div className='pt-[30%] bg-black md:pt-0'>
        <VideoTitle title={original_title} overview={overview} movieId={id} genresIds={genre_ids}/>
        <VideoBackground movieId={id} />
    </div>
  )
}

export default MainContainer