// Proxy API configuration for bypassing ISP restrictions
const PROXY_BASE_URL = process.env.REACT_APP_PROXY_URL || 'http://localhost:5000';

export const PROXY_API_OPTIONS = {
  method: 'GET',
  headers: {
    'accept': 'application/json',
    'Content-Type': 'application/json'
  }
};

// Proxy API endpoints
export const PROXY_ENDPOINTS = {
  NOW_PLAYING: '/api/movies/now-playing',
  POPULAR: '/api/movies/popular',
  TOP_RATED: '/api/movies/top-rated',
  UPCOMING: '/api/movies/upcoming',
  MOVIE_DETAILS: (id) => `/api/movies/${id}`,
  MOVIE_VIDEOS: (id) => `/api/movies/${id}/videos`,
  SIMILAR_MOVIES: (id) => `/api/movies/${id}/similar`,
  RECOMMENDATIONS: (id) => `/api/movies/${id}/recommendations`,
  SEARCH_MOVIES: '/api/search/movies',
  DISCOVER_MOVIES: '/api/discover/movies'
};

// Generic function to make proxy API calls
export const proxyApiCall = async (endpoint, params = {}) => {
  try {
    let url = `${PROXY_BASE_URL}${endpoint}`;
    
    // Add query parameters if any
    if (Object.keys(params).length > 0) {
      const queryString = new URLSearchParams(params).toString();
      url += `?${queryString}`;
    }

    const response = await fetch(url, PROXY_API_OPTIONS);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Proxy API Error:', error);
    throw error;
  }
};

// Specific API functions
export const getNowPlayingMovies = () => proxyApiCall(PROXY_ENDPOINTS.NOW_PLAYING);
export const getPopularMovies = () => proxyApiCall(PROXY_ENDPOINTS.POPULAR);
export const getTopRatedMovies = () => proxyApiCall(PROXY_ENDPOINTS.TOP_RATED);
export const getUpcomingMovies = () => proxyApiCall(PROXY_ENDPOINTS.UPCOMING);
export const getMovieDetails = (id) => proxyApiCall(PROXY_ENDPOINTS.MOVIE_DETAILS(id));
export const getMovieVideos = (id) => proxyApiCall(PROXY_ENDPOINTS.MOVIE_VIDEOS(id));
export const getSimilarMovies = (id) => proxyApiCall(PROXY_ENDPOINTS.SIMILAR_MOVIES(id));
export const getRecommendations = (id) => proxyApiCall(PROXY_ENDPOINTS.RECOMMENDATIONS(id));
export const searchMovies = (query) => proxyApiCall(PROXY_ENDPOINTS.SEARCH_MOVIES, { query });
export const discoverMovies = (withGenres) => proxyApiCall(PROXY_ENDPOINTS.DISCOVER_MOVIES, { with_genres: withGenres }); 