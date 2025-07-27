import React, { useEffect, useRef, useState } from 'react'
import lang from '../utils/languageConstants'
import { useDispatch, useSelector } from 'react-redux'
import openai, { fetchGptResponse } from '../utils/openai'
import { addGptMovieResults } from '../utils/gptSlice'
import { checkRateLimits, incrementRateLimits } from '../utils/rateLimiter'
import { auth } from '../utils/firebase'
import { FaSearch, FaTimes } from 'react-icons/fa'
import { searchMovies } from '../utils/proxyApi'
import cacheManager from '../utils/cacheManager'

const GptSearchBar = ({ onSearchComplete }) => {
  const [searching, setSearching] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [showNotification, setShowNotification] = useState(false)
  const [currentPlaceholderIndex, setCurrentPlaceholderIndex] = useState(0)

  const dispatch = useDispatch();
  const searchText = useRef(null)
  const langKey = useSelector(store => store.config.lang)
  const user = useSelector(store => store.user)

  // Dynamic placeholders that change every 3 seconds
  const dynamicPlaceholders = [
    "What's your mood today? 🎭",
    "Enter movie name, actor, or genre 🎬",
    "Feeling happy? Sad? Romantic? Tell us! 💕",
    "Search by actor, director, or movie type 🎥",
    "What kind of story are you looking for? 📖"
  ]

  // Change placeholder every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPlaceholderIndex((prevIndex) => 
        (prevIndex + 1) % dynamicPlaceholders.length
      )
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  // Show notification with smooth animation
  const showErrorNotification = (message) => {
    setErrorMessage(message)
    // Small delay to ensure smooth slide-in animation
    setTimeout(() => {
      setShowNotification(true)
    }, 100)
    
    // Auto-hide after 10 seconds
    setTimeout(() => {
      setShowNotification(false)
      setTimeout(() => setErrorMessage(''), 300) // Clear message after animation
    }, 10000)
  }

  // Manual close notification
  const closeNotification = () => {
    setShowNotification(false)
    setTimeout(() => setErrorMessage(''), 300)
  }

  const TmdbMovieSearch = async(movie) =>{
    try {
      // Check cache first
      const cachedResults = cacheManager.getCachedMovieSearch(movie);
      if (cachedResults) {
        return cachedResults;
      }

      // If not in cache, fetch from API
      const json = await searchMovies(movie)
      const results = json.results;
      
      // Cache the results
      cacheManager.cacheMovieSearch(movie, results);
      
      return results;
    } catch (error) {
      console.error('Error searching movies:', error)
      return [];
    }
  }

  const handleGptSearch = async() =>{
    if(searchText.current.value === '' || searching) return;
    
    // Clear any previous error messages
    setErrorMessage('');
    setShowNotification(false);
    
    // Check if user is authenticated
    if (!user || !user.uid) {
      showErrorNotification('Please login to use GPT search.');
      return;
    }
    
    // Check rate limits before proceeding (without incrementing)
    const rateLimitCheck = await checkRateLimits(user.uid);
    if (!rateLimitCheck.allowed) {
      showErrorNotification(rateLimitCheck.message);
      return;
    }
    
    setSearching(true)
    dispatch(addGptMovieResults({movieNames: "Loading", movieResults: null}))

    try {
      const userQuery = searchText.current.value.trim();
      
      // Check if we have cached GPT response
      const cachedGptResponse = cacheManager.getCachedGptResponse(userQuery);
      let gptMoviesList;
      let usedCache = false;
      
      if (cachedGptResponse) {
        gptMoviesList = cachedGptResponse;
        usedCache = true;
      } else {
        const searchQuery = `Act as an intelligent Movie Recommendation system. Analyze the user's query: "${userQuery}"

Consider the following aspects when suggesting movies:
1. **Mood/Emotion**: If they mention feeling happy, sad, romantic, excited, relaxed, etc.
2. **Movie Names**: If they mention specific movies they like
3. **Actors/Actresses**: If they mention favorite actors or actresses
4. **Genres**: If they mention action, comedy, drama, thriller, horror, romance, sci-fi, etc.
5. **Movie Types**: If they mention animated, documentary, foreign, indie, blockbuster, etc.
6. **Themes**: If they mention adventure, mystery, family, war, sports, etc.

IMPORTANT: You must respond with EXACTLY 7 movie names, no more, no less.
FORMAT: Provide ONLY the movie names separated by commas, with no extra text, explanations, or line breaks.

Example response format:
Inception, The Dark Knight, Interstellar, Blade Runner 2049, Arrival, Ex Machina, Her

Do not include any other text, just the 7 movie names with commas between them.`

        const gptResult = await openai.chat.completions.create({
          messages: [{ role: 'user', content: searchQuery }],
          model: 'gpt-3.5-turbo',
        });
        
        if(!gptResult.choices){
          console.error("unable to load data")
          showErrorNotification('Unable to get movie recommendations. Please try again.');
          setSearching(false);
          return;
        }

        gptMoviesList = gptResult.choices[0]?.message?.content.split(",");
        
        // Cache the GPT response
        cacheManager.cacheGptResponse(userQuery, gptMoviesList);
      }

      // For each movie, find on TMDB (with individual movie caching)
      const promises = gptMoviesList.map(movie => TmdbMovieSearch(movie.trim()))
      const data = await Promise.all(promises)
      
      // Only increment rate limits if we made a new GPT API call
      if (!usedCache) {
        await incrementRateLimits(user.uid);
      }
      
      setSearching(false)
      dispatch(addGptMovieResults({movieNames: gptMoviesList, movieResults: data}))
      
      // Call the callback to refresh usage display
      if (onSearchComplete) {
        onSearchComplete();
      }
      
    } catch (error) {
      console.error('Error in GPT search:', error);
      showErrorNotification('An error occurred while searching. Please try again.');
      setSearching(false);
      dispatch(addGptMovieResults({movieNames: null, movieResults: null}));
    }
  }

  return (
    <div className='w-full relative'>
        <form className='w-full bg-primary-bg bg-opacity-80 rounded-lg grid grid-cols-12' onSubmit={(e) => e.preventDefault()}>
            <input
                className='p-4 m-4 rounded-lg col-span-10'
                type='text'
                placeholder={dynamicPlaceholders[currentPlaceholderIndex]}
                ref={searchText}
            />
            <button className={`col-span-2 m-4 ml-1 py-1 px-2 sm:py-2 sm:px-6 bg-red-700 text-white rounded-lg ${searching ?  'cursor-not-allowed' : 'cursor-pointer' }`}
              onClick={handleGptSearch}
              disabled={searching}
            >
            <FaSearch className='text-2xl' />
            </button>
        </form>
        

        
        {/* Smooth Notification */}
        {errorMessage && (
          <div className={`absolute top-4 -right-96 z-50 transition-all duration-500 ease-out ${
            showNotification 
              ? 'translate-x-0 opacity-100' 
              : 'translate-x-full opacity-0'
          }`}>
            <div className='bg-red-600 text-white rounded-lg shadow-lg p-4 max-w-sm border-l-4 border-red-800'>
              <div className='flex items-center justify-between'>
                <div className='flex-1 pr-4'>
                  <p className='text-sm font-medium'>{errorMessage}</p>
                </div>
                <button 
                  onClick={closeNotification}
                  className='text-white hover:text-gray-200 transition-colors'
                >
                  <FaTimes className='text-lg' />
                </button>
              </div>
            </div>
          </div>
        )}
    </div>
  )
}

export default GptSearchBar