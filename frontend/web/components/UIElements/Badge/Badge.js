//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Badge.module.scss';

const Badge = ({
  text,
  icon,
  style = {},
  bgColor = 'primary',
  color,
  size = 'md',
  extraClasses,
  ...props
}) => {
  return (
    <span
      className={`${styles.badge} ${styles[bgColor]} ${styles[size]} ${
        extraClasses && extraClasses
      }`}
      style={(style, color && { color })}
      {...props}
    >
      {icon && <i className={`las la-lg ${icon}`}></i>}
      <span>{text}</span>
    </span>
  );
};

export default Badge;
