//upcoming

import { useDispatch, useSelector } from 'react-redux'
import { addUpcomingMovies } from '../utils/moviesSlice'
import { useEffect } from 'react'
import { getUpcomingMovies as getUpcomingMoviesFromProxy } from '../utils/proxyApi'

const useUpcomingMovies = () =>{
    const dispatch = useDispatch()
    const upcomingMovies = useSelector(store=> store.movies.upcomingMovies)

    const getUpcomingMovies = async () =>{
      try {
        const json = await getUpcomingMoviesFromProxy()
        dispatch(addUpcomingMovies(json.results))
      } catch (error) {
        console.error('Error fetching upcoming movies:', error)
      }
    }
    useEffect(()=>{
        !upcomingMovies && getUpcomingMovies()
    }, [])
}

export default useUpcomingMovies