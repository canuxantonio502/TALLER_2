const moviesContainer = document.querySelector(".movies-container");

export function renderMovies(movies) {
    moviesContainer.innerHTML = ""
    movies.forEach(movie => {
        const movieCard = document.createElement("article")
        const poster = movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : "https://placehold.co/500x750?text=Sin+Póster";
        movieCard.classList.add("movie-card")
        movieCard.dataset.id = movie.id
        movieCard.innerHTML = `
            <img src="${poster}" alt="${movie.title}" class="movie-image">
            <div class="movie-info">
                <h2 class="movie-title">${movie.title}</h2>
                <p class="movie-date">${movie.release_date}</p>
            </div>
        `
        moviesContainer.appendChild(movieCard)
    })
}

const modal = document.querySelector(".movie-modal");
const modalBody = document.querySelector(".modal-body");

export function renderMovieDetails(movie) {
    if (!movie) return;

    const poster = movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : "https://placehold.co/500x750?text=Sin+Póster";

    modalBody.innerHTML = `
        <img src="${poster}" alt="${movie.title || ""}" class="modal-image">
        <div class="modal-info">
            <h2>${movie.title || "Sin título"}</h2>
            <p>${movie.overview || ""}</p>
            <p>⭐ Rating: ${movie.vote_average ?? ""}</p>
            <p>📅 Release: ${movie.release_date ?? ""}</p>
        </div>
    `
    modal.classList.remove("hidden");
}
