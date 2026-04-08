import { UserMovie } from '../firebase/movies';
import { OrderOption } from './CollectionContent';

interface Props {
  inputText: string;
  optionValue: 'title' | 'year' | 'price';
  onSearchChange: (
    inputText: string,
    optionText: 'title' | 'year' | 'price',
  ) => void;
  movies: UserMovie[];
}

export const SearchMovieCollection = ({
  onSearchChange,
  inputText,
  optionValue,
  movies,
}: Props) => {
  const moviesWithoutPrice = movies.filter((movie) => movie.price == null);

  return (
    <form className="flex flex-col sm:flex-row sm:justify-between w-full gap-3 mt-6">
      <input
        type="text"
        value={inputText}
        onChange={(e) => onSearchChange(e.target.value, optionValue)}
        placeholder="Buscar por título"
        className="w-full bg-[#232f48] p-3 rounded-md focus:outline-none"
      />

      <select
        value={optionValue}
        onChange={(e) =>
          onSearchChange(inputText, e.target.value as OrderOption)
        }
        className="bg-[#232f48] p-3 rounded-md focus:outline-none cursor-pointer"
        id="movies"
        name="movies"
      >
        <option value="title">Ordenar por: Título (A-Z)</option>
        <option value="year">Ordenar por: Año</option>
        <option value="price" disabled={moviesWithoutPrice.length === 0}>
          Ver películas sin precio
        </option>
      </select>
    </form>
  );
};
