import { fetchSearchMovie } from '@/lib/tmdb';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const genre = searchParams.get('genre')
      ? Number(searchParams.get('genre'))
      : null;
    const year = searchParams.get('year')
      ? Number(searchParams.get('year'))
      : null;
    const rating = searchParams.get('rating')
      ? Number(searchParams.get('rating'))
      : null;

    const movie = await fetchSearchMovie(genre, year, rating);

    return NextResponse.json(movie);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: 'Error fetching movie' },
      { status: 500 },
    );
  }
}
