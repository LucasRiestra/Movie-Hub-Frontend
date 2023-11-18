import React, {  useEffect, useState } from 'react';
import './Home.css';
import Header from '../Header/Header';
import { Link } from 'react-router-dom';
import Footer from '../Footer/Footer';
import { useAuth0 } from '@auth0/auth0-react';
import UpdateMovieModal from './UpdateMovieModal';
import { MovieData } from './UpdateMovieModal';
import { useUserContext } from '../../utils/useUserContext';
import { createUser, getUserByEmail } from '../../Services/user.services';
import { UserType } from '../../Context/user.context';

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
  const { user, getAccessTokenSilently } = useAuth0();
  const [moviesData, setMoviesData] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const { setCurrentLoggedUser } = useUserContext();
  const [auth0User, setAuth0User] = useState<any>(null);

  useEffect(() => {
    (async function fetchUserData() {
      try {
        if (user?.email) {
          const userEmail = user.email;
          const userData = await getUserByEmail(getAccessTokenSilently, userEmail);
          setCurrentLoggedUser(userData as UserType);
          setAuth0User(user);

          const userId = userData.id;

          const token = await getAccessTokenSilently();
          const response = await fetch(`${import.meta.env.VITE_API_URL}movie/user/${userId}`, {
            method: "GET",
            headers: {
              authorization: `Bearer ${token}`,
              "Content-type": "application/json; charset=UTF-8"
            }
          });

          if (response.ok) {
            const userMovies = await response.json();
            setMoviesData(userMovies);
            console.log('Movies Data:', userMovies);
          } else {
            console.error(`Error fetching user movies: ${response.statusText}`);
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    })();
  }, [user]);

  console.log('auth0User in Home:', auth0User);
  console.log('user in Home:', user);

  const handleDelete = async (movieId: number) => {
    try {
      const token = await getAccessTokenSilently();
      const response = await fetch(`${import.meta.env.VITE_API_URL}movie/${movieId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setMoviesData((prevMovies) => prevMovies.filter((movie) => movie.id !== movieId));
      } else {
        console.error('Error deleting movie:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting movie:', error);
    }
  };

  const handleUpdate = (movieId: number) => {
    const movieToUpdate = moviesData.find((movie) => movie.id === movieId);
    if (movieToUpdate) {
      setSelectedMovie(movieToUpdate);
      setIsUpdateModalOpen(true);
    }
  };

  const handleUpdateModalClose = () => {
    setIsUpdateModalOpen(false);
    setSelectedMovie(null);
  };

  const handleUpdateMovie = (updatedMovieData: MovieData | Movie | null) => {
    
    if (updatedMovieData && 'id' in updatedMovieData) {
      console.log('Updating movie:', updatedMovieData);
    } else {
      console.log('Movie update canceled.');
    }
  };

  return (
    <div>
      <Header />
      <h1 className="home-title">List Of Movies</h1>
      <div className="list-of-movies">
        <section className="movie-grid">
          {moviesData.length > 0 ? (
            moviesData.map((movie) => (
              <div key={movie.id} className="movie-card">
                <Link to={`/movie/${movie.id}`} className="movie-link">
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
                </Link>
                <div className='update-and-delete-buttons'>
                  <button className='update-button' onClick={() => handleDelete(movie.id)}>
                    Delete
                  </button>
                  <button className='update-button' onClick={() => handleUpdate(movie.id)}>
                    Update
                  </button>
                </div>
              </div>
            ))
          ) : (
            <h3>No movies available. Add your favorite movies, please!</h3>
          )}
        </section>
      </div>
      <Footer />
      {isUpdateModalOpen && (
        <UpdateMovieModal
        isOpen={isUpdateModalOpen}
        onRequestClose={handleUpdateModalClose}
        onCloseAndUpdateMovie={handleUpdateMovie}
        initialMovieData={selectedMovie ? {
          name: selectedMovie.name,
          poster_image: selectedMovie.poster_image,
          score: selectedMovie.score,
          genres: selectedMovie.genres.map(genre => genre.genre.name),
        } : {
          name: '',
          poster_image: '',
          score: '',
          genres: [],
        }}
        selectedMovie={selectedMovie}
      />
      )}
    </div>
  );
};

export default Home;
