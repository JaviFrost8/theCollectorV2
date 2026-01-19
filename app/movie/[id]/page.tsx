import { MovieInfo } from '@/app/components/MovieInfo';
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
      <MovieInfo movie={movie} credits={credits} />
    </div>
  );
}
