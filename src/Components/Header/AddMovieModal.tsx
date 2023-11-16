import React, { useState } from 'react';
import "./AddMovieModal.css"

interface AddMovieModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  onCloseAndAddMovie: (movieData: MovieData) => void;
}

export interface MovieData {
  name: string;
  poster_image: string;
  score: string;
  genres: []; 
}

const AddMovieModal: React.FC<AddMovieModalProps> = ({ isOpen, onRequestClose, onCloseAndAddMovie }) => {
  const [movieData, setMovieData] = useState<MovieData>({
    name: '',
    poster_image: '',
    score: '',
    genres: [],
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
  
    setMovieData((prevData) => ({
      ...prevData,
      [name]: name === 'genres' ? value.split(',') : value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];

    setMovieData((prevData) => ({
      ...prevData,
      poster_image: file ? URL.createObjectURL(file) : '',
    }));
  };

  const handleSaveMovie = async () => {
    try {
      const response = await fetch('http://localhost:4001/movie/1', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...movieData,
          genres: movieData.genres.map((genre: string) => ({ name: genre })),
        }),
      });
  
      if (response.ok) {
        const newMovie = await response.json();
        onCloseAndAddMovie(newMovie);
        onRequestClose();
      } else {
        console.error('Error al guardar la película:', response.statusText);
      }
    } catch (error) {
      console.error('Error al procesar la solicitud:', error);
    }
  };
  

  return (
    <div className={`modal fade ${isOpen ? 'show' : ''}`} style={{ display: isOpen ? 'block' : 'none' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Add Movie</h5>
            <button type="button" className="close" data-dismiss="modal" onClick={onRequestClose}>
              <span>&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  value={movieData.name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="poster_image">Poster Image</label>
                <input
                  type="file"
                  className="form-control"
                  id="poster_image"
                  name="poster_image"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                {movieData.poster_image && (
                  <img src={movieData.poster_image} alt="Selected" style={{ maxWidth: '100%', marginTop: '10px' }} />
                )}
              </div>
              <div className="form-group">
                <label htmlFor="score">Score (0-100)</label>
                <input
                  type="text"
                  className="form-control"
                  id="score"
                  name="score"
                  value={movieData.score}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="genres">Genres (comma-separated)</label>
                <input
                  type="text"
                  className="form-control"
                  id="genres"
                  name="genres"
                  value={movieData.genres.join(',')}
                  onChange={handleInputChange}
                          />
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onRequestClose}>
              Close
            </button>
            <button type="button" className="btn btn-primary" onClick={handleSaveMovie}>
              Save Movie
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddMovieModal;

