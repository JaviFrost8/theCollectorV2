'use client';

import { Credits, Genre, Movie, Person, TmdbMovie } from '@/app/types/tmdb';
import { useContextAuth } from '@/context/AuthContext';
import { db } from '@/app/firebase/firebaseConfig';
import { formatRuntime } from '@/app/utils/formatRuntime';
import { doc, onSnapshot } from 'firebase/firestore';
import Image from 'next/image';
import { addMovieToUser, removeMovieFromUser } from '../firebase/movies';
import { useEffect, useState } from 'react';

interface MovieInfoProps {
  movie: Movie;
  credits: Credits;
}

export const MovieInfo = ({ movie, credits }: MovieInfoProps) => {
  const director = credits.crew.find(
    (person: Person) => person.known_for_department === 'Directing',
  );

  const guionista = credits.crew.find(
    (person: Person) => person.known_for_department === 'Writing',
  );

  const [inCollection, setInCollection] = useState(false);

  const { user } = useContextAuth();

  async function handleAddMovie() {
    if (!user) {
      alert('Debes iniciar sesión para añadir una película');
      return;
    }

    const tmdbMovie: TmdbMovie = {
      id: movie.id,
      title: movie.title,
      poster_path: movie.poster_path || '',
      release_date: movie.release_date || '',
      vote_average: movie.vote_average,
      runtime: movie.runtime,
      genres: movie.genres,
    };

    await addMovieToUser(user.uid, tmdbMovie);
    alert(`${movie.title} añadida a la colección`);
  }

  async function handleRemoveMovie() {
    if (!user) return;

    await removeMovieFromUser(user.uid, movie.id);
    alert(`${movie.title} eliminada de la colección`);
  }

  useEffect(() => {
    if (!user) return;

    const movieRef = doc(db, 'users', user.uid, 'movies', movie.id.toString());

    const unsubscribe = onSnapshot(movieRef, (docSnap) => {
      setInCollection(docSnap.exists());
    });

    return () => unsubscribe();
  }, [user, movie.id]);

  return (
    <div className="relative flex flex-col lg:flex-row justify-center items-center px-4 gap-8 max-w-7xl mx-auto">
      {/* 🎬 POSTER */}
      <div className="relative shrink-0 translate-y-6 lg:-translate-y-20">
        <div className="relative h-[350] w-[230] sm:h-[450] sm:w-[300] mt-10 lg:mt-30 overflow-hidden border-4 border-[#232F48] rounded-xl">
          <Image
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : '/nophoto.avif'
            }
            alt={movie.title}
            fill
            sizes="(max-width: 768px) 100vw, 300px"
            className="object-cover"
            priority
          />
        </div>

        {!inCollection ? (
          <button
            onClick={handleAddMovie}
            className="w-full p-2 bg-green-900/60 hover:bg-green-800 transition-all duration-100 mt-2 rounded-sm cursor-pointer"
          >
            Añadir a colección
          </button>
        ) : (
          <button
            onClick={handleRemoveMovie}
            className="w-full p-2 bg-red-900/60 hover:bg-red-800 transition-all duration-100 mt-2 rounded-sm cursor-pointer"
          >
            Eliminar de colección
          </button>
        )}
      </div>

      {/* 🧠 INFO */}
      <div className="flex flex-col max-w-2xl w-full lg:mt-[340] lg:translate-y-7">
        {/* 🎯 Título + Rating */}
        <div className="flex flex-col items-center sm:items-start sm:flex-row mt-8 lg:flex-row lg:items-center gap-4 mb-6">
          <h1 className="text-3xl text-center sm:text-start sm:text-4xl lg:text-5xl font-bold text-white">
            {movie.title}
          </h1>

          <div className="flex items-center gap-2 bg-black/30 px-4 py-2 rounded-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="yellow"
            >
              <path d="M8.243 7.34l-6.38 .925a1 1 0 0 0 -.44 1.684l4.622 4.499l-1.09 6.355a1 1 0 0 0 1.464 .944l5.706 -3l5.693 3a1 1 0 0 0 1.352 -1.1l-1.091 -6.355l4.624 -4.5a1 1 0 0 0 -.555 -1.705l-6.38 -.926l-2.852 -5.78a1 1 0 0 0 -1.794 0z" />
            </svg>
            <span className="text-white text-lg sm:text-xl font-semibold">
              {movie.vote_average.toFixed(1)}
            </span>
          </div>
        </div>

        {/* 🏷️ Géneros */}
        <div className="mb-3 justify-center sm:justify-start flex flex-wrap gap-2">
          {movie.genres.map((genre: Genre) => (
            <span className="bg-black/30 p-1 rounded-sm" key={genre.id}>
              {genre.name}
            </span>
          ))}
          <span className="bg-black/30 p-1 rounded-sm">
            {movie.release_date.slice(0, 4)}
          </span>
          <span className="bg-black/30 p-1 rounded-sm">
            {formatRuntime(movie.runtime)}
          </span>
        </div>

        {/* 📖 Sinopsis */}
        <div className="text-center sm:text-start">
          {movie.overview && (
            <h2 className="text-xl sm:text-2xl my-2">Sinopsis</h2>
          )}
          <p className="text-gray-200 text-base sm:text-lg mb-4">
            {movie.overview}
          </p>

          {/* 👨‍🎬 Director */}
          <div className="flex flex-wrap mt-5">
            <span className="text-gray-500">DIRECTOR</span>
            <span className="ml-2">
              {director ? director.name : 'Desconocido'}
            </span>
          </div>

          {/* ✍️ Escritor */}
          {guionista && (
            <div className="flex flex-wrap">
              <span className="text-gray-500">ESCRITOR</span>
              <span className="ml-2">{guionista.name}</span>
            </div>
          )}

          {/* 🎭 CAST */}
          <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-5 overflow-x-auto pb-2 md:mb-16">
            {credits.cast.slice(0, 5).map((person: Person) => (
              <div className="flex flex-col min-w-[100]" key={person.id}>
                <Image
                  src={
                    person.profile_path
                      ? `https://image.tmdb.org/t/p/w185${person.profile_path}`
                      : '/nophoto.avif'
                  }
                  alt={person.name}
                  width={100}
                  height={100}
                  className="object-cover rounded-xl"
                />

                <span className="mt-2 text-sm">
                  {person.name.length <= 11
                    ? person.name
                    : person.name.slice(0, 11) + '...'}
                </span>

                <span className="text-xs text-gray-500">
                  {person.character && person.character.length > 14
                    ? person.character.slice(0, 14) + '...'
                    : person.character}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
