import React from 'react'
import GPTFLIX from "../utils/images/GPTFLIX.png"
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate()
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center px-4">
      <div className="text-center max-w-md w-full">
        {/* Logo */}
        <img
          src={GPTFLIX}
          alt="GPT FLIX"
          className="mx-auto mb-8 cursor-pointer w-48"
          onClick={() => navigate("/")}
        />
        
        {/* 404 Number */}
        <div className="text-8xl font-bold text-red-500 mb-4">404</div>
        
        {/* Main Message */}
        <h1 className="text-3xl font-bold text-white mb-4">Page Not Found</h1>
        
        {/* Description */}
        <p className="text-gray-300 text-lg mb-8">
          Sorry, the page you're looking for doesn't exist. It might have been moved, deleted, or you entered the wrong URL.
        </p>
        
        {/* Action Buttons */}
        <div className="space-y-4">
          <button
            onClick={() => navigate("/")}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 transform hover:scale-105"
          >
            Go to Home
          </button>
          
          <button
            onClick={() => navigate("/browse")}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 transform hover:scale-105"
          >
            Browse Movies
          </button>
          
          <button
            onClick={() => window.history.back()}
            className="w-full bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300"
          >
            Go Back
          </button>
        </div>
        
        {/* Additional Info */}
        <p className="text-gray-400 text-sm mt-8">
          If you believe this is an error, please contact support.
        </p>
      </div>
    </div>
  );
}

export default NotFound; 