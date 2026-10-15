export interface Film {
  kinopoiskId: number;
  nameRu: string | null;
  nameEn: string | null;
  nameOriginal: string | null;
  posterUrl: string;
  posterUrlPreview: string;
  ratingKinopoisk: number | null;
  ratingImdb: number | null;
  year: number | null;
  type: string;
  genres: { genre: string }[];
  countries: { country: string }[];
}

export interface FilmDetail extends Film {
  coverUrl: string | null;
  description: string | null;
  shortDescription: string | null;
  slogan: string | null;
  ratingAgeLimits: string | null;
  ratingKinopoiskVoteCount: number;
}

export interface FilmList {
  total: number;
  totalPages: number;
  items: Film[];
}
