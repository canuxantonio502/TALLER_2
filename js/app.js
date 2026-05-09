import { getMovies } from "./api.js"
import { renderMovies } from "./ui.js"

async function init(){
    const movies = await getMovies(category)
    renderMovies(movies)
}

init()

const menuBtn = document.querySelector(".menu-btn");
const sidebar = document.querySelector(".sidebar");

menuBtn.addEventListener("click", () => {
    sidebar.classList.toggle("active");
})

const categories = document.querySelectorAll(".category-list li");

categories.forEach(category => {
    category.addEventListener("click", async () => {
        const selectedCategory = category.dataset.category
        const movies = await getMovies(selectedCategory)
        renderMovies(movies)
        sidebar.classList.remove("active")
    })
})