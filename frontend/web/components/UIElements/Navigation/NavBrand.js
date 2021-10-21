import Link from 'next/link';
import styles from './NavBrand.module.scss';

const NavBrand = ({ style, href, children, extraClasses, ...props }) => {
  return (
    <Link href={href}>
      <a
        className={`${styles['nav-brand']} ${extraClasses && extraClasses}`}
        style={style}
        {...props}
      >
        {children}
      </a>
    </Link>
  );
};

export default NavBrand;
