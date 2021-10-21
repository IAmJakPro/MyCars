import Select from 'react-select';
import styles from './SelectBox.module.scss';
import chroma from 'chroma-js';

const SelectBox = ({
  style,
  extraClasses,
  name,
  value,
  children,
  label,
  id,
  onChange,
  error,
  placeholder,
  options,
  colorful = false,
  ...props
}) => {
  const colourStyles = {
    control: (styles) => ({ ...styles, backgroundColor: 'white' }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      const color = chroma(data.color);
      return {
        ...styles,
        backgroundColor: isDisabled
          ? undefined
          : isSelected
          ? data.color
          : isFocused
          ? color.alpha(0.1).css()
          : undefined,
        color: isDisabled
          ? '#ccc'
          : isSelected
          ? chroma.contrast(color, 'white') > 2
            ? 'white'
            : 'black'
          : data.color,
        cursor: isDisabled ? 'not-allowed' : 'default',

        ':active': {
          ...styles[':active'],
          backgroundColor: !isDisabled
            ? isSelected
              ? data.color
              : color.alpha(0.3).css()
            : undefined,
        },
      };
    },
    multiValue: (styles, { data }) => {
      const color = chroma(data.color);
      return {
        ...styles,
        backgroundColor: color.alpha(0.1).css(),
      };
    },
    multiValueLabel: (styles, { data }) => ({
      ...styles,
      color: data.color,
    }),
    multiValueRemove: (styles, { data }) => ({
      ...styles,
      color: data.color,
      ':hover': {
        backgroundColor: data.color,
        color: 'white',
      },
    }),
  };

  const defaultOption = options.find((v) => v.value === value);
  console.log('default option: ', defaultOption);
  return (
    <div
      className={`${styles['form-control']} ${extraClasses && extraClasses}`}
    >
      {label && (
        <label htmlFor={id} className={styles['form-control__label']}>
          {label}
        </label>
      )}

      {colorful && (
        <Select
          id={id}
          name={name}
          closeMenuOnSelect={false}
          defaultValue={value}
          options={options}
          styles={colourStyles}
          onChange={onChange}
          placeholder={placeholder}
          {...props}
        />
      )}

      {!colorful && (
        <Select
          id={id}
          name={name}
          options={options}
          defaultValue={defaultOption}
          onChange={onChange}
          placeholder={placeholder}
          {...props}
        />
      )}
      {error && <small>{error}</small>}
    </div>
  );
};

export default SelectBox;
