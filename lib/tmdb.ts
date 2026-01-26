export async function getMovies(searchTerm = '') {
  const apiKey = process.env.TMDB_API_KEY;

  if (!apiKey) {
    throw new Error('TMDB API key no definida');
  }

  const url =
    searchTerm.trim() !== ''
      ? `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(
          searchTerm,
        )}&language=es-ES`
      : `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=es-ES&page=1`;

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error('Error al obtener películas');
  }

  const data = await res.json();
  return data.results;
}

export async function getMovie(id: string) {
  const apiKey = process.env.TMDB_API_KEY;

  if (!apiKey) {
    throw new Error('TMDB API key no definida');
  }

  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=es-ES`,
  );

  if (!res.ok) {
    throw new Error('Error al obtener la película');
  }

  const data = await res.json();
  return data;
}

export async function getMovieCredits(id: string) {
  const apiKey = process.env.TMDB_API_KEY;

  if (!apiKey) {
    throw new Error('TMDB API key no definida');
  }

  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apiKey}&language=es-ES`,
  );

  if (!res.ok) {
    throw new Error('Error al obtener los créditos de la película');
  }

  const data = await res.json();
  return data;
}
