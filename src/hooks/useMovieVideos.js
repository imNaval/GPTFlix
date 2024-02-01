import { useDispatch } from "react-redux"
import { addMovieVideos } from "../utils/moviesSlice"
import { useEffect } from "react"
import { TMDB_API_OPTIONS, YT_API_KEY } from "../utils/constant"

const useMovieVideos = ({movieId}) => {
    const dispatch = useDispatch()
    let vIds = null;

    const getMovieVideos = async() =>{
      const data = await fetch('https://api.themoviedb.org/3/movie/'+ movieId +'/videos?language=en-US', TMDB_API_OPTIONS)
      const json = await data.json()
      const videos = json.results
      // dispatch(addMovieVideos(videos))
      vIds = videos?.map(video => video.key)
      getVideoDetails()
    }

    const getVideoDetails = async() =>{
      const Ids = vIds.join(",")
      const url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet&id=${Ids}&key=${YT_API_KEY}`
      // const url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${Ids}&key=${YT_API_KEY}`
      const data = await fetch(url)
      const json = await data.json()
      dispatch(addMovieVideos(json?.items))
    }

    useEffect(()=>{
      getMovieVideos()
    }, [])
}

export default useMovieVideos