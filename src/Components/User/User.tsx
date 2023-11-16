import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { FaUser } from 'react-icons/fa';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import './User.css';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import { Link } from 'react-router-dom';

const User: React.FC = () => {
  const { user } = useAuth0();
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(user?.name || '');
  const [editedEmail, setEditedEmail] = useState(user?.email || '');

  const openEditModal = () => {
    setIsEditing(true);
  };

  const closeEditModal = () => {
    setIsEditing(false);
  };

  const handleSaveChanges = () => {
    // Lógica para guardar los cambios aquí
    // Puedes utilizar editedName y editedEmail
    closeEditModal();
  };


  return (
    <div>
      <Header />
    <div className="user-container">
      <FaUser className="user-icon" />
      <img src={user?.picture} alt="user-profile" className="user-profile" />
      <div className="user-info">
        <p className="user-name">{user?.name}</p>
        <p className="user-email">{user?.email}</p>
        <button onClick={openEditModal} className="edit-button">
          Edit
        </button>
        <Link to="/home">
            <button className="go-back-button">Go Back</button>
          </Link>
      </div>

      <Modal show={isEditing} onHide={closeEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label htmlFor="editedName">Name:</label>
          <input
            type="text"
            id="editedName"
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
          />
          <br />
          <label htmlFor="editedEmail">Email:</label>
          <input
            type="email"
            id="editedEmail"
            value={editedEmail}
            onChange={(e) => setEditedEmail(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeEditModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
    <Footer />
    </div>
  );
};

export default User;
