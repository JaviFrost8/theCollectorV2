import { getMovies } from '@/lib/tmdb';
import { Movie } from '../types/tmdb';
import Image from 'next/image';
import { SearchBar } from '../components/SearchBar';
import Link from 'next/link';

interface MoviePageProps {
  searchParams?: Promise<{ search?: string }>;
}

export default async function SearchPage({ searchParams }: MoviePageProps) {
  const params = await searchParams;
  const searchTerm = (params?.search as string) || '';
  const movies = await getMovies(searchTerm);

  return (
    <div key={searchTerm} className="flex justify-center mx-10 flex-wrap gap-5">
      <SearchBar initialSearch={searchTerm} />
      {movies.map((movie: Movie) => (
        <div key={movie.id} className="min-w-[200]">
          <Link href={`/movie/${movie.id}`}>
            <div className="relative min-h-[300] w-full overflow-hidden">
              <Image
                src={
                  !movie.poster_path
                    ? '/nophoto.avif'
                    : `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                }
                alt={movie.title}
                fill
                sizes="(max-width: 768px) 100vw, 500px"
                className="rounded-xl object-cover"
              />
            </div>
            <div className="flex flex-col mt-1.5">
              <p>
                {movie.title.length > 25
                  ? movie.title.slice(0, 25) + '...'
                  : movie.title}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">
                  {movie.release_date.slice(0, 4)}
                </span>
                <span className="flex items-center gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="yellow"
                    className="icon icon-tabler icons-tabler-filled icon-tabler-star"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M8.243 7.34l-6.38 .925l-.113 .023a1 1 0 0 0 -.44 1.684l4.622 4.499l-1.09 6.355l-.013 .11a1 1 0 0 0 1.464 .944l5.706 -3l5.693 3l.1 .046a1 1 0 0 0 1.352 -1.1l-1.091 -6.355l4.624 -4.5l.078 -.085a1 1 0 0 0 -.633 -1.62l-6.38 -.926l-2.852 -5.78a1 1 0 0 0 -1.794 0l-2.853 5.78z" />
                  </svg>
                  <span className="text-gray-400 mt-1 text-base">
                    {movie.vote_average.toFixed(1)}
                  </span>
                </span>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}
