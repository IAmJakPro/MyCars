import { useState } from 'react';
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import { faColumns, faList } from '@fortawesome/free-solid-svg-icons';
import 'line-awesome/dist/line-awesome/css/line-awesome.min.css';
import Input from '../../UIElements/FormElements/Input';
import styles from './LayoutSort.module.scss';
import Row from '../../UIElements/Grid/Row';
import Col from '../../UIElements/Grid/Col';

const LayoutSort = ({ layout, sort, onSort, onLayout, sortOptions, onSearch }) => {
  return (
    <div className="mb-2 align-right">
      <Row>
        <Col span={8}>
          <div>
            <Input
              onKeyDown={onSearch}
              placeholder="Search"
              prefix={<i className="las la-lg la-search"></i>}
            />
          </div>
        </Col>
        <Col span={2}>
          <div className="my-1">
          <span className={styles['filter-by']}>
            <select onChange={onSort}>
              {sortOptions.map((option) => (
                <option value={option.value} selected={option.value === sort}>
                  {option.label}
                </option>
              ))}
            </select>
          </span>
          </div>
        </Col>
        <Col span={2}>
          <div className="my-1">
            <span className={styles['display-layouts']}>
              <button
                className={layout === 'horizontal' && styles.active}
                type="button"
                onClick={() => onLayout('horizontal')}
              >
                {/* <FontAwesomeIcon icon={faList} /> */}
                <i className="las la-lg la-list-ul"></i>
              </button>
              <button
                className={layout === 'vertical' && styles.active}
                type="button"
                onClick={() => onLayout('vertical')}
              >
                <i className="las la-lg la-border-all"></i>
                {/* <FontAwesomeIcon icon={faColumns} /> */}
              </button>
            </span>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default LayoutSort;
