import { getWeekKey } from './getWeekKey';

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

export async function fetchWeeklyMovie() {
  const apiKey = process.env.TMDB_API_KEY;

  if (!apiKey) {
    throw new Error('TMDB API key no definida');
  }

  const randomPage = Math.floor(Math.random() * 20) + 1;

  const res = await fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=es-ES&sort_by=vote_average.desc&vote_count.gte=1000&page=${randomPage}`,
  );

  const data = await res.json();

  const randomIndex = Math.floor(Math.random() * data.results.length);
  const movie = data.results[randomIndex];

  const detailsRes = await fetch(
    `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${apiKey}&language=es-ES`,
  );

  const detailsMovie = await detailsRes.json();
  return detailsMovie;
}

export async function fetchRandomMovie(
  genre: number | null,
  year: number | null,
  rating: number | null,
) {
  const apiKey = process.env.TMDB_API_KEY;
  if (!apiKey) throw new Error('TMDB API key no definida');

  const baseUrl = 'https://api.themoviedb.org/3/discover/movie';

  const buildUrl = () => {
    const url = new URL(baseUrl);

    url.searchParams.append('api_key', apiKey);
    url.searchParams.append('language', 'es-ES');
    url.searchParams.append('vote_count.gte', '5');
    url.searchParams.append('sort_by', 'popularity.desc');

    if (genre !== null)
      url.searchParams.append('with_genres', genre.toString());

    if (year !== null) {
      const startYear = year;
      const endYear = year + 9;

      url.searchParams.append('primary_release_date.gte', `${startYear}-01-01`);
      url.searchParams.append('primary_release_date.lte', `${endYear}-12-31`);
    }

    if (rating !== null)
      url.searchParams.append('vote_average.gte', rating.toString());

    return url;
  };

  // 1. Primera llamada para saber cuántas páginas hay
  const firstUrl = buildUrl();
  firstUrl.searchParams.append('page', '1');

  const firstRes = await fetch(firstUrl.toString());
  if (!firstRes.ok) throw new Error('Error al hacer fetch a TMDB');

  const firstData = await firstRes.json();

  if (!firstData.results || firstData.results.length === 0) {
    return { error: 'No se encontraron películas con esos filtros' };
  }

  // 2. Elegir página aleatoria
  const totalPages = Math.min(firstData.total_pages, 500);
  const randomPage = Math.floor(Math.random() * totalPages) + 1;

  const randomUrl = buildUrl();
  randomUrl.searchParams.append('page', randomPage.toString());

  const res = await fetch(randomUrl.toString());
  if (!res.ok) throw new Error('Error al hacer fetch a TMDB');

  const data = await res.json();

  let results = data.results && data.results.length > 0 ? data.results : null;

  // 3. Fallback si la página aleatoria viene vacía
  if (!results) {
    const fallbackUrl = buildUrl();
    fallbackUrl.searchParams.append('page', '1');

    const fallbackRes = await fetch(fallbackUrl.toString());
    const fallbackData = await fallbackRes.json();

    if (!fallbackData.results || fallbackData.results.length === 0) {
      return { error: 'No se encontraron películas con esos filtros' };
    }

    const fallbackIndex = Math.floor(
      Math.random() * fallbackData.results.length,
    );

    return fallbackData.results[fallbackIndex];
  }

  // 4. Random dentro de la página
  const randomIndex = Math.floor(Math.random() * results.length);

  return results[randomIndex];
}
