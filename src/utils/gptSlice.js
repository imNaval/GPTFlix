import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
    name: 'gpt',
    initialState: {
        showGptSearch: false,
        gptMovieNames: null,
        tmdbMovieResults: null
    },
    reducers: {
        toggleGptSearchView: (state)=> {
            state.showGptSearch = !state.showGptSearch;
        },
        addGptMovieResults: (state, action)=>{
            //state.gptMovies = action.payload;
            const {movieNames, movieResults} = action.payload
            state.gptMovieNames = movieNames
            state.tmdbMovieResults = movieResults
        }
    }
});

export default gptSlice.reducer;
export const {toggleGptSearchView, addGptMovieResults} = gptSlice.actions