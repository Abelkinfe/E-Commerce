// LogoutConfirmationModal.jsx
import React from 'react';
import './LogoutConfirmationModal.css'; // Add some styling

const LogoutConfirmationModal = ({ onConfirm, onCancel }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Are you sure you want to log out?</h2>
        <div className="modal-actions">
          <button onClick={onConfirm} className="modal-button confirm">Yes</button>
          <button onClick={onCancel} className="modal-button cancel">No</button>
        </div>
      </div>
    </div>
  );
};

export default LogoutConfirmationModal;
