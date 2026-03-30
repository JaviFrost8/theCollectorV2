import React, { useState } from 'react';

interface FiltersOptionsProps {
  genre: number | null;
  setGenre: (value: number | null) => void;
  year: number | null;
  setYear: (value: number | null) => void;
  rating: number | null;
  setRating: (value: number | null) => void;
}

export const FiltersOptions = ({
  genre,
  setGenre,
  year,
  setYear,
  rating,
  setRating,
}: FiltersOptionsProps) => {
  return (
    <div
      className="mt-6 w-full max-w-xl bg-[#0f172a]/60 backdrop-blur-xl 
                border border-white/10 rounded-2xl p-5 shadow-xl"
    >
      <div className="flex flex-col md:flex-row gap-4 w-full max-w-4xl">
        <div className="flex flex-col flex-1">
          <label className="mb-1 text-sm text-gray-300" htmlFor="genreSelect">
            Género:
          </label>
          <select
            id="genreSelect"
            name="genre"
            value={genre ?? ''}
            onChange={(e) =>
              setGenre(e.target.value ? Number(e.target.value) : null)
            }
            className="w-full p-3 rounded-xl bg-[#101722] text-white 
                   focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Todos</option>
            <option value={28}>Acción</option>
            <option value={12}>Aventura</option>
            <option value={16}>Animación</option>
            <option value={35}>Comedia</option>
            <option value={80}>Crimen</option>
            <option value={99}>Documental</option>
            <option value={18}>Drama</option>
            <option value={10751}>Familia</option>
            <option value={14}>Fantasia</option>
            <option value={36}>Historia</option>
            <option value={27}>Terror</option>
            <option value={10402}>Música</option>
            <option value={9648}>Misterio</option>
            <option value={10749}>Romance</option>
            <option value={878}>Ciencia Ficción</option>
            <option value={10770}>Película TV</option>
            <option value={53}>Thriller</option>
            <option value={10752}>Bélica</option>
            <option value={37}>Western</option>
          </select>
        </div>
        <div className="flex flex-col flex-1">
          <label className="mb-1 text-sm text-gray-300" htmlFor="yearInput">
            Década:
          </label>
          <select
            id="yearInput"
            name="year"
            value={year ?? ''}
            onChange={(e) =>
              setYear(e.target.value ? Number(e.target.value) : null)
            }
            className="w-full p-3 rounded-xl bg-[#101722] text-white 
                   focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Todos</option>
            <option value="1910">1910s</option>
            <option value="1920">1920s</option>
            <option value="1930">1930s</option>
            <option value="1940">1940s</option>
            <option value="1950">1950s</option>
            <option value="1960">1960s</option>
            <option value="1970">1970s</option>
            <option value="1980">1980s</option>
            <option value="1990">1990s</option>
            <option value="2000">2000s</option>
            <option value="2010">2010s</option>
            <option value="2020">2020s</option>
          </select>
        </div>
        <div className="flex flex-col flex-1">
          <label className="mb-1 text-sm text-gray-300" htmlFor="ratingSelect">
            Nota mínima:
          </label>
          <select
            id="ratingSelect"
            value={rating ?? ''}
            onChange={(e) =>
              setRating(e.target.value ? Number(e.target.value) : null)
            }
            className="w-full p-3 rounded-xl bg-[#101722] text-white 
                   focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Todos</option>
            <option value="5">5+</option>
            <option value="6">6+</option>
            <option value="7">7+</option>
            <option value="8">8+</option>
          </select>
        </div>
      </div>
    </div>
  );
};
