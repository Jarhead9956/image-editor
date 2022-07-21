import styles from './Button.module.css';

const Button = (props) => {
  return (
    <button
      className={`${styles.btn} ${props.isActive && styles.active} ${props.styles}`}
      value={props.value}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export default Button;
