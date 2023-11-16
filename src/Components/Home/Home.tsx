import React, { useEffect, useState } from 'react';
import './Home.css';
import Header from '../Header/Header';
import { Link } from 'react-router-dom';
import Footer from '../Footer/Footer';
import { useAuth0 } from '@auth0/auth0-react';

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
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [moviesData, setMoviesData] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (isAuthenticated && user) {
        try {
          const token = await getAccessTokenSilently();
          const response = await fetch(`${import.meta.env.VITE_API_URL}movie`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const data = await response.json();
          setMoviesData(data);
        } catch (error) {
          console.error('Error fetching user movies:', error);
        }
      }
    };

    fetchData();
  }, [isAuthenticated, user, getAccessTokenSilently]);

  return (
    <div>
      <Header />
      <h1 className="home-title">List Of Movies</h1>
      <div className="list-of-movies">
        <section className="movie-grid">
          {moviesData.length > 0 ? (
            moviesData.map((movie) => (
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
            ))
          ) : (
            <h3>No movies available. Add your favorite movies, please!</h3>
          )}
          <div className="movie-buttons">
           
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
