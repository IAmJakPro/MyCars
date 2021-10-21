import styles from './CheckInput.module.scss';

const CheckInput = ({
  type,
  name,
  label,
  id,
  value,
  checked,
  style,
  onChange,
  onBlur,
  error,
  extraClasses,
  ...props
}) => {
  return (
    <div className={styles['form-control']}>
      <div>
        <label
          className={`${styles.control} ${styles['control--checkbox']} form-${styles['control__label']}`}
        >
          {label}
          <input
            type={type || 'checkbox'}
            name={name}
            id={id}
            value={value}
            checked={checked}
            style={style}
            onChange={onChange}
            onBlur={onBlur}
            {...props}
          />
          <div className={styles['control__indicator']}></div>
        </label>
        {error && <small>{error}</small>}
      </div>
    </div>
  );
};

export default CheckInput;
