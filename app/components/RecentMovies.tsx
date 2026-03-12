import React from 'react';
import { useRecentMovies } from '../hooks/useRecentMovies';
import Image from 'next/image';

interface Props {
  uid: string | undefined;
}

export const RecentMovies = ({ uid }: Props) => {
  const { movies, loading } = useRecentMovies(uid);

  if (loading)
    return (
      <p className="flex justify-center items-center">Cargando películas...</p>
    );
  if (!movies.length)
    return (
      <p className="flex justify-center items-center">
        No hay películas añadidas
      </p>
    );

  return (
    <div className="flex flex-wrap justify-evenly gap-4">
      {movies.map((movie) => (
        <div key={movie.tmdbId} className="relative aspect-2/3 w-[220] h-[370]">
          <div className="relative w-full h-[310]">
            <Image
              alt={movie.title}
              src={`https://image.tmdb.org/t/p/w500${movie.posterPath}`}
              fill
              className="object-cover rounded-md"
            />
          </div>
          <div className="flex flex-col mt-2">
            <span>{movie.title}</span>
            <span className="text-gray-500">
              {movie.releaseDate.slice(0, 4)}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};
