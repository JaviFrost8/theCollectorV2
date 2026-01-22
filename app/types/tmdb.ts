export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  release_date: string;
  vote_average: number;
  genres: Genre[];
  runtime: number;
  backdrop_path: string;
}

export interface Credits {
  cast: Person[];
  crew: Person[];
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

export interface TmdbMovie {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  genres: { id: number; name: string }[];
}
