import { Fragment, useEffect, useRef, useState } from 'react';
import CheckInput from '../../UIElements/FormElements/CheckInput';
import styles from './FilterListItem.module.scss';

const FilterListItem = ({
  index,
  title,
  options,
  formik,
  name,
  change,
  value,
  children,
  overflow = 'hidden',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [height, setHeight] = useState(0);
  const listItemClickHandler = (e) => {
    e.preventDefault();
    setIsOpen((prev) => !prev);
  };

  const getHeight = (e) => {
    if (isOpen && e) {
      setHeight(e.scrollHeight);
    } else {
      setHeight(0);
    }
  };

  return (
    <li className={styles['list-item']}>
      <a
        href="#"
        data-option={index}
        onClick={listItemClickHandler}
        className={`${styles.collapsible} ${isOpen ? styles.active : ''}`}
      >
        <label>{title}</label>
        {/* <span>l</span> */}
      </a>
      <ul
        className={`${styles['sub-options']} ${styles.content}`}
        ref={getHeight}
        style={{ overflow: overflow, maxHeight: height }}
      >
        <li>{children}</li>
      </ul>
    </li>
  );
};

export default FilterListItem;

/*{options.map((option) => (
          <li>
            <CheckInput
              id={option.value}
              name={name}
              value={option.value}
              checked={
                Array.isArray(value)
                  ? value.length > 0 && value.includes(option.value)
                  : value
              }
              label={option.label}
              onChange={formik.handleChange}
              error={
                formik.touched[name] && formik.errors[name]
                  ? formik.errors[name]
                  : null
              }
            />
          </li>
        ))}*/
