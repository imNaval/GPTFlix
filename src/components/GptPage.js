import React from 'react'
import GptSearchBar from './GptSearchBar'
import GptMovieSuggestions from './GptMovieSuggestions'
import { BG_IMG } from '../utils/constant'

const GptPage = () => {
    return (
        <>
            <div className='fixed -z-10'>
                <img className='h-screen object-cover md:w-screen lg:h-auto' src={BG_IMG} alt='backgroundImage'/>
            </div>
            <div className=''>
                <GptSearchBar />
                <GptMovieSuggestions />
            </div>
        </>

    )
}

export default GptPage