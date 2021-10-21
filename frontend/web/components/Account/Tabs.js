import Row from '../UIElements/Grid/Row';
import Col from '../UIElements/Grid/Col';
import Card from '../UIElements/Card/Card';
import styles from './Tabs.module.scss';
import { useState } from 'react';

const Tabs = ({ items }) => {
  const [active, setActive] = useState(0);
  const onItemSelect = (i, e) => {
    e.preventDefault();
    setActive(i);
  };

  const itemToRender = items.find((li) => li.index === active);

  return (
    <div>
      <Row>
        <Col span={3}>
          <ul className={styles['settings-list-items']}>
            {items.map(({ name, index }) => {
              return (
                <li>
                  <a
                    className={active === index ? styles.active : ''}
                    onClick={onItemSelect.bind(this, index)}
                  >
                    {name}
                  </a>
                </li>
              );
            })}
          </ul>
        </Col>
        <Col span={9}>{itemToRender.body}</Col>
      </Row>
    </div>
  );
};

export default Tabs;
