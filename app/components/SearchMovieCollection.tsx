interface Props {
  inputText: string;
  optionValue: string;
  onSearchChange: (inputText: string, optionText: string) => void;
}

export const SearchMovieCollection = ({
  onSearchChange,
  inputText,
  optionValue,
}: Props) => {
  return (
    <form className="flex justify-between w-full gap-3 mt-6">
      <input
        type="text"
        value={inputText}
        onChange={(e) => onSearchChange(e.target.value, optionValue)}
        placeholder="Buscar por título, director o año..."
        className="w-full bg-[#232f48] p-3 rounded-md focus:outline-none"
      />

      <select
        value={optionValue}
        onChange={(e) => onSearchChange(inputText, e.target.value)}
        className="bg-[#232f48] p-3 rounded-md focus:outline-none"
        id="movies"
        name="movies"
      >
        <option value="title">Ordenar por: Título (A-Z)</option>
        <option value="year">Ordenar por: Año</option>
      </select>
    </form>
  );
};
