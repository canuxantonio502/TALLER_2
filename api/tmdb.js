export default async function handler(req, res) {

    // Permitir que CampusMovieExplorer pueda comunicarse
    // con esta función desde GitHub Pages.
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    // Responder correctamente a las peticiones CORS
    // que el navegador pueda realizar antes de la petición principal.
    if (req.method === "OPTIONS") {
        return res.status(200).end();
    }

    try {
        const { endpoint, query } = req.query;

        if (!endpoint) {
            return res.status(400).json({
                error: "Falta especificar el endpoint."
            });
        }

        const API_KEY = process.env.TMDB_API_KEY;

        if (!API_KEY) {
            return res.status(500).json({
                error: "La API Key de TMDB no está configurada en Vercel."
            });
        }

        const allowedEndpoints = [
            "popular",
            "top_rated",
            "upcoming",
            "now_playing",
            "search",
            "details"
        ];

        if (!allowedEndpoints.includes(endpoint)) {
            return res.status(400).json({
                error: "Endpoint no permitido."
            });
        }

        let url;

        if (endpoint === "search") {

            if (!query) {
                return res.status(400).json({
                    error: "Falta el término de búsqueda."
                });
            }

            url =
                `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`;

        } else if (endpoint === "details") {

            if (!query) {
                return res.status(400).json({
                    error: "Falta el ID de la película."
                });
            }

            url =
                `https://api.themoviedb.org/3/movie/${encodeURIComponent(query)}?api_key=${API_KEY}`;

        } else {

            url =
                `https://api.themoviedb.org/3/movie/${endpoint}?api_key=${API_KEY}`;
        }

        const response = await fetch(url);

        if (!response.ok) {
            return res.status(response.status).json({
                error: "TMDB rechazó la solicitud."
            });
        }

        const data = await response.json();

        return res.status(200).json(data);

    } catch (error) {

        console.error("Error en la función TMDB:", error);

        return res.status(500).json({
            error: "Error interno del servidor."
        });
    }
}