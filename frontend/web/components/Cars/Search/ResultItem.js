import Card from '../../UIElements/Card/Card';
import 'line-awesome/dist/line-awesome/css/line-awesome.min.css';
import styles from './ResultItem.module.scss';
import webRoutes from '../../../utils/webRoutes';
import Badge from '../../UIElements/Badge/Badge';

const ResultItem = ({
  layout,
  title,
  price,
  is_negociable,
  images,
  brand,
  model,
  category,
  crashed,
  transmission,
  fuel_type,
  year,
}) => {
  /* const cardFooter = (
    <div className={styles.footer}>
      <small>
        
        <span>Rabat</span>
      </small>
      <small>
        
        <span>2 hours ago</span>
      </small>
    </div>
  ); */

  const specifications = [
    {
      label: crashed ? 'Crashed' : 'Not crashed',
      icon: 'la-car-crash',
    },
    {
      label: '100 km',
      icon: 'la-tachometer-alt',
    },
    {
      label: fuel_type && fuel_type,
      icon: 'la-gas-pump',
    },
    {
      label: category && category,
      icon: 'la-tag',
    },
    {
      label: transmission && transmission,
      icon: '',
    },
    {
      label: brand && brand,
      icon: 'la-award',
    },
    {
      label: year && year,
      icon: 'la-calendar',
    },
  ];

  return (
    <Card
      direction={layout || 'vertical'}
      hrefLink={webRoutes.carDetails('range-rover')}
      image={images[0] || 'https://content.avito.ma/images/10/10035725653.jpg'}
      imageWidth="100%"
      imageHeight={layout === 'vertical' && '200px'}
      header={
        <div className={styles.header}>
          <div className={`${styles.footer} mb-1`}>
            <small>
              <i className="las la-lg la-map-marker"></i>
              <span>Rabat</span>
            </small>
            <small>
              <i className="las la-lg la-clock"></i>
              <span>2 hours ago</span>
            </small>
          </div>
          <h3 className="my-0">{title}</h3>
          <div className={`${styles.price} mt-1`}>
            <h4 className="m-0">
              {new Intl.NumberFormat('fr-MA', {
                style: 'currency',
                currency: 'MAD',
                maximumFractionDigits: 0,
                useGrouping: true,
              }).format(price)}
            </h4>
            {is_negociable && <Badge text="Negociable" bgColor="success" />}
          </div>
        </div>
      }
      headerStyle={{ border: 'none', paddingBottom: '0' }}
      bodyStyle={{ paddingTop: '0', paddingBottom: '0' }}
      //footer={cardFooter}
      //footerStyle={{ border: 'none', paddingTop: '0' }}
      extraClasses={`${styles['result-item']} mb-1`}
    >
      <div className={styles.specifications}>
        <ul
          style={{
            display: 'flex',
            flexWrap: 'wrap',
          }}
        >
          {specifications.map(
            (spec) =>
              spec.label && (
                <li style={{ margin: '3px' }}>
                  {/* <small>
                <FontAwesomeIcon icon={spec.icon} className={styles.icon} />
                <span className={styles.specifications__icon}>
                  {spec.label}
                </span>
              </small> */}
                  <Badge icon={spec.icon} text={spec.label} />
                </li>
              )
          )}
          {/* <li>
            <small>
              <FontAwesomeIcon icon={faGasPump} className={styles.icon} />
              <span className={styles.specifications__icon}>Disel</span>
            </small>
          </li>
          <li>
            <small>
              <FontAwesomeIcon icon={faTachometerAlt} className={styles.icon} />
              <span className={styles.specifications__icon}>100 km</span>
            </small>
          </li> */}
        </ul>
      </div>
      {/* <a
        className={`${styles.favorite} flex-center-both`}
        onClick={(e) => e.preventDefault()}
      >
        <FontAwesomeIcon icon={faHeart} />
      </a> */}
    </Card>
  );
};

export default ResultItem;
