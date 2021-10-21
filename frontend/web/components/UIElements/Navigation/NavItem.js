import styles from './NavItem.module.scss';

const NavItem = ({ style, children, extraClasses, ...props }) => {
  return (
    <li
      className={`${styles['nav-item']} ${extraClasses && extraClasses}`}
      style={style}
      {...props}
    >
      {children}
    </li>
  );
};

export default NavItem;
