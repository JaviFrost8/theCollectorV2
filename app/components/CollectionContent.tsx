'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useUserMovies } from '../hooks/useUserMovies';
import { removeMovieFromUser, UserMovie } from '../firebase/movies';
import { SearchMovieCollection } from './SearchMovieCollection';
import { useMemo, useState } from 'react';
import EditMovieModal from './EditMovieModal';

interface Props {
  uid: string;
}

export type OrderOption = 'title' | 'year';

export const CollectionContent = ({ uid }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<UserMovie | null>(null);
  const { movies, loading } = useUserMovies(uid);
  const [inputText, setInputText] = useState<string>('');
  const [optionValue, setOptionValue] = useState<OrderOption>('title');

  const moviesProcessed = useMemo(() => {
    if (loading) return [];

    const getYear = (date: string) => Number(date.slice(0, 4));

    const filtered = movies.filter((movie) =>
      movie.title.toLowerCase().includes(inputText.toLowerCase().trim()),
    );

    return [...filtered].sort((a, b) => {
      if (optionValue === 'year') {
        return getYear(b.releaseDate) - getYear(a.releaseDate);
      }

      return a.title.localeCompare(b.title);
    });
  }, [movies, inputText, optionValue, loading]);

  if (loading) {
    return <p className="flex justify-center">Cargando colección...</p>;
  }

  if (movies.length === 0) {
    return (
      <p className="flex justify-center">Aún no has añadido ninguna película</p>
    );
  }

  function onSearchChange(searchText: string, option: OrderOption) {
    setInputText(searchText);
    setOptionValue(option);
  }

  return (
    <div className="flex flex-col m-10">
      <EditMovieModal
        uid={uid}
        isOpen={isModalOpen}
        movie={selectedMovie}
        onClose={() => setIsModalOpen(false)}
      />
      <div className="flex flex-col">
        <h1 className="text-4xl">Mi colección</h1>
        <h2 className="text-gray-400">
          {movies.length > 1
            ? `Gestionando ${movies.length} títulos de tu filmoteca`
            : ''}
        </h2>
        <div className="border-b border-[#232f48] mt-4"></div>

        <SearchMovieCollection
          inputText={inputText}
          optionValue={optionValue}
          onSearchChange={onSearchChange}
        />
      </div>
      {/*Aquí empieza el wrap para las películas*/}
      <div className="flex flex-wrap justify-center gap-5 mt-6">
        {moviesProcessed.map((movie: UserMovie) => (
          <div key={movie.tmdbId} className="min-w-[200]">
            <Link href={`/movie/${movie.tmdbId}`}>
              <div className="relative min-h-[300] w-full overflow-hidden">
                {movie.price === null ? (
                  <span className="absolute bottom-1 left-1 flex items-center p-1 z-1 text-sm bg-amber-600 rounded-md text-black font-bold">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
                      />
                    </svg>
                    <span className="ml-1">Falta precio</span>
                  </span>
                ) : (
                  ''
                )}
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
            </Link>
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
                <div className="flex">
                  <span
                    className="cursor-pointer"
                    onClick={() => {
                      setSelectedMovie(movie);
                      setIsModalOpen(true);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                      />
                    </svg>
                  </span>
                  <span
                    className="cursor-pointer"
                    onClick={() => removeMovieFromUser(uid, movie.tmdbId)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                      />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
