import { useState, useEffect } from 'react';
import MovieCard from './components/MovieCard';
import './App.css';

// Replace this with the API key from your email
const API_KEY = 'e6b92c2f'; 
const API_URL = 'https://www.omdbapi.com/';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Function to fetch movies
  const searchMovies = async (title) => {
    if (!title) return;
    
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch(`${API_URL}?apikey=${API_KEY}&s=${title}`);
      const data = await response.json();

      if (data.Response === 'True') {
        setMovies(data.Search);
      } else {
        setMovies([]);
        setError(data.Error); // e.g., "Movie not found!"
      }
    } catch (err) {
      setError('Failed to fetch data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    searchMovies(searchTerm);
  };

  return (
    <div className="app-container">
      <header>
        <h1>🎬 Movie Search</h1>
        <form onSubmit={handleSubmit} className="search-form">
          <input 
            type="text" 
            placeholder="Search for a movie (e.g., Batman)..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>
      </header>

      <main>
        {loading && <div className="loading-spinner">Loading...</div>}
        
        {error && <div className="error-message">{error}</div>}

        {!loading && !error && movies.length > 0 && (
          <div className="movies-grid">
            {movies.map((movie) => (
              <MovieCard key={movie.imdbID} movie={movie} />
            ))}
          </div>
        )}

        {!loading && !error && movies.length === 0 && (
          <p className="empty-state">Search for a movie to get started.</p>
        )}
      </main>
    </div>
  );
}

export default App;