import React, { useEffect } from 'react';

const Modal = ({ imageUrl, onClose }) => {
  useEffect(() => {
    const handleKeyPress = e => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [onClose]);

  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <img src={imageUrl} alt="" />
      </div>
    </div>
  );
};

export default Modal;
