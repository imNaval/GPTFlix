import { TMDB_API_OPTIONS } from '../utils/constant'
import { useDispatch, useSelector } from 'react-redux'
import { addTradingMovies } from '../utils/moviesSlice'
import { useEffect } from 'react'

const useTradingMovies = () =>{
    const dispatch = useDispatch()
    const tradingMovies = useSelector(store=> store.movies.tradingMovies)

    const getTradingMovies = async () =>{
      const data = await fetch("https://api.themoviedb.org/3/movie/top_rated?page=1", TMDB_API_OPTIONS)
      const json = await data.json()
  
      // console.log(json.results)
      dispatch(addTradingMovies(json.results))
    }
    useEffect(()=>{
        !tradingMovies && getTradingMovies()
    }, [])
}

export default useTradingMovies