import {
  deleteDoc,
  doc,
  FieldValue,
  serverTimestamp,
  setDoc,
  Timestamp,
} from 'firebase/firestore';
import { TmdbMovie } from '../types/tmdb';
import { db } from './firebaseConfig';

export type UserMovie = {
  tmdbId: number;
  title: string;
  posterPath: string;
  releaseDate: string;
  genres: string[];
  status: 'No vista' | 'Vista';
  rating: number | null;
  favorite: boolean;
  addedAt: Timestamp | FieldValue;
  updatedAt: Timestamp | FieldValue;
};

export async function addMovieToUser(uid: string, movie: TmdbMovie) {
  if (!uid) return;

  const movieRef = doc(db, 'users', uid, 'movies', movie.id.toString());

  const movieData: UserMovie = {
    tmdbId: movie.id,
    title: movie.title,
    posterPath: movie.poster_path,
    releaseDate: movie.release_date,
    genres: movie.genres.map((g) => g.name),
    status: 'No vista',
    rating: null,
    favorite: false,
    addedAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };

  await setDoc(movieRef, movieData, { merge: true });
}

export async function removeMovieFromUser(uid: string, tmdbId: number) {
  if (!uid) return;

  const movieRef = doc(db, 'users', uid, 'movies', tmdbId.toString());
  await deleteDoc(movieRef);
}
