// src/features/stats/types.ts

export interface YearRating {
  rating_points: number;
  organizer_points: number;
  rating_rank: number;
}

export interface CtfTimeTeamData {
  academic: boolean;
  primary_chroot: string;
  logo: string;
  name: string;
  id: number;
  country: string;
  rating: {
    [year: string]: YearRating;
  };
}
