import styles from './Col.module.scss';

const Col = ({
  span = '',
  sm = '',
  md = '',
  lg = '',
  xl = '',
  style = {},
  children,
  extraClasses,
  ...props
}) => {
  const classes = `${styles[`col-${span}`]} ${styles[`col-sm-${sm}`]} ${
    styles[`col-md-${md}`]
  } ${styles[`col-lg-${lg}`]} ${styles[`col-xl-${xl}`]}`;
  return (
    <div
      className={`${classes} ${extraClasses && extraClasses}`}
      style={style}
      {...props}
    >
      {children}
    </div>
  );
};

export default Col;
