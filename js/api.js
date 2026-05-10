// Declaramos los datos que nos darán acceso a la API
import { API_KEY } from "./config.js";
const BASE_URL = "https://api.themoviedb.org/3"

// Creamos la función que hará el fetch y nos obtendrá las películas según sea el caso
export async function getMovies(category = "popular"){
    try{
        const response = await fetch(
            `${BASE_URL}/movie/${category}?api_key=${API_KEY}`
        )
        if(!response.ok){
            throw new Error("Error en la petición")
        }
        const data = await response.json()
        return data.results
    }catch(error){
        throw error
    }
}

// Esta función nos ayudará a buecar las películas que coincidan con la búsqueda realizada
export async function searchMovies(query){
    try{
        const response = await fetch(
            `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`
        )
        const data = await response.json()
        return data.results
    }catch(error){
        console.error("Error buscando películas:", error)
    }
}

// Ésta función nos obtendrá los detalles de una película en específic a traves del movieId
export async function getMovieDetails(movieId){
    try{
        const response = await fetch(
            `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`
        )
        const data = await response.json()
        return data
    }catch(error){
        console.error("Error obteniendo detalles:", error);
    }
}