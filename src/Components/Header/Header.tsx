import { useState } from 'react';
import { FaPlusCircle, FaUser } from 'react-icons/fa';
import AddMovieModal, { MovieData } from './AddMovieModal';
import { useAuth0 } from '@auth0/auth0-react';
import "./Header.css"
import { Link } from 'react-router-dom';

function Header() {
  const [showModal, setShowModal] = useState(false);
  const { logout, user, isAuthenticated, loginWithRedirect } = useAuth0();

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };
  const handleAddMovie = (movieData: MovieData) => {
    console.log('Adding movie:', movieData);
  };

  return (
    <header className="app-header">
      <div className="app-title">CineXpress</div>
      <div className="user-actions">
        {isAuthenticated ? (
          <>
            <p className="welcome-message">Welcome, {user?.name || 'Guest'}!</p>
            <button className="sign-in-button" onClick={() => logout()}>Log Out</button>
          </>
        ) : (
          <button className="sign-in-button" onClick={() => loginWithRedirect()}>Log In</button>
        )}
        <button className="add-movie-button" onClick={openModal}>
          <FaPlusCircle size={40} />
        </button>
        <Link to="/user" className="user-icon-link">
          <FaUser size={24} />
        </Link>
      </div>
      <AddMovieModal isOpen={showModal} onRequestClose={closeModal} onCloseAndAddMovie={handleAddMovie} />
    </header>
  );
}

export default Header;
