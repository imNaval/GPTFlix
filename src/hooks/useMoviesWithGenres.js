//`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`
import { useDispatch } from "react-redux"
import { addMovieDetails, addMoviesWithGenres } from "../utils/moviesSlice"
import { useEffect } from "react"
import { TMDB_API_OPTIONS } from "../utils/constant"

const useMoviesWithGenres = ({genres}) => {
    const dispatch = useDispatch()

    const getMovies = async(genre) =>{
      const url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=true&language=en-US&page=1&sort_by=popularity.desc&&with_genres=` + genre
      const data = await fetch(url, TMDB_API_OPTIONS)
      const json = await data.json()
    //   console.log(json)
      return json;
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