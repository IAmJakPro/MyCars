import styles from './Container.module.scss';

const Container = ({ style, children, extraClasses, ...props }) => {
  return (
    <div
      className={`${styles.container} ${extraClasses && extraClasses}`}
      style={style}
      {...props}
    >
      {children}
    </div>
  );
};

export default Container;
