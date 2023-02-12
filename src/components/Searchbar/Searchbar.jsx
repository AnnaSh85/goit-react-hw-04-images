import styles from './searchBar.module.css';

import propTypes from 'prop-types';

function Searchbar({ onSubmit }) {
  return (
    <header className={styles.searchbar}>
      <form className={styles.searchForm} onSubmit={onSubmit}>
        <button type="submit" className={styles.searchFormButton}></button>

        <input
          name="search"
          className={styles.searchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  onSubmit: propTypes.func,
};

// Searchbar.propTypes = {
//   onFormSubmit: propTypes.func.isRequired,
// };

export default Searchbar;
