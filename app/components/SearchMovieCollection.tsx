import { OrderOption } from './CollectionContent';

interface Props {
  inputText: string;
  optionValue: 'title' | 'year';
  onSearchChange: (inputText: string, optionText: 'title' | 'year') => void;
}

export const SearchMovieCollection = ({
  onSearchChange,
  inputText,
  optionValue,
}: Props) => {
  return (
    <form className="flex flex-col sm:flex-row sm:justify-between w-full gap-3 mt-6">
      <input
        type="text"
        value={inputText}
        onChange={(e) => onSearchChange(e.target.value, optionValue)}
        placeholder="Buscar por título, director o año..."
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
      </select>
    </form>
  );
};
