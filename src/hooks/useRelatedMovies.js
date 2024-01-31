import { useDispatch } from "react-redux"
import { addRelatedMovies } from "../utils/moviesSlice";
import { TMDB_API_OPTIONS } from "../utils/constant";
import { useEffect } from "react";

const useRelatedMovies = ({movieId}) =>{
    const dispatch = useDispatch();
    // dispatch(addRelatedMovies(relatedMovies))

    const getSimilarMovies = async() =>{
        const url = `https://api.themoviedb.org/3/movie/${movieId}/similar?language=en-US&page=1`
        const data = await fetch(url, TMDB_API_OPTIONS)
        const json = await data.json()
        console.log(json)
    }

    const getRecommendationMovies = async() =>{
        const url = `https://api.themoviedb.org/3/movie/${movieId}/recommendations?language=en-US&page=1`
        const data = await fetch(url, TMDB_API_OPTIONS)
        const json = await data.json()
        console.log(json)
    }

    useEffect(()=>{
        getSimilarMovies();
        getRecommendationMovies();
    }, [])
}

export default useRelatedMovies;

//https://www.behance.net/gallery/188185637/Netflix-UIUX-Figma?tracking_source=search_projects|netflix+ui&l=20