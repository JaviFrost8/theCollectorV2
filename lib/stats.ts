import { db } from '@/app/firebase/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

export async function getGenreStats(uid: string) {
  if (!uid) return [];

  const moviesRef = collection(db, 'users', uid, 'movies');
  const snapshot = await getDocs(moviesRef);

  const genreCounts: Record<string, number> = {};

  snapshot.forEach((doc) => {
    const movie = doc.data();
    const genres = movie.genres || [];

    genres.forEach((genre: string) => {
      genreCounts[genre] = (genreCounts[genre] || 0) + 1;
    });
  });

  return Object.entries(genreCounts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}
