import { getPopularMovies } from "./api.js"
import { renderMovies } from "./ui.js"

async function init(){
    const movies = await getPopularMovies()
    renderMovies(movies)
}

init()
