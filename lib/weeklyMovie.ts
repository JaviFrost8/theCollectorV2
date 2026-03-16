import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '@/app/firebase/firebaseConfig';
import { fetchWeeklyMovie } from './tmdb';
import { getWeekKey } from './getWeekKey';

export async function weeklyMovie() {
  const weekKey = getWeekKey();
  const weekRef = doc(db, 'weeklyMovie', weekKey);

  const snapshot = await getDoc(weekRef);

  if (snapshot.exists()) {
    return snapshot.data();
  } else {
    const movie = await fetchWeeklyMovie();
    const { id, title, overview, poster_path, vote_average, genres } = movie;
    const movieData = {
      id,
      title,
      overview,
      poster_path,
      vote_average,
      genres,
    };

    await setDoc(weekRef, movieData);
    return movieData;
  }
}
