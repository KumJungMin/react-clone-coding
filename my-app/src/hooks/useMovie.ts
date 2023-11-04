import { useQuery } from "react-query";
import { getMovies } from "../apis/movie";

export function useMovies() {
  const { data, isLoading } = useQuery("movies", getMovies);
  return { data, isLoading };
}
