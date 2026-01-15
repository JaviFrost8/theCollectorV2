import { Actor, Genre, Person } from '@/app/types/tmdb';
import { formatRuntime } from '@/lib/formatRuntime';
import { getMovie, getMovieCredits } from '@/lib/tmdb';
import Image from 'next/image';

interface MoviePageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function MoviePage({ params }: MoviePageProps) {
  const { id } = await params;

  const [movie, credits] = await Promise.all([
    getMovie(id),
    getMovieCredits(id),
  ]);

  const backdropMovie = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : '';

  const director = credits.crew.find(
    (person: Person) => person.known_for_department === 'Directing'
  );

  const guionista = credits.crew.find(
    (person: Person) => person.known_for_department === 'Writing'
  );

  return (
    <div className="relative w-full h-screen">
      {/* Fondo */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-40"
        style={{
          backgroundImage: `url(${backdropMovie})`,
          clipPath: 'inset(0 0 50% 0)',
          WebkitClipPath: 'inset(0 0 50% 0)',
        }}
      />

      {/* Contenido principal*/}
      <div className="relative h-full flex flex-col lg:flex-row justify-center items-center px-4 gap-8">
        {/* Sección izquierda: Poster */}
        <div className="relative shrink-0">
          <div className="relative h-[450] w-[300] overflow-hidden border-4 border-[#232F48] rounded-xl">
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
        </div>

        {/* Sección derecha: Información */}
        <div className="flex flex-col max-w-2xl lg:min-h-[800] lg:translate-y-[43.3%]">
          {/* Título y rating en misma línea */}
          <div className="flex flex-col lg:flex-row lg:items-center gap-4 mb-6">
            <h1 className="text-4xl lg:text-5xl font-bold text-white">
              {movie.title}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2 bg-black/30 px-4 py-2 rounded-lg self-start">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="yellow"
                className="icon icon-tabler icons-tabler-filled icon-tabler-star"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M8.243 7.34l-6.38 .925l-.113 .023a1 1 0 0 0 -.44 1.684l4.622 4.499l-1.09 6.355l-.013 .11a1 1 0 0 0 1.464 .944l5.706 -3l5.693 3l.1 .046a1 1 0 0 0 1.352 -1.1l-1.091 -6.355l4.624 -4.5l.078 -.085a1 1 0 0 0 -.633 -1.62l-6.38 -.926l-2.852 -5.78a1 1 0 0 0 -1.794 0l-2.853 5.78z" />
              </svg>
              <span className="text-white text-xl font-semibold">
                {movie.vote_average.toFixed(1)}
              </span>
            </div>
          </div>
          <div className="mb-3">
            {movie.genres.map((genre: Genre) => (
              <span className="bg-black/30 p-1 rounded-sm mr-3" key={genre.id}>
                {genre.name}
              </span>
            ))}
            <span className="bg-black/30 p-1 rounded-sm mr-3">
              {movie.release_date.slice(0, 4)}
            </span>
            <span className="bg-black/30 p-1 rounded-sm mr-3">
              {formatRuntime(movie.runtime)}
            </span>
          </div>

          {/* Más información de la película*/}
          <div>
            <h1 className="text-2xl my-2">
              {movie.overview ? 'Sinopsis' : ''}
            </h1>
            <p className="text-gray-200 text-lg mb-4">{movie.overview}</p>
            <div className="flex mt-5">
              <span className="text-gray-500">DIRECTOR</span>
              <span className="ml-2">
                {director ? director.name : 'Desconocido'}
              </span>
            </div>
            {guionista ? (
              <div className="flex">
                <span className="text-gray-500">ESCRITOR</span>
                <span className="ml-2">
                  {guionista ? guionista.name : 'Desconocido'}
                </span>
              </div>
            ) : (
              ''
            )}
            <div className="flex my-7">
              {credits.cast
                .map((person: Person) => (
                  <div className="flex flex-col h-[200]" key={person.id}>
                    <div className="flex mr-7 w-[100] h-[100]">
                      <Image
                        src={
                          person.profile_path
                            ? `https://image.tmdb.org/t/p/w185${person.profile_path}`
                            : '/nophoto.avif'
                        }
                        alt={person.name}
                        width={100}
                        height={100}
                        className=" object-cover rounded-xl"
                      />
                    </div>

                    <div className="flex flex-col">
                      <span>
                        {person.name.length <= 11
                          ? person.name
                          : person.name.slice(0, 11) + '...'}
                      </span>
                      <span className="text-sm text-gray-500">
                        {person.character && person.character.length > 14
                          ? person.character.slice(0, 14) + '...'
                          : person.character}
                      </span>
                    </div>
                  </div>
                ))
                .slice(0, 5)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
