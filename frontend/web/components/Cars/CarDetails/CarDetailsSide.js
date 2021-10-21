//import Carousel, { Dots } from '@brainhubeu/react-carousel';
import CustomCarousel from '../../UIElements/Carousel/CustomCarousel';
import Card from '../../UIElements/Card/Card';

import styles from './CarDetailsSide.module.scss';
import Row from '../../UIElements/Grid/Row';
import Col from '../../UIElements/Grid/Col';
//import { faGasPump } from '@fortawesome/free-solid-svg-icons';
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
/* import FuelStation from 'icons/fuel-station-large.svg'; */

const CarDetailsSide = () => {
  return (
    <>
      <Card>
        <CustomCarousel
          images={[
            'https://content.avito.ma/gt-assets/imgs/banner-creative.png',
            'https://listings-prod.tcimg.net/listings/191199/13/06/YH4K14AA8CA000613/PM6TD54CHTB7GRM7OADRFVQ6WA-cr-540.jpg',
          ]}
        />
      </Card>

      {/* Important specifications */}
      <div className={`${styles['overview-specs']} my-1`}>
        <Row>
          <Col span={2} extraClasses="pl-0">
            <Card
              header={
                <div className={styles['overview-item__header']}>
                  {/* <FontAwesomeIcon icon={faGasPump} size="2x" /> */}
                  <img src="/icons/fuel-station-large.svg" />

                  <small>Fuel type</small>
                </div>
              }
              headerStyle={{ borderBottom: 0 }}
              bodyStyle={{ paddingTop: '0' }}
              extraClasses="align-center"
            >
              <span className={styles['overview-item__body']}>Disel</span>
            </Card>
          </Col>
          <Col span={2} extraClasses="">
            <Card
              header={
                <div className={styles['overview-item__header']}>
                  {/* <FontAwesomeIcon icon={faGasPump} size="2x" /> */}
                  <img src="/icons/fuel-station-large.svg" />

                  <small>City</small>
                </div>
              }
              headerStyle={{ borderBottom: 0 }}
              bodyStyle={{ paddingTop: '0' }}
              extraClasses="align-center"
            >
              <span className={styles['overview-item__body']}>Disel</span>
            </Card>
          </Col>
          <Col span={2} extraClasses="">
            <Card
              header={
                <div className={styles['overview-item__header']}>
                  {/* <FontAwesomeIcon icon={faGasPump} size="2x" /> */}
                  <img src="/icons/fuel-station-large.svg" />

                  <small>Kilometrage</small>
                </div>
              }
              headerStyle={{ borderBottom: 0 }}
              bodyStyle={{ paddingTop: '0' }}
              extraClasses="align-center"
            >
              <span className={styles['overview-item__body']}>Disel</span>
            </Card>
          </Col>
          <Col span={2} extraClasses="">
            <Card
              header={
                <div className={styles['overview-item__header']}>
                  {/* <FontAwesomeIcon icon={faGasPump} size="2x" /> */}
                  <img src="/icons/fuel-station-large.svg" />

                  <small>Transmittion</small>
                </div>
              }
              headerStyle={{ borderBottom: 0 }}
              bodyStyle={{ paddingTop: '0' }}
              extraClasses="align-center"
            >
              <span className={styles['overview-item__body']}>Disel</span>
            </Card>
          </Col>
          <Col span={2} extraClasses="">
            <Card
              header={
                <div className={styles['overview-item__header']}>
                  {/* <FontAwesomeIcon icon={faGasPump} size="2x" /> */}
                  <img src="/icons/fuel-station-large.svg" />

                  <small>Engine</small>
                </div>
              }
              headerStyle={{ borderBottom: 0 }}
              bodyStyle={{ paddingTop: '0' }}
              extraClasses="align-center"
            >
              <span className={styles['overview-item__body']}>Disel</span>
            </Card>
          </Col>
          <Col span={2} extraClasses="pr-0">
            <Card
              header={
                <div className={styles['overview-item__header']}>
                  {/* <FontAwesomeIcon icon={faGasPump} size="2x" /> */}
                  <img src="/icons/fuel-station-large.svg" />

                  <small>Fuel type</small>
                </div>
              }
              headerStyle={{ borderBottom: 0 }}
              bodyStyle={{ paddingTop: '0' }}
              extraClasses="align-center"
            >
              <span className={styles['overview-item__body']}>Disel</span>
            </Card>
          </Col>
        </Row>
      </div>

      <div className={styles['spec-details']}>
        <Card>
          <h3>All details</h3>
          <Row>
            <Col span={6} style={{ borderRight: '1px solid #ccc' }}>
              <div className={styles['spec-item']}>
                <span className={styles['spec-item__key']}>key</span>
                <span className={styles['spec-item__value']}>
                  this is value
                </span>
              </div>
            </Col>
            <Col span={6} style={{ borderLeft: '1px solid #ccc' }}>
              <div className={styles['spec-item']}>
                <span className={styles['spec-item__key']}>key</span>
                <span className={styles['spec-item__value']}>
                  this is value
                </span>
              </div>
            </Col>
            <Col span={6} style={{ borderRight: '1px solid #ccc' }}>
              <div className={styles['spec-item']}>
                <span className={styles['spec-item__key']}>key</span>
                <span className={styles['spec-item__value']}>
                  this is value
                </span>
              </div>
            </Col>
            <Col span={6} style={{ borderLeft: '1px solid #ccc' }}>
              <div className={styles['spec-item']}>
                <span className={styles['spec-item__key']}>key</span>
                <span className={styles['spec-item__value']}>
                  this is value
                </span>
              </div>
            </Col>
          </Row>
        </Card>
      </div>
      <div className="my-1">
        <Card>
          <h3>Extras</h3>
          <Row>
            <Col span={2} extraClasses="align-center">
              <div>
                <img src="/icons/fuel-station-large.svg" />
                <span>Climatisation</span>
              </div>
            </Col>
          </Row>
        </Card>
      </div>
      <div>
        <Card>
          <h3>Description</h3>
          <p>lorem ipsum lorem ipsum lorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsum lorem ipsum lorem ipsum lorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsum lorem ipsum lorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsum lorem ipsum lorem ipsum lorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsum lorem ipsum lorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsum lorem ipsum lorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsum</p>
        </Card>
      </div>
      <div className="my-1">
        <Card>
          <h3>Contact info</h3>

        </Card>
      </div>
    </>
  );
};

export default CarDetailsSide;
