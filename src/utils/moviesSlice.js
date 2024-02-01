import { createSlice } from "@reduxjs/toolkit";

const moviesSlice = createSlice({
    name: 'movies',
    initialState: {
        nowPlayingMovies: null,
        popularMovies: null,
        tradingMovies: null,
        upcomingMovies: null,
        trailerVideo: null,
        movieVideos: null,
        movieDetails: null,
        relatedMovies: null,
        recommendationMovies: null
    },
    reducers:{
        addNowPlayingMovies: (state, action) =>{
            state.nowPlayingMovies = action.payload
        },
        addPopularMovies: (state, action) =>{
            state.popularMovies = action.payload
        },
        addTradingMovies: (state, action) =>{
            state.tradingMovies = action.payload
        },
        addUpcomingMovies: (state, action) =>{
            state.upcomingMovies = action.payload
        },
        addTrailerVideo: (state, action)=> {
            state.trailerVideo = action.payload
        },
        addMovieVideos: (state, action)=>{
            state.movieVideos = action.payload
        },
        addMovieDetails: (state, action)=>{
            state.movieDetails = action.payload
        },
        addRelatedMovies: (state, action)=>{
            state.relatedMovies = action.payload
        },
        addRecommendationMovies: (state, action) =>{
            state.recommendationMovies = action.payload
        }
    }
});

export default moviesSlice.reducer;
export const { addNowPlayingMovies, addPopularMovies, addTradingMovies, addUpcomingMovies, addTrailerVideo, addMovieVideos, addMovieDetails, addRelatedMovies, addRecommendationMovies } = moviesSlice.actions;