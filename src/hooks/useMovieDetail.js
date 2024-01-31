import { useDispatch } from "react-redux"
import { addMovieDetails } from "../utils/moviesSlice"
import { useEffect } from "react"
import { TMDB_API_OPTIONS } from "../utils/constant"

const useMovieDetail = ({movieId}) => {
    const dispatch = useDispatch()

    const getMovieDetails = async() =>{
      const url = 'https://api.themoviedb.org/3/movie/'+ movieId +'?language=en-US' //'https://api.themoviedb.org/3/movie/movie_id?language=en-US'
      const data = await fetch(url, TMDB_API_OPTIONS)
      const json = await data.json()

      dispatch(addMovieDetails(json))
    }

    useEffect(()=>{
      getMovieDetails()
    }, [])
}

export default useMovieDetail