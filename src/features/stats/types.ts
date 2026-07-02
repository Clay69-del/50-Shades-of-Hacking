// src/features/stats/types.ts

export interface YearRating {
  rating_points: number;
  organizer_points: number;
  rating_place: number;
  country_place?: number;
}

export interface CtfTimeTeamData {
  academic: boolean;
  primary_alias: string;
  name: string;
  logo: string;
  id: number;
  country: string;
  aliases: string[];
  rating: {
    [year: string]: YearRating | { country_place: number };
  };
}
