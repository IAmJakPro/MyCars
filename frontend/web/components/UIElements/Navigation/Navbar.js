import styles from './Navbar.module.scss';

const Navbar = ({ style, children, extraClasses, ...props }) => {
  return (
    <nav
      className={`${styles.navbar} ${extraClasses && extraClasses}`}
      style={style}
      {...props}
    >
      {children}
    </nav>
  );
};

export default Navbar;
