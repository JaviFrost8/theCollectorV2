'use client';

import { useState } from 'react';
import { FiltersOptions } from '../components/FiltersOptions';
import { fetchSearchMovie } from '@/lib/tmdb';
import Image from 'next/image';
import Link from 'next/link';

interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  vote_average: number;
}

export default function FavoritesPage() {
  const [genre, setGenre] = useState<number | null>(null);
  const [year, setYear] = useState<number | null>(null);
  const [rating, setRating] = useState<number | null>(null);
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

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
    <div className="flex flex-col">
      <p className="flex pt-3 text-center justify-center">
        ¿Quieres descubrir alguna película? Pulsa el botón "¿Que veo?" y déjanos
        buscar algo por ti.
      </p>
      <FiltersOptions
        genre={genre}
        setGenre={setGenre}
        year={year}
        setYear={setYear}
        rating={rating}
        setRating={setRating}
      />
      <div className="flex flex-col justify-center">
        <button
          disabled={loading}
          className="cursor-pointer text-3xl bg-cyan-600 p-2 rounded-2xl"
          onClick={handleClick}
        >
          ¿Que veo?
        </button>
        {error && !movie && (
          <p className="text-red-500 text-center mt-2">{error}</p>
        )}
        {movie ? (
          <div className="flex flex-col">
            <h2>{movie.title}</h2>
            <Link href={`/movie/${movie.id}`}>
              <Image
                alt={movie.title}
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                width={200}
                height={300}
              />
            </Link>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}
