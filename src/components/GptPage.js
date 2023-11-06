import React from 'react'
import GptSearchBar from './GptSearchBar'
import GptMovieSuggestions from './GptMovieSuggestions'
import { BG_IMG } from '../utils/constant'

const GptPage = () => {
    return (
        <div>
            <div className='fixed -z-10'>
                <img
                    src={BG_IMG}
                    alt='backgroundImage'
                />
            </div>
            <GptSearchBar />
            <GptMovieSuggestions />
        </div>
    )
}

export default GptPage