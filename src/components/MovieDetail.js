import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import useMovieDetail from '../hooks/useMovieDetail'
import { IMG_CDN_URL_ORIGINAL } from '../utils/constant'
import useRelatedMovies from '../hooks/useRelatedMovies'
import MovieList from './MovieList'
import GPTFLIX from "../utils/images/GPTFLIX.png"
import useMoviesWithGenres from '../hooks/useMoviesWithGenres'

const MovieDetail = () => {
    const MovieDetail = useSelector(store => store.movies?.movieDetails)
    const relatedMovies = useSelector(store => store?.movies?.relatedMovies)
    // const recommendationMovies = useSelector(store => store?.movies?.recommendationMovies)
    const genresMovies = useSelector(store=> store?.movies?.genresMovies)

    const params = useParams()
    const navigate = useNavigate();
    const movieId = params.id
    useMovieDetail({ movieId })
    useRelatedMovies({movieId})
    const location = useLocation();
    const genres = location.state.genres
    useMoviesWithGenres({genres})

    // genresMovies && genresMovies.map((movies, idx) => console.log(movies[String(genres[idx])]))  //movies["28"]  //`title=${genres[idx]} movies=${movies[genres[idx]]}`

    useEffect(()=>{
        window.scrollTo(0,0)
    })

    return (
        MovieDetail && 
        <div>
            <div className='absolute px-8 py-3 bg-gradient-to-b from-black z-50 w-full flex justify-between flex-col md:flex-row -top-20 md:-top-16'>
                <img className='w-48 mx-auto md:mx-0' src={GPTFLIX} alt='netflixLogo' onClick={() => navigate("/")} />
            </div>

            <div className='bg-black bg-opacity-70 w-full !h-screen'>
                <div className='w-full h-screen absolute -z-10 flex'>
                    <img className='w-full  object-cover' src={IMG_CDN_URL_ORIGINAL + MovieDetail?.poster_path} alt='' />
                </div>

                <div className='pt-16 sm:pt-24 lg:pt-40 pl-8 pr-8 sm:pr-24 md:pr-72 lg:pr-96 text-white flex-1 mr-auto'>
                    <h1 className='font-black text-2xl sm:text-4xl md:text-6xl'>{MovieDetail?.original_title}</h1>
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

                    <p className='max-h-40 overflow-hidden'>{MovieDetail?.overview}</p>
                    <button className='py-3 px-8 mt-8 font-bold bg-red-600 shadow-2xl rounded-lg' onClick={()=> navigate("/watch/"+movieId)}>Start Watching</button>
                </div>
            </div>

            {
            relatedMovies &&
            <div className='bg-black'>
                <div className='relative z-20'>
                    <MovieList title={"Related"} movies={relatedMovies} />
                </div>
            </div>
            }

            {
                genresMovies&&
                <div className='relative z-20 bg-black'>
                    {
                        genresMovies?.map((movies, idx) => <MovieList key={genres[idx]} title={MovieDetail?.genres[idx]?.name} movies={movies[String(genres[idx])]} />)
                    }
                </div>
            }

        </div>
    )
}

export default MovieDetail