import React from 'react'
import MovieCard from './MovieCard'
import { Link } from 'react-router-dom'

const MovieList = ({ title, movies }) => {
    // console.log(movies)
    return (
        <div className='px-6'>
            <h1 className='text-lg md:text-3xl py-2 text-white'>{title}</h1>
            <div className='flex overflow-x-scroll no-scrollbar'>
                <div className='flex'>
                    {/* {
                        movies?.map(movie => <MovieCard key={movie.id} posterPath={movie.poster_path} />)
                    } */}
                    {
                        movies?.map(movie => <Link to={`/detail/${movie.id}`} key={movie.id} state={{genres:movie?.genre_ids}}> <MovieCard posterPath={movie.poster_path} /> </Link>)
                    }
                </div>
            </div>
        </div>
    )
}

export default MovieList
