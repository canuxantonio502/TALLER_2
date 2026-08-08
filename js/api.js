const BASE_URL = "https://campus-movie-explorer-7s22hnnwd-tony-021.vercel.app/api/tmdb";

// Obtenemos las películas de una categoría
export async function getMovies(category = "popular") {
    try {
        const response = await fetch(
            `${BASE_URL}?endpoint=${encodeURIComponent(category)}`
        );

        if (!response.ok) {
            throw new Error("Error en la petición");
        }

        const data = await response.json();

        return data.results;

    } catch (error) {
        console.error("Error obteniendo películas:", error);
        throw error;
    }
}

// Buscamos películas por nombre
export async function searchMovies(query) {
    try {
        const response = await fetch(
            `${BASE_URL}?endpoint=search&query=${encodeURIComponent(query)}`
        );

        if (!response.ok) {
            throw new Error("Error buscando películas");
        }

        const data = await response.json();

        return data.results;

    } catch (error) {
        console.error("Error buscando películas:", error);
        throw error;
    }
}

// Obtenemos los detalles de una película
export async function getMovieDetails(movieId) {
    try {
        const response = await fetch(
            `${BASE_URL}?endpoint=details&query=${encodeURIComponent(movieId)}`
        );

        if (!response.ok) {
            throw new Error("Error obteniendo detalles de la película");
        }

        const data = await response.json();

        return data;

    } catch (error) {
        console.error("Error obteniendo detalles:", error);
        throw error;
    }
}