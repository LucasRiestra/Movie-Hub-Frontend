import  { useState } from 'react';
import { FaPlusCircle } from 'react-icons/fa';
import AddMovieModal from './AddMovieModal';
import { Link } from 'react-router-dom';

import "./Header.css"

function Header() {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <header className="app-header">
      <div className="app-title">CineXpert</div>
      <div className="user-actions">
        <Link to="/" className="sign-in-button">Sign In</Link>
        <button className="add-movie-button" onClick={openModal}>
        <FaPlusCircle size={40} />
        </button>
      </div>
           <AddMovieModal isOpen={showModal} onRequestClose={closeModal} />
    </header>
  );
}

export default Header;
