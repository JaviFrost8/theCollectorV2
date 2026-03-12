'use client';

import { useContextAuth } from '@/context/AuthContext';
import { useUserMovies } from './hooks/useUserMovies';
import {
  calculateAverageRating,
  calculateDurationTotal,
  calculatePrices,
} from './utils/movieStats';
import GenreDonutChart from './components/GenreDonutChart';
import { WeeklyMovie } from './components/WeeklyMovie';
import { RecentMovies } from './components/RecentMovies';

export default function Home() {
  const { user, genreStats } = useContextAuth();
  const { movies } = useUserMovies(user?.uid);
  const moviesWithoutPrice = movies.filter((movie) => movie.price === null);

  return (
    <div className="grid grid-cols-12 m-12 gap-4">
      <div className="flex flex-col justify-center bg-[#232F48] border border-[#48597e] col-span-3 p-3 rounded-md gap-1.5">
        <span className="text-gray-400">Total de películas</span>
        <div className="flex gap-2">
          <span className="text-3xl">{movies?.length ?? 0}</span>{' '}
          <span className="flex items-end pb-1 text-green-600 text-sm">
            +12 este mes
          </span>
        </div>
      </div>
      <div className="flex flex-col justify-center bg-[#232F48] border border-[#48597e] col-span-3 p-3 rounded-md gap-1.5">
        <span className="text-gray-400">Valor estimado</span>
        <div>
          <span className="text-3xl">
            {calculatePrices(movies).toFixed(2)}€
          </span>
          {moviesWithoutPrice.length !== 0 ? (
            <span className="text-amber-600 ml-2 text-sm">
              {moviesWithoutPrice.length} sin precio
            </span>
          ) : (
            ''
          )}
        </div>
      </div>
      <div className="flex flex-col justify-center bg-[#232F48] border border-[#48597e] col-span-3 p-3 rounded-md gap-1.5">
        <span className="text-gray-400">Duración total</span>
        <span className="text-3xl">{calculateDurationTotal(movies)}</span>
      </div>
      <div className="flex flex-col justify-center bg-[#232F48] border border-[#48597e] col-span-3 p-3 rounded-md gap-1.5">
        <span className="text-gray-400">Puntuación media</span>
        <span className="text-3xl">{calculateAverageRating(movies)}</span>
      </div>
      <div className="flex flex-col justify-center bg-[#232F48] border border-[#48597e] col-span-4 p-3 rounded-md gap-1.5 min-h-[350]">
        <span className="text-gray-400">Géneros destacados</span>
        {genreStats.length > 0 ? (
          <GenreDonutChart data={genreStats} />
        ) : (
          <span>Sin datos</span>
        )}
      </div>
      <div className="flex flex-col bg-[#232F48] border border-[#48597e] col-span-8 p-3 rounded-md gap-3">
        <h1 className="text-gray-400">Película de la semana</h1>
        <WeeklyMovie />
      </div>
      <div className="flex flex-col bg-[#232F48] border border-[#48597e] col-span-12 p-3 rounded-md gap-3 min-h-[350]">
        <h1 className="mb-3 col-span-12 text-xl text-gray-400">
          Últimas añadidas
        </h1>
        <RecentMovies uid={user?.uid} />
      </div>
    </div>
  );
}
