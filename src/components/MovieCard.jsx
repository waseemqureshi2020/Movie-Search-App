import React from 'react';

function MovieCard({ movie }) {
  // OMDb returns "N/A" for missing posters, so we handle that
  const posterUrl = movie.Poster !== 'N/A' 
    ? movie.Poster 
    : 'https://via.placeholder.com/300x450?text=No+Poster';

  return (
    <div className="movie-card">
      <img src={posterUrl} alt={`${movie.Title} poster`} />
      <div className="movie-info">
        <h3>{movie.Title}</h3>
        <span>{movie.Year}</span>
        <span className="movie-type">{movie.Type}</span>
      </div>
    </div>
  );
}

export default MovieCard;