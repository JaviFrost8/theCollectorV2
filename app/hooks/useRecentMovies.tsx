'use client';
import { useEffect, useState } from 'react';
import { UserMovie } from '../firebase/movies';
import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
} from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';

export function useRecentMovies(uid: string | undefined) {
  const [movies, setMovies] = useState<UserMovie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!uid) {
      setMovies([]);
      setLoading(false);
      return;
    }

    const q = query(
      collection(db, 'users', uid, 'movies'),
      orderBy('addedAt', 'desc'),
      limit(6),
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as UserMovie),
      }));

      setMovies(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [uid]);

  return { movies, loading };
}
