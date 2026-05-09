const moviesContainer = document.querySelector(".movies-container");

export function renderMovies(movies){
    moviesContainer.innerHTML = ""
    movies.forEach(movie => {
        const movieCard = document.createElement("article")
        movieCard.classList.add("movie-card")
        movieCard.innerHTML = `
            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" class="movie-image">
            <div class="movie-info">
                <h2 class="movie-title">${movie.title}</h2>
                <p class="movie-date">${movie.release_date}</p>
            </div>
        `
        moviesContainer.appendChild(movieCard)
    })
}