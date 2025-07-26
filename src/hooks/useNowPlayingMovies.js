import { useDispatch, useSelector } from 'react-redux'
import { addNowPlayingMovies } from '../utils/moviesSlice'
import { useEffect } from 'react'
import { getNowPlayingMovies as getNowPlayingMoviesFromProxy } from '../utils/proxyApi'

const useNowPlayingMovies = () =>{
    const dispatch = useDispatch()

    const nowPlayingMovies = useSelector(store=> store.movies.nowPlayingMovies)

    const getNowPlayingMovies = async () =>{
      try {
        const json = await getNowPlayingMoviesFromProxy()
        dispatch(addNowPlayingMovies(json.results))
      } catch (error) {
        console.error('Error fetching now playing movies:', error)
      }
    }
    useEffect(()=>{
      !nowPlayingMovies && getNowPlayingMovies()
    }, [])
}

export default useNowPlayingMovies