import { useDispatch, useSelector } from 'react-redux'
import { addPopularMovies } from '../utils/moviesSlice'
import { useEffect } from 'react'
import { getPopularMovies as getPopularMoviesFromProxy } from '../utils/proxyApi'

const usePopularMovies = () =>{
    const dispatch = useDispatch()
    const popularMovies = useSelector(store=> store.movies.popularMovies)

    const getPopularMovies = async () =>{
      try {
        const json = await getPopularMoviesFromProxy()
        dispatch(addPopularMovies(json.results))
      } catch (error) {
        console.error('Error fetching popular movies:', error)
      }
    }
    useEffect(()=>{
      !popularMovies && getPopularMovies()
    }, [])
}

export default usePopularMovies