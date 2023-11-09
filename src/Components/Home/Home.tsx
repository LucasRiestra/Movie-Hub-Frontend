import React from 'react';
import './Home.css';
import Header from "../Header/Header"

interface Movie {
  id: number;
  name: string;
  image: string;
  description: string;
  ranking: string
  category: string
  origin: string
}

const moviesData: Movie[] = [
  {
    id: 1,
    name: 'Película 1',
    image: "https://cl.buscafs.com/www.tomatazos.com/public/uploads/images/170592/170592.jpg",
    description: 'Descripción de la película 1.',
    ranking: "80/100",
    category: "Action, Adventures, Drama",
    origin: "USA, 2018"
  },
  {
    id: 2,
    name: 'Película 2',
    image: "https://static.posters.cz/image/350/posters/pulp-fiction-cover-i1288.jpg",
    description: 'Descripción de la película 2.',
    ranking: "80/100",
    category: "Action, Adventures, Drama",
    origin: "USA, 2018"
  },
  {
    id: 3,
    name: 'Película 3',
    image: 'https://www.mubis.es/media/users/2514/306037/te-gustan-las-peliculas-de-terror-poster-de-scream-la-original-l_cover.jpg',
    description: 'Descripción de la película 3.',
    ranking: "80/100",
    category: "Action, Adventures, Drama",
    origin: "USA, 2018"
  },
  {
    id: 4,
    name: 'Película 4',
    image: 'https://www.posterscine.com/media/catalog/product/cache/1c91d037a1f0ef180108abb0973795cc/o/p/oppenheimer_poster.png',
    description: 'Descripción de la película 4.',
    ranking: "80/100",
    category: "Action, Adventures, Drama",
    origin: "USA, 2018"
  },
];

const Home: React.FC = () => {
  return (
    <div>
         <Header />
      <h1 className='home-title'>List Of Movies</h1>
      <div className='list-of-movies'>
      <section className="movie-grid">
        {moviesData.map((movie) => (
          <div key={movie.id} className="movie-card">
            <img
              src={movie.image}
              alt={movie.name}
              className="movie-poster"
            />
            <p>{movie.origin}</p>
            <h2>{movie.name}</h2>
            <p>IMDb {movie.ranking}</p>
            <p>{movie.category}</p>
          </div>
        ))}
      </section>
      <section className="movie-grid">
        {moviesData.map((movie) => (
          <div key={movie.id} className="movie-card">
            <img
              src={movie.image}
              alt={movie.name}
              className="movie-poster"
            />
            <p>{movie.origin}</p>
            <h2>{movie.name}</h2>
            <p>IMDb {movie.ranking}</p>
            <p>{movie.category}</p>
          </div>
        ))}
      </section>
      </div>
    </div>
  );
};

export default Home;
