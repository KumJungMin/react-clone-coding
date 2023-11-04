const API_KEY = "10923b261ba94d897ac6b81148314a3f";
const BASE_PATH = "https://api.themoviedb.org/3";

export async function getMovies() {
  const data = await fetch(`${BASE_PATH}/movie/now_playing?api_key=${API_KEY}`);
  return data.json();
}
