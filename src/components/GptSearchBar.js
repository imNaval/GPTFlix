import React, { useEffect, useRef, useState } from 'react'
import lang from '../utils/languageConstants'
import { useDispatch, useSelector } from 'react-redux'
import openai, { fetchGptResponse } from '../utils/openai'
import { TMDB_API_OPTIONS } from '../utils/constant'
import { addGptMovieResults } from '../utils/gptSlice'
import { checkRateLimits, incrementRateLimits } from '../utils/rateLimiter'
import { auth } from '../utils/firebase'
import { FaSearch } from 'react-icons/fa'

const GptSearchBar = ({ onSearchComplete }) => {
  const [searching, setSearching] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const dispatch = useDispatch();
  const searchText = useRef(null)
  const langKey = useSelector(store => store.config.lang)
  const user = useSelector(store => store.user)

  const TmdbMovieSearch = async(movie) =>{
    const data = await fetch('https://api.themoviedb.org/3/search/movie?query=' + movie + '&include_adult=false&language=en-US&page=1', TMDB_API_OPTIONS)

    const json = await data.json();

    return json.results;
  }

  const handleGptSearch = async() =>{
    if(searchText.current.value === '' || searching) return;
    
    // Clear any previous error messages
    setErrorMessage('');
    
    // Check if user is authenticated
    if (!user || !user.uid) {
      setErrorMessage('Please login to use GPT search.');
      return;
    }
    
    // Check rate limits before proceeding (without incrementing)
    const rateLimitCheck = await checkRateLimits(user.uid);
    if (!rateLimitCheck.allowed) {
      setErrorMessage(rateLimitCheck.message);
      return;
    }
    
    setSearching(true)
    // console.log(searching)
    dispatch(addGptMovieResults({movieNames: "Loading", movieResults: null}))

    try {
      const searchQuery = "Act as a Movie Recommendation system and suggest some movies for the query " 
        + searchText.current.value 
        + ". Only give me names of 5 movies, comma separated like the example result given ahead. Example Results: Gadar, Golmal, Hera ferri, Bahubali, KGF"

      const gptResult = await openai.chat.completions.create({
        messages: [{ role: 'user', content: searchQuery }],
        model: 'gpt-3.5-turbo',
      });
      
      if(!gptResult.choices){
        //TODO: Error Handling
        console.error("unable to load data")
        setErrorMessage('Unable to get movie recommendations. Please try again.');
        setSearching(false);
        return;
      }

      const gptMoviesList = gptResult.choices[0]?.message?.content.split(",") //if gpt not work set some default value
      //for each movie find on tmdb
      const promises = gptMoviesList.map(movie => TmdbMovieSearch(movie))

      const data =  await Promise.all(promises)
      
      // Only increment rate limits after successful API call
      await incrementRateLimits(user.uid);
      
      setSearching(false)
      dispatch(addGptMovieResults({movieNames: gptMoviesList, movieResults: data}))
      
      // Call the callback to refresh usage display
      if (onSearchComplete) {
        onSearchComplete();
      }
      
    } catch (error) {
      console.error('Error in GPT search:', error);
      setErrorMessage('An error occurred while searching. Please try again.');
      setSearching(false);
      dispatch(addGptMovieResults({movieNames: null, movieResults: null}));
    }
  }

  return (
    <div className='w-full'>
        <form className='w-full bg-black bg-opacity-80 rounded-lg grid grid-cols-12' onSubmit={(e) => e.preventDefault()}>
            <input
                className='p-4 m-4 rounded-lg col-span-10'
                type='text'
                placeholder={lang[langKey].gptSearchPlaceHolder}
                ref={searchText}
            />
            <button className={`col-span-2 m-4 ml-1 py-1 px-2 sm:py-2 sm:px-6 bg-red-700 text-white rounded-lg ${searching ?  'cursor-not-allowed' : 'cursor-pointer' }`}
              onClick={handleGptSearch}
              disabled={searching}
            >
            {/* {lang[langKey].search} */}
            <FaSearch className='text-2xl' />
            </button>
        </form>
        {errorMessage && (
          <div className='w-full mt-4 p-4 bg-red-600 text-white rounded-lg text-center'>
            {errorMessage}
          </div>
        )}
    </div>
  )
}

export default GptSearchBar