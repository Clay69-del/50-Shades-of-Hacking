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
  country_standing?: {
    country: string;
    teams_listed: number;
    country_place: number;
    global_place: number;
    points: number;
    events: number;
    next_target: {
      team_name: string;
      country_place: number;
      points_delta: number;
    } | null;
  } | null;
}
