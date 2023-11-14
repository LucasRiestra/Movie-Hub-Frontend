import React, { useEffect, useState } from 'react';
import './Home.css';
import Header from '../Header/Header';
import { Link } from 'react-router-dom';

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

const Home: React.FC = () => {
  const [moviesData, setMoviesData] = useState<Movie[]>([]);

  useEffect(() => {
    // Realizar la solicitud a la API
    fetch('http://localhost:4001/movie') 
      .then((response) => response.json())
      .then((data) => setMoviesData(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
    <div>
      <Header />
      <h1 className="home-title">List Of Movies</h1>
      <div className="list-of-movies">
        <section className="movie-grid">
          {moviesData.map((movie) => (
            <Link to={`/movie/${movie.id}`} key={movie.id} className="movie-link">
              <div key={movie.id} className="movie-card">
                <img src={movie.poster_image} alt={movie.name} className="movie-poster" />
                <h2>{movie.name}</h2>
                <p>IMDb {movie.score}</p>
                <p>
                  {movie.genres.map((genreObj, index) => (
                  <span key={index}>
                  {typeof genreObj === 'string' ? genreObj : (genreObj.genre && genreObj.genre.name) || ''}
                  {index < movie.genres.length - 1 ? ', ' : ''}
                  </span>
                    ))}
                </p>    

              </div>
            </Link>
          ))}
        </section>
      </div>
    </div>
  );
};

export default Home;
