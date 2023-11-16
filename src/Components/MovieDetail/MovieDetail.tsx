import React, { useEffect, useState } from 'react';
import './MovieDetail.css';
import Header from '../Header/Header';
import { Link, useParams } from 'react-router-dom';
import Footer from '../Footer/Footer';

interface Genre {
  genre: {
    name: string;
    id: string;
  };
}

interface Movie {
  id: number;
  name: string;
  poster_image: string;
  score: string;
  genres: Genre[];
}

const MovieDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_MOVIE_URL}/${id}`)
      .then((response) => response.json())
      .then((data) => setMovie(data))
      .catch((error) => console.error('Error fetching movie details:', error));
  }, [id]);

  if (!movie) {
    return <div>Loading...</div>;
  }
  console.log(movie);
  
  return (
    <div className="movie-detail-container">
      <Header />
      <div className="movie-detail-content">
        <img className="movie-detail-img" src={movie.poster_image} alt={movie.name} />
        <h1>{movie.name}</h1>
        <p>IMDb {movie.score}</p>
        <p>
          {movie.genres.map((genreObj, index) => (
            <span key={index}>
              {genreObj.genre ? genreObj.genre.name : ''}
              {index < movie.genres.length - 1 ? ', ' : ''}
            </span>
          ))}
        </p>
        <div>
          <Link to="/home">
            <button className="button-go-back">Go Back</button>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MovieDetail;
