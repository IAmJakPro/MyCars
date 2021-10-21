//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import Input from '../../UIElements/FormElements/Input';
import Button from '../../UIElements/FormElements/Button';
import Container from '../../UIElements/Layouts/Container';
import styles from './TopPanel.module.scss';
//import { faHeart } from '@fortawesome/free-regular-svg-icons';

const TopPanel = (props) => {
  return (
    <div className={styles['top-panel']}>
      <Container>
        <div>
          <ul>
            <li>
              <Link href="/">Home</Link>
            </li>
            <span> / </span>
            <li>
              <Link href="/">cars</Link>
            </li>
          </ul>
        </div>
        <div className={styles['panel-wrapper']}>
          <div>
            <h1 className="mt-0">Search new cars in Morocco</h1>
          </div>
          {/* <div className="flex-center-y">
            <Button outlinedPremium icon={<FontAwesomeIcon icon={faHeart} />}>
              Save search
            </Button>
          </div> */}
        </div>
      </Container>
    </div>
  );
};

export default TopPanel;
