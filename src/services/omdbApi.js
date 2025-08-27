import { mockMovies, mockMovieDetails } from './mockData.js'

const API_KEY = import.meta.env.VITE_REACT_MOVIE_API_KEY;
const BASE_URL = import.meta.env.VITE_REACT_MOVIE_API_URL;

export const searchMovies = async (query, page = 1) => {
  try {
    const response = await fetch(
      `${BASE_URL}?apikey=${API_KEY}&s=${encodeURIComponent(query)}&page=${page}`
    )

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()

    if (data.Response === 'False') {
      throw new Error(data.Error || 'Search failed')
    }

    return data
  } catch (error) {
    console.error('Error searching movies, using mock data:', error)
    const filteredMovies = mockMovies.filter(movie =>
      movie.Title.toLowerCase().includes(query.toLowerCase())
    )
    return {
      Search: filteredMovies.length > 0 ? filteredMovies : mockMovies,
      totalResults: filteredMovies.length > 0 ? filteredMovies.length.toString() : mockMovies.length.toString(),
      Response: "True"
    }
  }
}


export const getMovieDetails = async (imdbId) => {
  try {
    const response = await fetch(
      `${BASE_URL}?apikey=${API_KEY}&i=${imdbId}&plot=full`
    )

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()

    if (data.Response === 'False') {
      throw new Error(data.Error || 'Failed to get movie details')
    }

    return data
  } catch (error) {
    console.error('Error getting movie details, using mock data:', error)
    return mockMovieDetails[imdbId] || mockMovieDetails["tt1375666"]
  }
}


export const searchMoviesWithFilters = async (query, type = '', year = '') => {
  try {
    let url = `${BASE_URL}?apikey=${API_KEY}&s=${encodeURIComponent(query)}`

    if (type) {
      url += `&type=${type}`
    }

    if (year) {
      url += `&y=${year}`
    }

    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()

    if (data.Response === 'False') {
      throw new Error(data.Error || 'Search failed')
    }

    return data
  } catch (error) {
    console.error('Error searching movies with filters:', error)
    throw error
  }
}

