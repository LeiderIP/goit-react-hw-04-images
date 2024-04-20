import React from 'react';

const ImageGalleryItem = ({ image, openModal }) => {
  const handleImageClick = () => {
    openModal(image.id);
  };

  return (
    <li className="gallery-item" onClick={handleImageClick} key={image.id}>
      <img src={image.webformatURL} alt="" />
    </li>
  );
};

export default ImageGalleryItem;
