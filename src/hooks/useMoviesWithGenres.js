//`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`
import { useDispatch } from "react-redux"
import { addMovieDetails, addMoviesWithGenres } from "../utils/moviesSlice"
import { useEffect } from "react"
import { discoverMovies } from "../utils/proxyApi"

const useMoviesWithGenres = ({genres}) => {
    const dispatch = useDispatch()

    const getMovies = async(genre) =>{
      try {
        const json = await discoverMovies(genre)
        //   console.log(json)
        return json;
      } catch (error) {
        console.error('Error fetching movies by genre:', error)
        return { results: [] }
      }
    }

    function getMoviesByGenre(){
        const promises = genres.map(genre => getMovies(genre))
        Promise.allSettled(promises)
            .then((res)=>{
                const moviesWithGenres = res.map((movie, idx) => ({[genres[idx]] : movie?.value?.results}))
                // console.log(moviesWithGenres)
                dispatch(addMoviesWithGenres(moviesWithGenres))
            })
            .catch((err)=> console.error(err))
    }

    useEffect(()=>{
        getMoviesByGenre()
    // const res = genres.map(genre => getMovieDetails(genre))
    }, [genres])
}

export default useMoviesWithGenres