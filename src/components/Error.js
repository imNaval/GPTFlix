import React from 'react'
import GPTFLIX from "../utils/images/GPTFLIX.png"
import { useNavigate } from 'react-router-dom';


const Error = () => {
  const navigate = useNavigate()
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md max-w-md w-full">
        <img
          src={GPTFLIX}
          alt="App Logo"
          className="mx-auto mb-8 cursor-pointer"
          onClick={()=> navigate("/")}
        />
        <h1 className="text-2xl font-semibold text-red-500 mb-4">Oops! Something went wrong</h1>
        <p className="text-gray-700 text-lg">We're sorry, but an unexpected error occurred. Please try again later.</p>
      </div>
    </div>
  );
}





export default Error