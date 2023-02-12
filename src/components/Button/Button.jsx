import styles from './button.module.css';

import propTypes from 'prop-types';

const Button = ({ onClick, showBtn }) => (
  <button className={styles.button} onClick={onClick} type="button">
    Load more
  </button>
);

export default Button;

Button.propTypes = {
  onClick: propTypes.func.isRequired,
};
