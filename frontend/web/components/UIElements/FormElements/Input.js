import styles from './Input.module.scss';

const Input = ({
  placeholder,
  type,
  name,
  label,
  id,
  value,
  style,
  onChange,
  onBlur,
  prefix,
  error,
  extraClasses,
  ...props
}) => {
  return (
    <div className={styles['form-control']}>
      <label htmlFor={id} className={styles['form-control__label']}>
        {label}
      </label>
      {prefix && <div className={styles['form-control__prefix']}>{prefix}</div>}
      {type === 'textarea' && (
        <textarea
          className={`${styles['form-control__input']} ${
            extraClasses && extraClasses
          }`}
          rows="4"
          placeholder={placeholder}
          name={name}
          id={id}
          value={value}
          style={style}
          onChange={onChange}
          onBlur={onBlur}
          {...props}
        ></textarea>
      )}
      {type !== 'textarea' && (
        <input
          className={`${styles['form-control__input']} ${
            extraClasses && extraClasses
          }`}
          type={type || 'text'}
          placeholder={placeholder}
          name={name}
          id={id}
          value={value}
          style={style}
          onChange={onChange}
          onBlur={onBlur}
          {...props}
        />
      )}
      {error && <small>{error}</small>}
    </div>
  );
};

export default Input;
