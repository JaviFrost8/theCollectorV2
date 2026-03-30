'use client';

import { useState } from 'react';
import { FiltersOptions } from '../components/FiltersOptions';
import Image from 'next/image';
import Link from 'next/link';

interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  vote_average: number;
  backdrop_path: string;
}

export default function FavoritesPage() {
  const [genre, setGenre] = useState<number | null>(null);
  const [year, setYear] = useState<number | null>(null);
  const [rating, setRating] = useState<number | null>(null);
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const backdropMovie = movie?.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : '';

  async function handleClick() {
    try {
      setLoading(true);
      const res = await fetch(
        `/api/recommend?genre=${genre ?? ''}&year=${year ?? ''}&rating=${rating ?? ''}`,
      );

      if (!res.ok) {
        throw new Error('Error al buscar la película');
      }

      const movie = await res.json();

      setMovie(movie);
      console.log(movie);
    } catch (err) {
      setMovie(null);
      setError('Error al conseguir la película');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col mb-40 w-full">
      <div className="flex flex-col items-center px-4">
        <p
          className="mt-6 text-3xl md:text-5xl font-bold text-center 
                    bg-linear-to-r from-white via-gray-300 to-gray-500 
                    bg-clip-text text-transparent"
        >
          EL RITUAL COMIENZA
        </p>

        <p className="text-gray-400 mt-2 text-center max-w-md">
          Deja que el destino elija tu próxima historia
        </p>
      </div>

      <div className="flex justify-center w-full px-4">
        <FiltersOptions
          genre={genre}
          setGenre={setGenre}
          year={year}
          setYear={setYear}
          rating={rating}
          setRating={setRating}
        />
      </div>

      <div className="flex justify-center">
        <button
          disabled={loading}
          onClick={handleClick}
          className="cursor-pointer mt-8 px-10 py-4 rounded-2xl 
                   bg-linear-to-r from-cyan-500 to-blue-600
                   hover:scale-105 hover:shadow-cyan-500/30 hover:shadow-xl
                   active:scale-95
                   transition-all duration-300 
                   text-lg font-semibold
                   disabled:opacity-50"
        >
          {loading ? 'Buscando...' : '¿Qué veo?'}
        </button>
      </div>

      <div className="mt-6">
        {error && !movie && (
          <p className="text-red-500 text-center mt-2">{error}</p>
        )}

        {movie && (
          <div className="w-full mt-3">
            <div className="relative w-full py-20 overflow-hidden">
              <div className="absolute inset-0 -z-10">
                <div
                  className="absolute inset-0 bg-cover bg-center 
                           scale-110 blur-md"
                  style={{ backgroundImage: `url(${backdropMovie})` }}
                />

                <div className="absolute inset-0 bg-black/70" />

                <div
                  className="absolute inset-0 
                              bg-linear-to-b 
                              from-transparent via-black/60 to-black"
                />
              </div>

              <div className="max-w-xl mx-auto px-4 text-center animate-fade-in">
                <h2 className="text-2xl md:text-3xl font-semibold">
                  {movie.title}
                </h2>

                <Link href={`/movie/${movie.id}`}>
                  <Image
                    alt={movie.title || ''}
                    src={
                      movie.poster_path
                        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                        : '/nophoto.avif'
                    }
                    width={250}
                    height={350}
                    className="rounded-2xl mt-6 border border-white/20
                             mx-auto
                             transition-all duration-300
                             hover:scale-105 hover:shadow-2xl"
                  />
                </Link>

                <p className="mt-4 text-gray-300">
                  ⭐ {movie.vote_average.toFixed(1)}
                </p>

                <p className="mt-4 text-gray-400 text-sm leading-relaxed">
                  {movie.overview}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
