import React, { useEffect } from 'react'
import Header from './Header'
import useNowPlayingMovies from '../hooks/useNowPlayingMovies'
import MainContainer from './MainContainer'
import SecondaryContainer from './SecondaryContainer'
import usePopularMovies from '../hooks/usePopularMovies'
import useTradingMovies from '../hooks/useTradingMovies'
import useUpcomingMovies from '../hooks/useUpcomingMovies'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../utils/firebase'
import GptPage from './GptPage'

const Browse = () => {
  const navigate = useNavigate();
  const showGptSearch = useSelector(store => store.gpt.showGptSearch)

  // Protect the browse page - redirect unverified users
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        // No user signed in, redirect to login
        navigate("/");
        return;
      }
      
      // Check if email is verified (only for email/password users, not Google users)
      if (user.providerData[0]?.providerId === 'password' && !user.emailVerified) {
        // User is signed in but email is not verified, redirect to login
        navigate("/");
        return;
      }
    });

    return () => unsubscribe();
  }, [navigate]);

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