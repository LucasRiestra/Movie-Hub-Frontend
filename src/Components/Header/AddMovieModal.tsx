import React, { useEffect, useState } from 'react';
import "./AddMovieModal.css"
import { useUserContext } from '../../utils/useUserContext';
import { addMovieToUser } from '../../Services/user.services';
import { useAuth0 } from '@auth0/auth0-react';
import { getUserByEmail } from '../../Services/user.services';
import { UserType } from '../../Context/user.context';
import { uploadRequest } from '../../Services/request.services';


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
  const { user, getAccessTokenSilently } = useAuth0();
  const { setCurrentLoggedUser } = useUserContext();
  const [movieData, setMovieData] = useState<MovieData>({
    name: '',
    poster_image: '',
    score: '',
    genres: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user?.email) {
          const userEmail = user.email;
          const userData = await getUserByEmail(getAccessTokenSilently, userEmail);
          console.log(userData);

          // Asigna userData a currentUser en el contexto
          setCurrentLoggedUser(userData as UserType);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, [user, getAccessTokenSilently, setCurrentLoggedUser]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
  
    setMovieData((prevData) => ({
      ...prevData,
      [name]: name === 'genres' ? value.split(',') : value,
    }));
  };

  const [file, setfile] = useState<File>()
  console.log(file)

  const handleFileInput = async (event: React.ChangeEvent<HTMLInputElement> | null) => {
    if (event && event.target && event.target.files !== null) {
        const file: File = event.target.files[0];
        setfile(file);

        const cloudinaryImageUrl = await uploadRequest(file);

        if (cloudinaryImageUrl) {
            setMovieData((prevData) => ({
                ...prevData,
                poster_image: cloudinaryImageUrl,
            }));
        }
    }
};

  const handleSaveMovie = async () => {
   
    try {
      if (!user || !user.email) {
        console.error('User or user email is undefined.');
        return;
      }

      const userByEmail = await getUserByEmail(getAccessTokenSilently, user.email);
  
      if (!userByEmail) {
        console.error('Error fetching user by email');
        return;
      }

      const cloudinaryImageUrl = await uploadRequest(file);
  
      const newMovie = await addMovieToUser(
        getAccessTokenSilently,
        userByEmail.id,
        {
          ...movieData,
          genres: movieData.genres.map((genre: string) => ({ name: genre })),
          poster_image: cloudinaryImageUrl,
        }
      );
  
      if (newMovie) {
        onCloseAndAddMovie(newMovie);
        onRequestClose();
        setTimeout(() => {
          window.location.reload();
        }, 100);
      } else {
        console.error('Error at save movie');
      }
    } catch (error) {
      console.error('Error in the process', error);
    };
  };
  console.log('currentUser in AddMovieModal:', user);
  
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
                  type={"file"}
                  className="form-control"
                  id="poster_image"
                  name="poster_image"
                  accept="image/*"
                  onChange={handleFileInput}
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

