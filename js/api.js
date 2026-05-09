import { API_KEY } from "./config.js";
const BASE_URL = "https://api.themoviedb.org/3"

export async function getPopularMovies(category = "popular"){
    const response = await fetch(
        `${BASE_URL}/movie/${category}?api_key=${API_KEY}`
    )
    const data = await response.json();
    return data.results;
}

