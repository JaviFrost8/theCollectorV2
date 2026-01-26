'use client';
import { useEffect, useState } from 'react';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import { UserMovie } from '../firebase/movies';

export function useUserMovies(uid?: string) {
  const [movies, setMovies] = useState<UserMovie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!uid) return;

    const q = query(
      collection(db, 'users', uid, 'movies'),
      orderBy('addedAt', 'desc'),
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => doc.data() as UserMovie);
      setMovies(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [uid]);

  return { movies, loading };
}
