import React, { useState } from 'react'
import { IMG_CDN_URL } from '../utils/constant'

const MovieCard = ({ movie }) => {
  const { poster_path: posterPath, title, overview } = movie;

  const [hovered, setHovered] = useState(false);

  if (!posterPath) return null;
  return (
    <div className='w-36 md:w-48 pr-4 rounded-lg'>
      <img
        className='rounded-lg'
        alt='movie-poster'
        src={IMG_CDN_URL + posterPath}
      />

        {hovered && <MovieCardOverlay title={title} overview={overview} posterPath={posterPath} />}
    </div>
  )
}

const MovieCardOverlay = ({ title, overview, posterPath }) => {
  return (
    <div className='absolute bottom-0 left-0 right-0'>
      <div className='relative'>
        <img
          className=''
          alt='movie-poster'
          src={IMG_CDN_URL + posterPath}
        />
        <h2 className='absolute bottom-10 left-0 text-white text-lg font-bold'>{title}</h2>
        <p className='absolute bottom-0 left-0 text-white text-sm'>{overview}</p>
      </div>
    </div>
  )
}

export default MovieCard
