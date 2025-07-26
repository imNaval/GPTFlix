import { useDispatch, useSelector } from "react-redux"
import { addTrailerVideo } from "../utils/moviesSlice"
import { useEffect } from "react"
import { getMovieVideos as getMovieVideosFromProxy } from "../utils/proxyApi"

const useTrailerVideo = ({movieId}) => {
    const dispatch = useDispatch()
    //const trailerVideo = useSelector(store=> store.movies.trailerVideo)

    const getMovieVideos = async() =>{
      try {
        const json = await getMovieVideosFromProxy(movieId)
        // console.log(json)

        const filterData = json.results.filter(video=> video.type === "Trailer")
        const trailer = filterData.length ? filterData[0] : json.results[0];
        // console.log(trailer)

        dispatch(addTrailerVideo(trailer))
      } catch (error) {
        console.error('Error fetching trailer video:', error)
      }
    }

    useEffect(()=>{
      getMovieVideos()
    }, [])
}

export default useTrailerVideo