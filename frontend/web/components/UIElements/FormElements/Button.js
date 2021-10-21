import styles from './Button.module.scss';

const Button = ({
  style,
  href,
  success,
  secondary,
  premium,
  outlined,
  outlinedSuccess,
  outlinedSecondary,
  outlinedPremium,
  children,
  form,
  icon,
  extraClasses,
  center,
  ...props
}) => {
  let classes = `${styles.btn}`;
  if (success) {
    classes += ` ${styles.success}`;
  }
  if (secondary) {
    classes += ` ${styles.secondary}`;
  }
  if (premium) {
    classes += ` ${styles.premium}`;
  }
  if (outlined) {
    classes += ` ${styles.outlined}`;
  }
  if (outlinedSuccess) {
    classes += ` ${styles['outlined-success']}`;
  }
  if (outlinedSecondary) {
    classes += ` ${styles['outlined-secondary']}`;
  }
  if (outlinedPremium) {
    classes += ` ${styles['outlined-premium']}`;
  }

  return (
    <div
      className={`${form && styles['form-control']}
        ${extraClasses && extraClasses}
        `}
    >
      {form && (
        <button className={classes} style={style} {...props}>
          {icon && <span className={styles.icon}>{icon}</span>}
          {children}
        </button>
      )}
      {!form && (
        <a className={classes} style={style} {...props}>
          {icon && <span className={styles.icon}>{icon}</span>}
          {children}
        </a>
      )}
    </div>
  );
};

export default Button;
