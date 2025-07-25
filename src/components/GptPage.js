import React, { useState } from 'react'
import GptSearchBar from './GptSearchBar'
import GptMovieSuggestions from './GptMovieSuggestions'
import ApiUsageDisplay from './ApiUsageDisplay'
// import { BG_IMG } from '../utils/constant'
import BackGround from "../utils/images/BackGround.jpg"

const GptPage = () => {
    const [refreshKey, setRefreshKey] = useState(0);

    const handleSearchComplete = () => {
        setRefreshKey(prev => prev + 1);
    };

    return (
        <>
            <div className='fixed -z-10'>
                <img className='h-screen object-cover md:w-screen' src={BackGround} alt='backgroundImage'/>
            </div>
            <div className=''>
                <div className='pt-[50%] sm:pt-[40%] md:pt-[20%] lg:pt-[10%] flex flex-col items-center gap-4 px-4'>
                    <div className='w-full max-w-4xl flex flex-col lg:flex-row gap-4 items-center justify-center'>
                        <div className='w-full lg:w-2/3'>
                            <GptSearchBar onSearchComplete={handleSearchComplete} />
                        </div>
                        <div className='w-full lg:w-1/3 flex justify-center lg:justify-start'>
                            <ApiUsageDisplay key={refreshKey} />
                        </div>
                    </div>
                </div>
                <GptMovieSuggestions />
            </div>
        </>

    )
}

export default GptPage