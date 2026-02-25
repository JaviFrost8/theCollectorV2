import { formatRuntime } from '@/app/utils/formatRuntime';
import { UserMovie } from '../firebase/movies';

export function calculateAverageRating(movies: UserMovie[]) {
  const ratedMovies = movies.filter((movie) => movie.rating !== 0);
  const averageGrade =
    ratedMovies.length > 0
      ? ratedMovies.reduce((acc, movie) => acc + movie.rating!, 0) /
        movies.length
      : 0;

  return averageGrade.toFixed(2);
}

export function calculateDurationTotal(movies: UserMovie[]) {
  const runtimes = movies.filter((movie) => movie.runtime !== null);
  const totalMinutes = runtimes.reduce((acc, movie) => acc + movie.runtime!, 0);
  const formatMinutes = formatRuntime(totalMinutes);

  return formatMinutes;
}

export function calculatePrices(movies: UserMovie[]) {
  const moviesByPrices = movies.filter((movie) => movie.price !== null);
  const totalPrice = moviesByPrices.reduce(
    (acc, movie) => acc + movie.price!,
    0,
  );
  return totalPrice;
}
