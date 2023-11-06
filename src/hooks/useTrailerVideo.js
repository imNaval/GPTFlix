import { useDispatch, useSelector } from "react-redux"
import { addTrailerVideo } from "../utils/moviesSlice"
import { useEffect } from "react"
import { TMDB_API_OPTIONS } from "../utils/constant"

const useTrailerVideo = ({movieId}) => {
    const dispatch = useDispatch()
    //const trailerVideo = useSelector(store=> store.movies.trailerVideo)

    const getMovieVideos = async() =>{
      const data = await fetch('https://api.themoviedb.org/3/movie/'+ movieId +'/videos?language=en-US', TMDB_API_OPTIONS)
      const json = await data.json()
      // console.log(json)

      const filterData = json.results.filter(video=> video.type === "Trailer")
      const trailer = filterData.length ? filterData[0] : json.results[0];
      // console.log(trailer)

      dispatch(addTrailerVideo(trailer))
    }

    useEffect(()=>{
      getMovieVideos()
    }, [])
}

export default useTrailerVideo