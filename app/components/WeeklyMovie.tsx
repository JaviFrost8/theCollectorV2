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
      <div className="flex flex-col items-center md:flex-row gap-4">
        <div className="flex justify-center w-full md:w-[20%] min-w-[230] md:min-w-[150] md:min-h-[225] md:mr-4">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className=" w-[80%] md:w-full h-full border-2 border-[#48597e] object-cover rounded-md"
          />
        </div>

        <div className="flex flex-col items-center md:items-start w-full md:w-[70%] gap-2 justify-center">
          <h2 className="text-xl md:text-3xl mb-2">{movie.title}</h2>

          <div className="flex flex-col md:flex-row gap-1">
            {movie.genres.map((genre: Genre) => (
              <span
                className="bg-black/30 text-center px-2 md:px-3 rounded-md text-sm"
                key={genre.id}
              >
                {genre.name}
              </span>
            ))}
          </div>
          <p className="mt-3 text-center md:text-start">
            {movie.overview.length > 300
              ? movie.overview.slice(0, 300).trimEnd() + '...'
              : movie.overview}
          </p>

          <Link
            href={`/movie/${movie.id}`}
            className="w-fit inline-flex items-center gap-2 bg-white text-black px-4 py-2 rounded-md mt-3 text-sm font-semibold hover:bg-blue-600 hover:text-white transition-colors"
          >
            ▶ Ver detalles
          </Link>
        </div>
      </div>
    </>
  );
}
