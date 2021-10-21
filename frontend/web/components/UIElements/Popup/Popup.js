import { Fragment, useEffect } from 'react';
import styles from './Popup.module.scss';

const Popup = ({
  header,
  footer,
  style,
  show,
  children,
  onCancel,
  onConfirm,
  extraClasses,
  ...props
}) => {
  return (
    <Fragment>
      {show && (
        <div
          className={styles['popup__popup-overlay']}
          onClick={onCancel}
        ></div>
      )}
      {show && (
        <div
          className={`${styles.popup} ${extraClasses && extraClasses}`}
          style={style}
          {...props}
        >
          {header && (
            <div className={styles['popup__popup-header']}>{header}</div>
          )}
          <div className={styles['popup__popup-body']}>{children}</div>
          {footer && (
            <div className={styles['popup__popup-footer']}>
              <button onClick={onCancel}>close</button>
              {footer}
            </div>
          )}
        </div>
      )}
    </Fragment>
  );
};

export default Popup;
