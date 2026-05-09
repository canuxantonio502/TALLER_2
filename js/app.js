import { getPopularMovies } from "./api.js"
import { renderMovies } from "./ui.js"


async function init(){
    const movies = await getPopularMovies()
    renderMovies(movies)
}

init()

const menuBtn = document.querySelector(".menu-btn");
const sidebar = document.querySelector(".sidebar");

menuBtn.addEventListener("click", () => {
    sidebar.classList.toggle("active");
})