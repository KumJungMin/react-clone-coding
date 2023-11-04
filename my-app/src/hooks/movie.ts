import { useQuery } from "react-query";
import { getMovies } from "../apis/movie";
import type { IMoviesResult, IMovie } from "../apis/movie";

interface ISelectFn {
  (data: IMoviesResult): IMovie[];
}

export function useMovies({ select }: { select?: ISelectFn }) {
  const { data, isLoading } = useQuery<IMoviesResult>(
    ["movies", "nowPlaying"],
    getMovies
  );
  const selectedData = select && data ? select(data) : data?.results || [];
  return { data: selectedData, isLoading };
}
