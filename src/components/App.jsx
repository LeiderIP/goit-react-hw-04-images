import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Button from './Button';
import Modal from './Modal';

const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const fetchImages = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `https://pixabay.com/api/?q=${query}&page=${page}&key=42456544-e55c7a4295ba52a4d79edc728&image_type=photo&orientation=horizontal&per_page=12`
      );
      const newImages = response.data.hits.filter(
        image => !images.some(img => img.id === image.id)
      );
      setImages(prevImages => [...prevImages, ...newImages]);
    } catch (error) {
      console.error('Error fetching images:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = newQuery => {
    setQuery(newQuery);
    setPage(1);
    setImages([]);
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const openModal = imageId => {
    const selectedImage = images.find(image => image.id === imageId);
    setSelectedImage(selectedImage);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  useEffect(() => {
    if (query) {
      fetchImages();
    }
  }, [query, page]);

  return (
    <div>
      <Searchbar onSubmit={handleSearch} />
      <ImageGallery images={images} openModal={openModal} />
      {images.length > 0 && (
        <Button onClick={handleLoadMore} isLoading={isLoading} />
      )}
      {selectedImage && (
        <Modal imageUrl={selectedImage.largeImageURL} onClose={closeModal} />
      )}
    </div>
  );
};

export default App;
