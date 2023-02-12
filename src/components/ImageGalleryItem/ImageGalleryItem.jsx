import propTypes from 'prop-types';
import styles from './imageGalleryItem.module.css';

function ImageGalleryItem({
  webformatURL,
  tags,
  largeImageURL,
  onImageClick,
  id,
}) {
  return (
    <li
      className={styles.imageGalleryItem}
      id={id}
      onClick={e => {
        e.preventDefault();
        onImageClick({ largeImageURL, tags });
      }}
    >
      <img src={webformatURL} alt={tags} />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  webformatURL: propTypes.string.isRequired,
  tags: propTypes.string.isRequired,
  largeImageURL: propTypes.string.isRequired,
};

export default ImageGalleryItem;
