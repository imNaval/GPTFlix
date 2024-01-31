import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import useMovieDetail from '../hooks/useMovieDetail'
import { IMG_CDN_URL_ORIGINAL, IMG_CDN_URL } from '../utils/constant'
import useRelatedMovies from '../hooks/useRelatedMovies'

const MovieDetail = () => {
    const MovieDetail = useSelector(store => store.movies?.movieDetails)
    const params = useParams()
    const movieId = params.id
    useMovieDetail({ movieId })
    useRelatedMovies({movieId})

    // console.log(MovieDetail)
    //backdrop_path     poster_path
    return (
        MovieDetail && 
        <div>
            <div className='bg-black bg-opacity-70 w-full h-screen'>
                <div className='w-full h-screen overflow-hidden absolute -z-10 flex'>
                    <img className='w-full object-cover' src={IMG_CDN_URL_ORIGINAL + MovieDetail?.poster_path} alt='' />
                </div>
                <div className='p-40 pl-8 pr-16 sm:pr-32 md:pr-72 lg:pr-96 text-white flex-1 mr-auto'>
                    <h1 className='font-black text-7xl'>{MovieDetail?.original_title}</h1>
                    <p className='text-center'>{MovieDetail?.tagline}</p>
                    <hr className='w-72 md:w-96' />

                    <div className='my-8'>
                        <div className='text-sm font-bold my-2 flex'> 
                            <span>{MovieDetail?.status} : {MovieDetail?.release_date}</span>
                            <span className='mx-2'>|</span>
                            {/* <span>{MovieDetail?.original_language}</span> */}
                            <span>{MovieDetail?.spoken_languages[0]?.english_name}</span>
                        </div>
                        <div>Category  : <span>
                            {MovieDetail?.genres?.map((genre, idx) => <span className='mx-1' key={genre.id}>{idx === 0 ? `  ${genre.name}` : `|   ${genre.name}` }</span>)}
                        </span></div>
                        <div>Popularity  : {MovieDetail?.popularity}</div>
                        <div>
                            <span>Rating : {MovieDetail?.vote_average}  </span>
                            <span className='mx-2'>|</span>
                            <span>TotalRating : {MovieDetail?.vote_count}</span>
                        </div>
                    </div>

                    <p>{MovieDetail?.overview}</p>
                    <button className='py-3 px-8 mt-8 font-bold bg-red-600 shadow-2xl rounded-lg'>Start Watching</button>
                </div>
            </div>

            <div>
                <h2>Similar Movies</h2>
            </div>
        </div>
    )
}

export default MovieDetail