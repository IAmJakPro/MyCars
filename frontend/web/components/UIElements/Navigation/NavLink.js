import { useRouter } from 'next/router';
import Link from 'next/link';

import styles from './NavLink.module.scss';

const NavLink = ({ href, exact, children, extraClasses, ...props }) => {
  const { pathname } = useRouter();
  const isActive = exact ? pathname === href : pathname.startsWith(href);

  return (
    <Link href={href}>
      <a
        className={`${styles['nav-link']} ${isActive && styles.active} ${
          extraClasses && extraClasses
        }`}
        {...props}
      >
        {children}
      </a>
    </Link>
  );
};

export default NavLink;
