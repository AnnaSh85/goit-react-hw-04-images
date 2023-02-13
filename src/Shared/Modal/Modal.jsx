import propTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { useEffect, useCallback } from 'react';

import styles from './modal.module.css';

const modalRoot = document.querySelector('#modal');

const Modal = ({ onModalClose, modalData }) => {
  const handleCloseModal = useCallback(
    ({ target, currentTarget, code }) => {
      if (target === currentTarget || code === 'Escape') {
        onModalClose();
      }
    },
    [onModalClose]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleCloseModal);

    return () => document.removeEventListener('keydown', handleCloseModal);
  }, [handleCloseModal]);

  const { largeImageURL, tags } = modalData;
  return createPortal(
    <div className={styles.overlay} onClick={handleCloseModal}>
      <div className={styles.modal}>
        <img src={largeImageURL} alt={tags} />
      </div>
    </div>,
    modalRoot
  );
};

export default Modal;

Modal.propTypes = {
  modalData: propTypes.shape({
    largeImageURL: propTypes.string.isRequired,
    tags: propTypes.string.isRequired,
  }),
  onModalClose: propTypes.func,
};
