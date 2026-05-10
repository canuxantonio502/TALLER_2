import { getMovies, getMovieDetails, searchMovies } from "./api.js";
import { renderMovies, renderMovieDetails } from "./ui.js";

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
  sidebar.classList.toggle("active");
});

async function init() {
  showLoading()
  await new Promise(resolve => setTimeout(resolve, 1000))
  const movies = await getMovies("popular");
  if (Array.isArray(movies)){
    renderMovies(movies)
  }
  hideLoading()
}

init();

const categories = document.querySelectorAll(".category-list li")

categories.forEach((categoryEl) => {
  categoryEl.addEventListener("click", async () => {
    showLoading()
    await new Promise(resolve => setTimeout(resolve, 1000))
    const selectedCategory = categoryEl.dataset.category
    const movies = await getMovies(selectedCategory)
    if (Array.isArray(movies)) {
      renderMovies(movies)
    }
    hideLoading()
    sidebar.classList.remove("active")
  })
})

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