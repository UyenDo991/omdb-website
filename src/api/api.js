import axios from 'axios'

/* genre */
export const getMovieGenres = async () => {
  try {
    const result = await axios.get('genre/movie/list')
    return result
  } catch (error) {
    console.log('getMovieGenres-catch exception:', error.message)
  }
}

export const getTvGenres = async () => {
  try {
    const result = await axios.get('genre/tv/list')
    return result
  } catch (error) {
    console.log('getTvGenres-catch exception:', error.message)
  }
}

/* movie */
export const getNowPlayling = async () => {
  try {
    const result = await axios.get('movie/now_playing')
    return result
  } catch (error) {
    console.log('getNowPlayling-catch exception:', error.message)
  }
}

export const getMovieDetails = async (movie_id) => {
  try {
    const result = await axios.get(`movie/${movie_id}`)
    return result
  } catch (error) {
    console.log('getMovieDetails-catch exception:', error.message)
  }
}

export const getMovieVideos = async (movie_id) => {
  try {
    const result = await axios.get(`movie/${movie_id}/videos`)
    return result
  } catch (error) {
    console.log('getMovieVideos-catch exception:', error.message)
  }
}

export const getMoviePerson = async (movie_id) => {
  try {
    const result = await axios.get(`movie/${movie_id}/credits`)
    return result
  } catch (error) {
    console.log('getMoviePerson-catch exception:', error.message)
  }
}

//Movie upcoming
export const getMovieUpcoming = async (page = 2) => {
  try {
    const result = await axios.get(`movie/upcoming?page=${page}`)
    return result
  } catch (error) {
    console.log('getMovieUpcoming-catch exception:', error.message)
  }
}
//Movie popular
export const getMoviePopular = async (page = 1) => {
  try {
    const result = await axios.get(`movie/popular?page=${page}`)
    return result
  } catch (error) {
    console.log('getMoviePopular-catch exception:', error.message)
  }
}

//List TV trending
export const getMovieTrendingList = async () => {
  try {
    const result = await axios.get('trending/movie/day')
    return result
  } catch (error) {
    console.log('getMovieTrendingList-catch exception:', error.message)
  }
}
//List drama
export const getMovieGenresList = async (genres_id) => {
  try {
    const result = await axios.get(`discover/movie?with_genres=${genres_id}`)
    return result
  } catch (error) {
    console.log('getMovieGenresList-catch exception:', error.message)
  }
}

//List collection Harry Poster id : 1241
export const getCollectionFilmsList = async (collect_id) => {
  try {
    const result = await axios.get(`collection/${collect_id}?sort_by=release_date.asc`)
    return result
  } catch (error) {
    console.log('getCollectionFilmsList-catch exception:', error.message)
  }
}

//Search
export const getSearchData = async (inputSearch) => {
  try {
    const result = await axios.get(`search/movie?query=${inputSearch}`)
    return result
  } catch (error) {
    console.log('getSearchData-catch exception:', error.message)
  }
}
