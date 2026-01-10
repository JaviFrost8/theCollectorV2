import { getMovie, getMovieCredits } from '@/lib/tmdb';

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

  return (
    <div>
      <div
        className="w-full h-[400] bg-cover bg-center relative"
        style={{ backgroundImage: `url(${backdropMovie})` }}
      ></div>
      <div className="flex justify-center">
        <h1 className="text-white">{movie.title}</h1>
      </div>
    </div>
  );
}
