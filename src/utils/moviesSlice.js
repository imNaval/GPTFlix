import { createSlice } from "@reduxjs/toolkit";

const moviesSlice = createSlice({
    name: 'movies',
    initialState: {
        nowPlayingMovies: null,
        popularMovies: null,
        tradingMovies: null,
        upcomingMovies: null,
        trailerVideo: null
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
        }
    }
});

export default moviesSlice.reducer;
export const { addNowPlayingMovies, addPopularMovies, addTradingMovies, addUpcomingMovies, addTrailerVideo } = moviesSlice.actions;