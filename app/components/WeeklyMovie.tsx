'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface Genre {
  id: number;
  name: string;
}

interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  vote_average: number;
  genres: Genre[];
}

export function WeeklyMovie() {
  const [movie, setMovie] = useState<Movie | null>(null);

  useEffect(() => {
    const loadMovie = async () => {
      const res = await fetch('api/weekly-movie');
      const data = await res.json();
      setMovie(data);
    };

    loadMovie();
  }, []);

  if (!movie) {
    return <p>Cargando película...</p>;
  }

  return (
    <>
      <div className="flex gap-4">
        <div className="w-[20%] min-w-[150] min-h-[225]">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="w-full h-full object-cover rounded-md"
          />
        </div>

        <div className="flex flex-col w-[70%] gap-2 justify-center">
          <h2 className="text-3xl mb-2">{movie.title}</h2>

          <div className="flex gap-1">
            {movie.genres.map((genre: Genre) => (
              <span
                className="bg-black/30 px-3 rounded-md text-sm"
                key={genre.id}
              >
                {genre.name}
              </span>
            ))}
          </div>
          <p className="mt-3">{movie.overview}</p>
          <Link href={`/movie/${movie.id}`}>
            <button className="cursor-pointer bg-white text-black py-2 px-3 rounded-md mt-3 font-semibold text-sm">
              ▶ Ver detalles
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}
