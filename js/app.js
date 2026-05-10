// Importamos las funciones desde las diferentes hojas de JavaScript
import { getMovies, getMovieDetails, searchMovies } from "./api.js";
import { renderMovies, renderMovieDetails } from "./ui.js";
import { showError, hideError } from "./ui.js";

// Declaramos nuestros elementos apartir de los obtenidos del HTML
const menuBtn = document.querySelector(".menu-btn")
const sidebar = document.querySelector(".sidebar")
const loading = document.querySelector(".loading")

function showLoading() {
  loading.classList.remove("hidden")
}

function hideLoading() {
  loading.classList.add("hidden")
}

menuBtn.addEventListener("click", () => {
  sidebar.classList.toggle("active")
});

// Damos inicio a la aplicación mostrando las películas populares
async function init(){
    try{
        hideError()
        showLoading()
        await new Promise(resolve => setTimeout(resolve, 1000))
        const movies = await getMovies("popular")
        if(Array.isArray(movies)){
            renderMovies(movies)
        }
    }catch(error){
        showError(error.message)
    }finally{
        hideLoading()
    }
}

init()

// Capturamos las categorías del menú, para poder acceder a ellas con el getMovie
const categories = document.querySelectorAll(".category-list li")

categories.forEach((categoria) => {
  categoria.addEventListener("click", async () => {
    showLoading()
    await new Promise(resolve => setTimeout(resolve, 1000))
    const selectedCategory = categoria.dataset.category
    const movies = await getMovies(selectedCategory)
    if (Array.isArray(movies)) {
      renderMovies(movies)
    }
    hideLoading()
    sidebar.classList.remove("active")
  })
})

// Creamos el evento para mostrar el modal de la película seleccionada
document.addEventListener("click", async (event) => {
  const movieCard = event.target.closest(".movie-card");
  if (!movieCard) return;
  const movieId = movieCard.dataset.id;
  if (!movieId) return;
  const movieDetails = await getMovieDetails(movieId);
  if (!movieDetails) return
  renderMovieDetails(movieDetails);
})

const closeModalBtn = document.querySelector(".close-modal");
const modal = document.querySelector(".movie-modal");

closeModalBtn.addEventListener("click", () => {
  modal.classList.add("hidden");
});

modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.classList.add("hidden");
  }
});

// Creamos el evento para tomar la petición del usuario y renderizar los resultados
const searchForm = document.querySelector(".search-form");
const searchInput = document.querySelector(".search-input");

searchForm.addEventListener("submit", async (event) => {
  event.preventDefault()
  const query = searchInput.value.trim()
  showLoading()
  await new Promise(resolve => setTimeout(resolve, 1000));
  if (!query) return
  const movies = await searchMovies(query)
  if (Array.isArray(movies)) {
    renderMovies(movies)
  }
  hideLoading()
  searchInput.value = ""
})