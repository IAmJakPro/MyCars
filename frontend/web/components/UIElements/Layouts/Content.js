import styles from './Content.module.scss';

const Content = ({ style, children, extraClasses, ...props }) => {
  return (
    <main
      className={`${styles.content} ${extraClasses && extraClasses}`}
      style={style}
      {...props}
    >
      {children}
    </main>
  );
};

export default Content;
