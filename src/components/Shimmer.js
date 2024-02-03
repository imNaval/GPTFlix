import React from 'react'

const Shimmer = () => {
  return (
    <div>Shimmer</div>
  )
}

export default Shimmer

export const GptMovieShimmer = () => {
  const containers = [1, 2]
  const cards = [1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <div className='p-4 m-4 bg-black bg-opacity-80 text-white'>
      {
        containers.map(container => <div key={container} className='mb-8 overflow-hidden'>
          <div className='w-96 h-10 my-2 bg-gradient-to-r from-gray-500'></div>
          <div className='flex overflow-x-auto no-scrollbar'>
            <div className='flex space-x-4'>
              {
                cards.map(card => <div key={card} className='w-36 md:w-48 pr-4 h-48 md:h-60'>
                  <div className='w-full h-full bg-gradient-to-r from-orange-300'></div>
                </div>)
              }
            </div>
          </div>
        </div>)
      }
    </div>
  )
}