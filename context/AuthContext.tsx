'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import {
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  User,
} from 'firebase/auth';
import { auth, googleProvider } from '@/app/firebase/firebaseConfig';
import { createUserDocument } from '@/app/firebase/firestore';
import { getGenreStats } from '@/lib/stats';
import { useRouter } from 'next/navigation';

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  genreStats: { name: string; count: number }[];
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [genreStats, setGenreStats] = useState<
    { name: string; count: number }[]
  >([]);
  const router = useRouter();

  async function login(): Promise<void> {
    await signInWithPopup(auth, googleProvider);
  }

  async function logout(): Promise<void> {
    const confirm = window.confirm('¿Desea cerrar la sesión?');
    if (confirm) {
      await signOut(auth);
      router.push('/search');
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        await createUserDocument(firebaseUser);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!user?.uid) return;
    getGenreStats(user.uid).then((stats) => {
      setGenreStats(stats.slice(0, 5));
    });
  }, [user?.uid]);

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, genreStats }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useContextAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuthContext debe usarse dentro del provider');
  }

  return context;
}
