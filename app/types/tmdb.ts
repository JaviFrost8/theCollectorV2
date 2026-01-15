export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  release_date: string;
  vote_average: number;
  backdrop_path: string;
}

export interface Actor {
  id: number;
  name: string;
  profile_path: string;
}

export interface Genre {
  id: number;
  name: string;
}

export interface Person {
  id: number;
  known_for_department: string;
  name: string;
  profile_path?: string;
  character?: string;
}
