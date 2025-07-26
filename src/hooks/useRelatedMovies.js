import { useDispatch } from "react-redux"
import { addRecommendationMovies, addRelatedMovies } from "../utils/moviesSlice";
import { useEffect } from "react";
import { getSimilarMovies as getSimilarMoviesFromProxy, getRecommendations as getRecommendationsFromProxy } from "../utils/proxyApi";

const useRelatedMovies = ({movieId}) =>{
    const dispatch = useDispatch();

    const getSimilarMovies = async() =>{
        try {
            const json = await getSimilarMoviesFromProxy(movieId)
            dispatch(addRelatedMovies(json.results))
        } catch (error) {
            console.error('Error fetching similar movies:', error)
        }
    }

    const getRecommendationMovies = async() =>{
        try {
            const json = await getRecommendationsFromProxy(movieId)
            dispatch(addRecommendationMovies(json.results))
        } catch (error) {
            console.error('Error fetching recommendation movies:', error)
        }
    }

    useEffect(()=>{
        getSimilarMovies();
        // getRecommendationMovies();
    }, [movieId])
}

export default useRelatedMovies;

//https://www.behance.net/gallery/188185637/Netflix-UIUX-Figma?tracking_source=search_projects|netflix+ui&l=20