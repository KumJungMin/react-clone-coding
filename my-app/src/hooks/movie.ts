import { useQuery } from "react-query";
import { getMovies } from "../apis/movie";
import type { IMoviesResult } from "../apis/movie";

export function useMovies() {
  const { data, isLoading } = useQuery<IMoviesResult>(
    ["movies", "nowPlaying"],
    getMovies
  );
  return { data, isLoading };
}
