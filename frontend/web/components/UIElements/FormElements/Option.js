import styles from './Option.module.scss';

const Option = ({
  value,
  selected,
  style,
  extraClasses,
  children,
  ...props
}) => {
  return (
    <option
      selected={selected}
      value={value}
      className={`${styles['select__option']} ${extraClasses && extraClasses}`}
      style={style}
      {...props}
    >
      {children}
    </option>
  );
};

export default Option;
