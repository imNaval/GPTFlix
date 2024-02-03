import React, { useEffect, useRef, useState } from 'react'
import lang from '../utils/languageConstants'
import { useDispatch, useSelector } from 'react-redux'
import openai, { fetchGptResponse } from '../utils/openai'
import { TMDB_API_OPTIONS } from '../utils/constant'
import { addGptMovieResults } from '../utils/gptSlice'

const GptSearchBar = () => {
  const [searching, setSearching] = useState(false)
  const dispatch = useDispatch();
  const searchText = useRef(null)
  const langKey = useSelector(store => store.config.lang)

  const TmdbMovieSearch = async(movie) =>{
    const data = await fetch('https://api.themoviedb.org/3/search/movie?query=' + movie + '&include_adult=false&language=en-US&page=1', TMDB_API_OPTIONS)

    const json = await data.json();

    return json.results;
  }

  const handleGptSearch = async() =>{
    if(searchText.current.value === '' || searching) return;
    setSearching(true)

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
    }

    const gptMoviesList = gptResult.choices[0]?.message?.content.split(",") //if gpt not work set some default value
    //for each movie find on tmdb
    const promises = gptMoviesList.map(movie => TmdbMovieSearch(movie))

    const data =  await Promise.all(promises)
    setSearching(false)
    dispatch(addGptMovieResults({movieNames: gptMoviesList, movieResults: data}))
  }



  return (
    <div className='pt-[50%] sm:pt-[40] md:pt-[20%] lg:pt-[10%] flex justify-center'>
        <form className='w-full md:w-1/2 bg-black bg-opacity-85 grid grid-cols-12' onSubmit={(e) => e.preventDefault()}>
            <input
                className='p-4 m-4 rounded-lg col-span-9'
                type='text'
                placeholder={lang[langKey].gptSearchPlaceHolder}
                ref={searchText}
            />
            <button className='col-span-3 m-4 py-1 px-2 sm:py-2 sm:px-4 bg-red-700 text-white rounded-lg cursor-pointer'
              onClick={handleGptSearch}
              disabled={searching}
            >{lang[langKey].search}</button>
        </form>
    </div>
  )
}

export default GptSearchBar