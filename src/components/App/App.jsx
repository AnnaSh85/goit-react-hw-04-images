import { useState, useEffect, useCallback } from 'react';
import React from 'react';
import Searchbar from '../Searchbar/Searchbar';
import imagesApi from '../../Shared/Api/fetchImages';
import ImageGallery from '../ImageGallery/ImageGallery';
import Button from '../Button/Button';
import Loader from '../Loader/Loader';
import Modal from '../../Shared/Modal/Modal';
import styles from './app.module.css';
import { NotificationManager } from 'react-notifications';

const App = () => {
  const [search, setSearch] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [totalHits, setTotalHits] = useState(null);
  const [Loading, setLoading] = useState(false);

  const maxPage = Math.ceil(totalHits / 12);
  const showButton = images.length > 0 && page < maxPage;

  useEffect(() => {
    if (!search) {
      return;
    }
    const fetchImages = async () => {
      try {
        setLoading(true);
        const response = await imagesApi({ search, page });
        const totalHits = response.data.totalHits;
        const images = response.data.hits;

        if (totalHits === 0 || images === '') {
          return totalHits;
        }
        if (page === 1) {
          NotificationManager.error('Error');
        }
        setImages(prevState => [...prevState, ...images]);
        setTotalHits(totalHits);
      } catch (error) {
        NotificationManager.error('Error');
      } finally {
        setLoading(false);
      }
    };

    fetchImages();

    return () => {};
  }, [search, page]);

  function handleSearchbarSubmit(evt) {
    evt.preventDefault();

    const form = evt.currentTarget;
    const searchValue = form.elements.search.value;

    if (searchValue.trim() === '') {
      return NotificationManager.info('Info message');
    }
    setPage(1);
    setImages([]);
    setSearch(searchValue);
    form.reset();
  }

  const openModal = useCallback(modalData => {
    setModalData(modalData);
    setIsModalOpen(true);
  }, []);

  const changePage = useCallback(() => {
    setPage(prevPage => prevPage + 1);
  }, []);

  const handleModalClose = useCallback(() => {
    setIsModalOpen(false);
    setModalData(null);
  }, []);

  return (
    <>
      <Searchbar onSubmit={handleSearchbarSubmit} />
      <div className={styles.app}>
        <ImageGallery images={images} onImageClick={openModal} />
      </div>
      {/* {Loading ? <Loader /> : showButton && <Button onClick={changePage} />} */}
      {Loading && <Loader />}
      {showButton && <Button onClick={changePage} />}
      {isModalOpen && <Modal modalData={modalData} close={handleModalClose} />}
    </>
  );
};
export default App;
