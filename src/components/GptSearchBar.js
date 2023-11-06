import React, { useRef } from 'react'
import lang from '../utils/languageConstants'
import { useSelector } from 'react-redux'
import openai from '../utils/openai'

const GptSearchBar = () => {

  const searchText = useRef(null)

  const handleGptSearch = async() =>{
    // console.log(searchText.current.value)

    const searchQuery = "Act as a Movie Recommendation system and suggest some movies for the query " + searchText.current.value + ". Only give me names of 5 movies, comma separated like the example result given ahead. Example Results: Gadar, Golmal, Hera ferri, Bahubali, KGF"

    const gptResult = await openai.chat.completions.create({
      //messages: [{ role: 'user', content: searchText.current.value }],
      messages: [{ role: 'user', content: searchQuery }],
      model: 'gpt-3.5-turbo',
    });
  
    console.log(gptResult.choices);
  }

    const langKey = useSelector(store => store.config.lang)
  return (
    <div className='pt-[10%] flex justify-center'>
        <form className='w-1/2 bg-black grid grid-cols-12' onSubmit={(e) => e.preventDefault()}>
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