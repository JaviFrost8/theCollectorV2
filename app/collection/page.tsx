'use client';

import { useContextAuth } from '@/context/AuthContext';
import { useUserMovies } from '../hooks/useUserMovies';
import Link from 'next/link';
import Image from 'next/image';
import { UserMovie } from '../firebase/movies';

export default function CollectionPage() {
  const { user } = useContextAuth();
  const { movies, loading } = useUserMovies(user?.uid);

  if (!user) {
    return <p>Debes iniciar sesión para ver tu colección</p>;
  }

  if (loading) {
    return <p>Cargando colección...</p>;
  }

  if (movies.length === 0) {
    return <p>Aún no has añadido ninguna película</p>;
  }

  return (
    <div className="flex flex-col m-10">
      <div className="flex flex-col">
        <h1 className="text-4xl">Mi colección</h1>
        <h2 className="text-gray-400">
          {movies.length === 0
            ? 'No tienes ninguna pelicula en tu colección'
            : `Gestionando ${movies.length} películas en tu filmoteca personal`}
        </h2>
      </div>
      {/*Aquí empieza el wrap para las películas*/}
      <div className="flex flex-wrap justify-center gap-5">
        {movies.map((movie: UserMovie) => (
          <div key={movie.tmdbId} className="min-w-[200]">
            <Link href={`/movie/${movie.tmdbId}`}>
              <div className="relative min-h-[300] w-full overflow-hidden">
                <Image
                  src={
                    !movie.posterPath
                      ? '/nophoto.avif'
                      : `https://image.tmdb.org/t/p/w500${movie.posterPath}`
                  }
                  alt={movie.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 500px"
                  className="rounded-xl object-cover"
                />
              </div>
              <div className="flex flex-col mt-1.5">
                <p>
                  {movie.title.length > 25
                    ? movie.title.slice(0, 25) + '...'
                    : movie.title}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">
                    {movie.releaseDate.slice(0, 4)}
                  </span>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
