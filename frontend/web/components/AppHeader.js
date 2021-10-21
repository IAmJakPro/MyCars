import Header from './UIElements/Layouts/Header';
import Select from 'react-select';
import Button from './UIElements/FormElements/Button';
import ImageHeader from './UIElements/Layouts/ImageHeader';
import Input from './UIElements/FormElements/Input';
import Col from './UIElements/Grid/Col';
import Row from './UIElements/Grid/Row';

import styles from './AppHeader.module.scss';

const AppHeader = ({ cities }) => {
  const options = cities.map((city) => ({ label: city.name, value: city.key }));
  return (
    <Header>
      <ImageHeader imgSrc="https://via.placeholder.com/1000x600">
        <form>
          <div>
            <Row>
              <Col span={3}>
                <div className={styles['form-control']}>
                  <Select options={options} />
                </div>
              </Col>
              <Col span={7}>
                <Input
                  type="text"
                  id="search"
                  name="search"
                  placeholder="Search"
                />
              </Col>
              <Col span={2}>
                <Button form>Search</Button>
              </Col>
            </Row>
          </div>
        </form>
      </ImageHeader>
    </Header>
  );
};

export default AppHeader;
