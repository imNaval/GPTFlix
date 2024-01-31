import { useDispatch } from "react-redux"
import { addMovieVideos } from "../utils/moviesSlice"
import { useEffect } from "react"
import { TMDB_API_OPTIONS } from "../utils/constant"

const useMovieVideos = ({movieId}) => {
    const dispatch = useDispatch()

    const getMovieVideos = async() =>{
      const data = await fetch('https://api.themoviedb.org/3/movie/'+ movieId +'/videos?language=en-US', TMDB_API_OPTIONS)
      const json = await data.json()
      console.log(json)

      const videos = json.results
      dispatch(addMovieVideos(videos))
    }

    useEffect(()=>{
      getMovieVideos()
    }, [])
}

export default useMovieVideos