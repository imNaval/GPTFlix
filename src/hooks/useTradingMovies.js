import { useDispatch, useSelector } from 'react-redux'
import { addTradingMovies } from '../utils/moviesSlice'
import { useEffect } from 'react'
import { getTopRatedMovies } from '../utils/proxyApi'

const useTradingMovies = () =>{
    const dispatch = useDispatch()
    const tradingMovies = useSelector(store=> store.movies.tradingMovies)

    const getTradingMovies = async () =>{
      try {
        const json = await getTopRatedMovies()
        dispatch(addTradingMovies(json.results))
      } catch (error) {
        console.error('Error fetching top rated movies:', error)
      }
    }
    useEffect(()=>{
        !tradingMovies && getTradingMovies()
    }, [])
}

export default useTradingMovies