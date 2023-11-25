import React, { useRef } from 'react'
import lang from '../utils/languageConstants'
import { useDispatch, useSelector } from 'react-redux'
import openai from '../utils/openai'
import { TMDB_API_OPTIONS } from '../utils/constant'
import { addGptMovieResults } from '../utils/gptSlice'

const GptSearchBar = () => {

  const dispatch = useDispatch();

  const searchText = useRef(null)

  const TmdbMovieSearch = async(movie) =>{
    const data = await fetch('https://api.themoviedb.org/3/search/movie?query=' + movie + '&include_adult=false&language=en-US&page=1', TMDB_API_OPTIONS)

    const json = await data.json();

    return json.results;
  }

  const handleGptSearch = async() =>{
    // console.log(searchText.current.value)

    const searchQuery = "Act as a Movie Recommendation system and suggest some movies for the query " 
      + searchText.current.value 
      + ". Only give me names of 5 movies, comma separated like the example result given ahead. Example Results: Gadar, Golmal, Hera ferri, Bahubali, KGF"

/*
    const gptResult = await openai.chat.completions.create({
      //messages: [{ role: 'user', content: searchText.current.value }],
      messages: [{ role: 'user', content: searchQuery }],
      model: 'gpt-3.5-turbo',
    });
    if(!gptResult.choices){
      //TODO: Error Handling
    }
    console.log(gptResult.choices[0]?.message?.content);
*/

    //for now show search for these movies, Chalti Ka Naam Gaadi, Padosan, Amar Akbar Anthony, Chupke Chupke, Angoor.
    //const gptMoviesLists = gptResult.choices[0]?.message?.content.split(",")
    const gptMoviesList = "Chalti Ka Naam Gaadi, Padosan, Amar Akbar Anthony, Chupke Chupke, Angoor".split(",")
    console.log(gptMoviesList)
    //for each movie find on tmdb
    const promises = gptMoviesList.map(movie => TmdbMovieSearch(movie))

    const data =  await Promise.all(promises)
    //console.log(data)

    //dispatch(addGptMovieResults(data))
    dispatch(addGptMovieResults({movieNames: gptMoviesList, movieResults: data}))

  }

  const langKey = useSelector(store => store.config.lang)

  return (
    <div className='pt-[35%] md:pt-[10%] flex justify-center'>
        <form className='w-full md:w-1/2 bg-black grid grid-cols-12' onSubmit={(e) => e.preventDefault()}>
            <input
                className='p-4 m-4 rounded-lg col-span-9'
                type='text'
                placeholder={lang[langKey].gptSearchPlaceHolder}
                ref={searchText}
            />
            <button className='col-span-3 m-4 py-2 px-4 bg-red-700 text-white rounded-lg'
              onClick={handleGptSearch}
            >{lang[langKey].search}</button>
        </form>
    </div>
  )
}

export default GptSearchBar