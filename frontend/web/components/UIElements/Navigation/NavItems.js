import styles from './NavItems.module.scss';

const NavItems = ({ style, children, extraClasses, ...props }) => {
  return (
    <ul
      className={`${styles['nav-items']} ${extraClasses && extraClasses}`}
      style={style}
      {...props}
    >
      {children}
    </ul>
  );
};

export default NavItems;
