import React from 'react';
import "./AddMovieModal.css"

interface AddMovieModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

const AddMovieModal: React.FC<AddMovieModalProps> = ({ isOpen, onRequestClose }) => {
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
                <input type="text" className="form-control" id="name" name="name" />
              </div>
              <div className="form-group">
                <label htmlFor="image">Image URL</label>
                <input type="text" className="form-control" id="image" name="image" />
              </div>
              <div className="form-group">
                <label htmlFor="ranking">Ranking (0-100)</label>
                <input
                     type="number"
                    className="form-control"
                        id="ranking"
                     name="ranking"
                    min="0"
                    max="100"/>
                </div>
              <div className="form-group">
                <label htmlFor="category">Category</label>
                <input type="text" className="form-control" id="category" name="category" />
              </div>
              <div className="form-group">
                <label htmlFor="origin">Origin</label>
                <input type="text" className="form-control" id="origin" name="origin" />
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onRequestClose}>
              Close
            </button>
            <button type="button" className="btn btn-primary" onClick={onRequestClose}>
              Save Movie
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddMovieModal;
