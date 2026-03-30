import { UserMovie } from '../firebase/movies';
import { Timestamp } from 'firebase/firestore';

export function countMoviesThisMonth(movies: UserMovie[]): number {
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  return movies.filter((movie) => {
    if (!('toDate' in movie.addedAt)) return false;

    const added = movie.addedAt.toDate();
    return (
      added.getMonth() === currentMonth && added.getFullYear() === currentYear
    );
  }).length;
}
