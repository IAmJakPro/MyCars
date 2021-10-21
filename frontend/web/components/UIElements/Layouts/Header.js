import styles from './Header.module.scss';

const Header = ({ style, children, extraClasses, ...props }) => {
  return (
    <header
      className={`${styles.header} ${extraClasses && extraClasses}`}
      style={style}
      {...props}
    >
      {children}
    </header>
  );
};

export default Header;
