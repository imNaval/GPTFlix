// API Configuration - Easy switching between direct TMDB and proxy
export const API_CONFIG = {
  // Set to 'proxy' to use the proxy server, 'direct' to use TMDB directly
  MODE: process.env.REACT_APP_API_MODE || 'proxy',
  
  // Proxy server URL
  PROXY_URL: process.env.REACT_APP_PROXY_URL || 'http://localhost:5000',
  
  // Direct TMDB URL
  TMDB_URL: 'https://api.themoviedb.org/3'
};

// Helper function to get the base URL based on mode
export const getBaseUrl = () => {
  return API_CONFIG.MODE === 'proxy' ? API_CONFIG.PROXY_URL : API_CONFIG.TMDB_URL;
};

// Helper function to get API options based on mode
export const getApiOptions = () => {
  if (API_CONFIG.MODE === 'proxy') {
    return {
      method: 'GET',
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json'
      }
    };
  } else {
    // For direct TMDB API, you'll need to import TMDB_API_OPTIONS from constant.js
    return null; // This will be handled in the proxyApi.js file
  }
};

// Log current configuration
// console.log(`🔧 API Mode: ${API_CONFIG.MODE}`);
// console.log(`🔧 Base URL: ${getBaseUrl()}`); 