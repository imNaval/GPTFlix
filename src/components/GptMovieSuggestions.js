import React from 'react'
import { useSelector } from 'react-redux'
import MovieList from './MovieList';
import { GptMovieShimmer } from './Shimmer';

const GptMovieSuggestions = () => {
  const {gptMovieNames, tmdbMovieResults} = useSelector(store => store.gpt)

  if(!gptMovieNames) return null;

  if(gptMovieNames === "Loading") return <GptMovieShimmer />

  return (
    <div className='p-4 m-4 bg-black bg-opacity-80 text-white'>
      <div>
        {
          gptMovieNames.map((movieName, idx) => (
            <MovieList
             key={movieName}
             title={movieName}
             movies={tmdbMovieResults[idx]}
            />
          ))
        }
      </div>
    </div>
  )
}

export default GptMovieSuggestions
