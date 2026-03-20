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
    <div className="relative w-full min-h-screen overflow-hidden">
      {/* 🎬 Fondo */}
      {backdropMovie && (
        <div className="absolute inset-0">
          {/* Imagen */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${backdropMovie})` }}
          />

          {/* Oscurecer base */}
          <div className="absolute inset-0 bg-black/50" />

          {/* Gradiente suave (sin cortes) */}
          <div className="absolute inset-0 bg-linear-to-b from-transparent via-black/60 to-black" />
        </div>
      )}

      <div className="relative z-10">
        <MovieInfo movie={movie} credits={credits} />
      </div>
    </div>
  );
}
