import { useDispatch } from "react-redux"
import { addMovieDetails } from "../utils/moviesSlice"
import { useEffect } from "react"
import { getMovieDetails as getMovieDetailsFromProxy } from "../utils/proxyApi"

const useMovieDetail = ({movieId}) => {
    const dispatch = useDispatch()

    const getMovieDetails = async() =>{
      try {
        const json = await getMovieDetailsFromProxy(movieId)
        dispatch(addMovieDetails(json))
      } catch (error) {
        console.error('Error fetching movie details:', error)
      }
    }

    useEffect(()=>{
      getMovieDetails()
    }, [movieId])
}

export default useMovieDetail