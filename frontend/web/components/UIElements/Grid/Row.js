import styles from './Row.module.scss';

const Row = ({ style, children, extraClasses, ...props }) => {
  return (
    <div
      className={`${styles.row} ${extraClasses && extraClasses}`}
      style={style}
      {...props}
    >
      {children}
    </div>
  );
};

export default Row;
