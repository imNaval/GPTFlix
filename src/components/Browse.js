import React from 'react'
import Header from './Header'
import useNowPlayingMovies from '../hooks/useNowPlayingMovies'
import MainContainer from './MainContainer'
import SecondaryContainer from './SecondaryContainer'
import usePopularMovies from '../hooks/usePopularMovies'
import useTradingMovies from '../hooks/useTradingMovies'
import useUpcomingMovies from '../hooks/useUpcomingMovies'
import { useSelector } from 'react-redux'
import GptPage from './GptPage'

const Browse = () => {

  const showGptSearch = useSelector(store => store.gpt.showGptSearch)

  useNowPlayingMovies()
  usePopularMovies();
  useTradingMovies()
  useUpcomingMovies()


  return (
    <div>
      <Header />

      {
        showGptSearch ? <GptPage /> : <>
          <MainContainer />
          <SecondaryContainer />
        </>
      }
    </div>
  )
}

export default Browse