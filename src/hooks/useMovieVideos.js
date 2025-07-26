import { useDispatch } from "react-redux"
import { addMovieVideos } from "../utils/moviesSlice"
import { useEffect } from "react"
import { getMovieVideos as getMovieVideosFromProxy } from "../utils/proxyApi"
import { YT_API_KEY } from "../utils/constant"

const useMovieVideos = ({movieId}) => {
    const dispatch = useDispatch()
    let vIds = null;

    const getMovieVideos = async() =>{
      try {
        const json = await getMovieVideosFromProxy(movieId)
        const videos = json.results
        // dispatch(addMovieVideos(videos))
        vIds = videos?.map(video => video.key)
        getVideoDetails()
      } catch (error) {
        console.error('Error fetching movie videos:', error)
      }
    }

    const getVideoDetails = async() =>{
      try {
        const Ids = vIds.join(",")
        const url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet&id=${Ids}&key=${YT_API_KEY}`
        // const url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${Ids}&key=${YT_API_KEY}`
        const data = await fetch(url)
        const json = await data.json()
        dispatch(addMovieVideos(json?.items))
      } catch (error) {
        console.error('Error fetching video details:', error)
      }
    }

    useEffect(()=>{
      getMovieVideos()
    }, [])
}

export default useMovieVideos