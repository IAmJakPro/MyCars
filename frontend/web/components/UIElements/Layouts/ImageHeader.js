import styles from './ImageHeader.module.scss';

const ImageHeader = ({ style, imgSrc, children, extraClasses, ...props }) => {
  return (
    <div
      className={`${styles['image-header']} ${extraClasses && extraClasses}`}
      style={style}
    >
      <img src={imgSrc} className={styles['image-header__image']} {...props} />
      <div className={styles['image-header__search']}>{children}</div>
    </div>
  );
};

export default ImageHeader;
