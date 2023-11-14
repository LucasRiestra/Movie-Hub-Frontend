import React from 'react';
import { useParams } from 'react-router-dom';
import "./MovieDetail.css"
import { Link } from 'react-router-dom';

interface Movie {
  id: number;
  name: string;
  poster_image: string;
  score: string;
  genre: string;
}

const moviesData: Movie[] = [
    {
      id: 1,
      name: 'Película 1',
      poster_image: "https://cl.buscafs.com/www.tomatazos.com/public/uploads/images/170592/170592.jpg",
      score: "80/100",
      genre: "Action, Adventures, Drama",
    },
    {
      id: 2,
      name: 'Película 2',
      poster_image: "https://static.posters.cz/image/350/posters/pulp-fiction-cover-i1288.jpg",
      score: "80/100",
      genre: "Action, Adventures, Drama",
    },
    {
      id: 3,
      name: 'Película 3',
      poster_image: 'https://www.mubis.es/media/users/2514/306037/te-gustan-las-peliculas-de-terror-poster-de-scream-la-original-l_cover.jpg',
      score: "80/100",
      genre: "Action, Adventures, Drama",
    },
    {
      id: 4,
      name: 'Película 4',
      poster_image: 'https://www.posterscine.com/media/catalog/product/cache/1c91d037a1f0ef180108abb0973795cc/o/p/oppenheimer_poster.png',
      score: "80/100",
      genre: "Action, Adventures, Drama",
    },
  ];

const MovieDetail: React.FC = () => {
  const { id } = useParams();
  const movie = moviesData.find((movie) => String(movie.id) === id);

  if (!movie) {
    return <div>No se encontró la película</div>;
  }

  return (
    <div className="movie-detail-container">
      <div className="movie-detail-content">
        <h2>{movie.name}</h2>
        <img className="movie-detail-img" src={movie.poster_image} alt={movie.name} />
        <p>IMDb {movie.score}</p>
        <p>{movie.genre}</p>

        <div>
      <Link to="/home">
          <button className="button-go-back">Go Back</button>
        </Link>
        </div>
      </div>      
    </div>
    
  );
};

export default MovieDetail;
