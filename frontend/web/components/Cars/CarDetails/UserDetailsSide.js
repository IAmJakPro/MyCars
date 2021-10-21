import { Fragment } from 'react/cjs/react.production.min';
import Card from '../../UIElements/Card/Card';
import Button from '../../UIElements/FormElements/Button';

import styles from './UserDetailsSide.module.scss';

const UserDetailsSide = () => {
  return (
    <Fragment>
      <div className={styles.price}>
        <span>$100, 0000</span>
        <small className="ml-2">Negociable</small>
      </div>
      <Card extraClasses="my-1">
        <div className={styles['user-info-box']}>
          <img
            src="https://www.avito.ma/phoenix-assets/imgs/profile/avatar.svg"
            width="64"
            height="64"
          />
          <div className={styles['user-info']}>
            <h4>Osam Jaker</h4>
            <small>Member since 2019</small>
          </div>
        </div>
        <div>
          <Button success form style={{ width: '100%' }}>
            Contact seller
          </Button>
          <Button form style={{ width: '100%' }}>
            Show the seller number
          </Button>
        </div>
      </Card>
      <Card>
        <div className={styles['ad-summary']}>
          <div>
            <small>Ad type</small>
            <span>Sale</span>
          </div>
          <div>
            <small>Condition</small>
            <span>Used</span>
          </div>
          <div>
            <small>Brand & model</small>
            <span>Range rover 2019</span>
          </div>
          <div>
            <small>City</small>
            <span>Casablanca</span>
          </div>
        </div>
      </Card>
    </Fragment>
  );
};

export default UserDetailsSide;
