import axios from 'axios';

/* genre */
export const getMovieGenres = async () => {
  try {
    const result = await axios.get("genre/movie/list");
    return result;
  } catch (error) {
    console.log("getMovieGenres-catch exception:", error.message);
  }
}

export const getTvGenres = async () => {
  try {
    const result = await axios.get("genre/tv/list");
    return result;
  } catch (error) {
    console.log("getTvGenres-catch exception:", error.message);
  }
}

/* movie */
export const getNowPlayling = async () => {
  try {
    const result = await axios.get("movie/now_playing");
    return result;
  } catch (error) {
    console.log("getNowPlayling-catch exception:", error.message);
  }
}

export const getMovieDetails = async (movie_id) => {
  try {
    const result = await axios.get(`movie/${movie_id}`);
    return result;
  } catch (error) {
    console.log("getMovieDetails-catch exception:", error.message);
  }
}

export const getMovieVideos = async (movie_id) => {
  try {    
    const result = await axios.get(`movie/${movie_id}/videos`);
    return result;
  } catch (error) {
    console.log("getMovieVideos-catch exception:", error.message);
  }
}