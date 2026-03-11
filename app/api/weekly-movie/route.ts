import { weeklyMovie } from '@/lib/weeklyMovie';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const movie = await weeklyMovie();
    return NextResponse.json(movie);
  } catch (err) {
    return NextResponse.json(
      { error: 'Error fetching weekly movie' },
      { status: 500 },
    );
  }
}
