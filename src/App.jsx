import { useState } from 'react'
import { Alert, AlertDescription } from '@/components/ui/alert.jsx'
import SearchBar from './components/SearchBar'
import MovieCard from './components/MovieCard'
import MovieDetails from './components/MovieDetails'
import LoadingSpinner from './components/LoadingSpinner'
import { searchMovies, getMovieDetails } from './services/omdbApi'
import { Film, AlertCircle } from 'lucide-react'
import './App.css'
import { useEffect } from 'react'

function App() {
  const [movies, setMovies] = useState([])
  const [selectedMovie, setSelectedMovie] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = async (query) => {
    setLoading(true)
    setError('')
    setSelectedMovie(null)
    setSearchQuery(query)

    try {
      const data = await searchMovies(query)
      setMovies(data.Search || [])
    } catch (err) {
      setError(err.message || 'Failed to search movies')
      setMovies([])
    } finally {
      setLoading(false)
    }
  }

  const handleViewDetails = async (imdbId) => {
    setLoading(true)
    setError('')

    try {
      const movieDetails = await getMovieDetails(imdbId)
      setSelectedMovie(movieDetails)
    } catch (err) {
      setError(err.message || 'Failed to get movie details')
    } finally {
      setLoading(false)
    }
  }

  const handleBackToSearch = () => {
    setSelectedMovie(null)
  }

  useEffect(() => {
    console.log(movies)
  }, movies)

  return (
    <div className="min-h-screen gradient-bg flex flex-col justify-between">
      <div>
        <header className="border-b glass-effect relative z-[50]">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center justify-center gap-2 mb-6 slide-up">
              <Film className="h-8 w-8 text-primary" />
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Movie Download Tool
              </h1>
            </div>

            {!selectedMovie && (
              <div className="fade-in">
                <SearchBar onSearch={handleSearch} loading={loading} setMovies={setMovies} />
              </div>
            )}
          </div>
        </header>


        <main className="container mx-auto px-4 py-8">

          {error && (
            <div className="fade-in">
              <Alert variant="destructive" className="mb-6">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            </div>
          )}


          {loading && (
            <div className="fade-in">
              <LoadingSpinner
                message={selectedMovie ? 'Loading movie details...' : 'Searching movies...'}
              />
            </div>
          )}


          {selectedMovie && !loading && (
            <div className="slide-up">
              <MovieDetails
                movie={selectedMovie}
                onBack={handleBackToSearch}
              />
            </div>
          )}


          {!selectedMovie && !loading && movies.length > 0 && (
            <div className="fade-in">
              <h2 className="text-2xl font-semibold mb-6">
                Search Results for "{searchQuery}"
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {movies.map((movie, index) => (
                  <div
                    key={movie.imdbID}
                    className="fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <MovieCard
                      movie={movie}
                      onViewDetails={handleViewDetails}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}


          {!selectedMovie && !loading && searchQuery && movies.length === 0 && !error && (
            <div className="text-center py-12 fade-in">
              <Film className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No movies found</h3>
              <p className="text-muted-foreground">
                Try searching with a different title or check your spelling.
              </p>
            </div>
          )}


          {!selectedMovie && !loading && !searchQuery && (
            <div className="text-center py-12 slide-up">
              <Film className="h-24 w-24 text-muted-foreground mx-auto mb-6" />
              <h2 className="text-2xl font-semibold mb-4">Welcome to Movie Download Tool</h2>
              <p className="text-muted-foreground max-w-md mx-auto">
                Search for your favorite movies to view details and find download or streaming options.
                Use the search bar above to get started.
              </p>
            </div>
          )}
        </main>
      </div>
      <div>

        <footer className="border-t glass-effect mt-12">
          <div className="container mx-auto px-4 py-6 text-center text-muted-foreground">
            <p>Movie data provided by OMDb API. Made By Rajnish Puri</p>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default App

