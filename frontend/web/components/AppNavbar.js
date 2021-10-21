import { Fragment, useContext } from 'react';
import Navbar from '../components/UIElements/Navigation/Navbar';
import NavBrand from '../components/UIElements/Navigation/NavBrand';
import NavItems from '../components/UIElements/Navigation/NavItems';
import NavItem from '../components/UIElements/Navigation/NavItem';
import Container from '../components/UIElements/Layouts/Container';
import NavLink from '../components/UIElements/Navigation/NavLink';
import Button from '../components/UIElements/FormElements/Button';
import Popup from '../components/UIElements/Popup/Popup';
import Col from '../components/UIElements/Grid/Col';
import Row from '../components/UIElements/Grid/Row';
import Card from '../components/UIElements/Card/Card';

import { useState } from 'react';
import webRoutes from '../utils/webRoutes';

import UserContext from '../utils/userContext';
import styles from './AppNavbar.module.scss';
import { useRouter } from 'next/router';

const AppNavbar = (props) => {
  const { state } = useContext(UserContext);
  const router = useRouter();
  //const [showPopup, setShowPopup] = useState(false);

  /* const openPopup = () => setShowPopup(true);

  const confirmHandler = () => {
    console.log('Confirmed!');
  }; */

  //const cancelHandler = () => setShowPopup(false);
  return (
    <Fragment>
      <Navbar>
        <NavBrand href={webRoutes.homepage}>
          <h2 style={{ margin: 0 }}>
            <svg
              width="200"
              height="40"
              viewBox="0 0 315.50334207737285 47.36660530348715"
              class="css-1j8o68f"
            >
              <defs id="SvgjsDefs1128"></defs>
              <g
                id="SvgjsG1129"
                featurekey="symbolFeature-0"
                transform="matrix(2.126255989074707,0,0,2.126255989074707,-0.4592713029006915,-26.595206497115264)"
                fill="#b469ff"
              >
                <g xmlns="http://www.w3.org/2000/svg">
                  <g>
                    <g>
                      <path d="M39.683,32.943l-0.858-0.508c-4.608-2.729-9.786-4.17-14.971-4.17c-5.109,0-10.084,1.33-14.781,3.955l-0.848,0.475     L0.216,19.321l0.848-0.516c6.77-4.119,14.681-6.297,22.879-6.297c8.23,0,16.182,2.191,22.994,6.338l0.847,0.516L39.683,32.943z      M23.854,26.264c5.221,0,10.429,1.365,15.124,3.957l6.066-10.17c-6.306-3.628-13.579-5.542-21.102-5.542     c-7.488,0-14.721,1.898-20.984,5.5L8.95,30.014C13.699,27.525,18.707,26.264,23.854,26.264z"></path>
                    </g>
                  </g>
                </g>
                <g xmlns="http://www.w3.org/2000/svg">
                  <path d="M23.874,30.286c-0.021,0-0.04,0.006-0.062,0.006l-7.18-13.47c-0.259-0.487-0.863-0.672-1.353-0.412   c-0.487,0.26-0.672,0.865-0.412,1.353l7.178,13.469c-0.263,0.368-0.421,0.815-0.421,1.303c0,1.242,1.007,2.25,2.249,2.25   s2.249-1.008,2.249-2.25S25.116,30.286,23.874,30.286z"></path>
                </g>
              </g>
              <g
                id="SvgjsG1130"
                featurekey="nameFeature-0"
                transform="matrix(0.6950820088386536,0,0,0.6950820088386536,119.64243538488184,10.131147675629865)"
                fill="#b469ff"
              >
                <path d="M30.703 38.5937 l7.0313 0 l-13.594 -37.266 l-7.1094 0 l7.8906 22.266 z M1.9531 38.5937 l6.875 0 l8.125 -19.844 l-3.3594 -8.9063 z M70.14099999999999 1.328000000000003 l0 21.25 c0 3.4375 -0.83336 5.9896 -2.5 7.6563 c-0.88539 0.98961 -2.1094 1.7188 -3.6719 2.1875 l0 6.0938 c1.25 -0.15625 2.3438 -0.41664 3.2813 -0.78125 c1.9271 -0.67711 3.5938 -1.6927 5 -3.0469 c1.4063 -1.5104 2.4479 -3.2552 3.125 -5.2343 c0.78125 -2.0313 1.1719 -4.4271 1.1719 -7.1875 l0 -20.938 l-6.4063 0 z M51.938 1.4059999999999988 l0 21.25 c0 3.3334 0.83336 5.8855 2.5 7.6563 c0.98961 0.98961 2.2136 1.6927 3.672 2.1094 l0 6.1719 c-0.88539 -0.10414 -1.9791 -0.36453 -3.2813 -0.78117 c-1.9791 -0.72914 -3.6198 -1.7708 -4.9219 -3.1249 c-1.4584 -1.3541 -2.5261 -3.0729 -3.2032 -5.1563 c-0.72914 -1.875 -1.0938 -4.2709 -1.0938 -7.1875 l0 -20.938 l6.3281 0 z M105.281 7.5 l11.797 0 l0 -6.0938 l-30.156 0 l0 6.0938 l18.359 0 z M98.719 13.594000000000001 l6.5625 0 l0 25 l-6.5625 0 l0 -25 z M140.344 32.6562 c-0.78125 -0.15625 -1.5105 -0.3907 -2.1876 -0.7032 c-1.4584 -0.67711 -2.7344 -1.6146 -3.8281 -2.8125 c-1.0416 -1.0938 -1.875 -2.4479 -2.5 -4.0625 c-0.57289 -1.6146 -0.85938 -3.2552 -0.85938 -4.9219 l0 -0.15625 l0 -0.23438 c0 -1.7188 0.28648 -3.3854 0.85938 -5 c0.67711 -1.6666 1.5105 -2.9948 2.5001 -3.9844 c1.0416 -1.1979 2.2916 -2.1094 3.75 -2.7344 c0.88539 -0.41664 1.6406 -0.67703 2.2656 -0.78117 l0 -5.8594 c-1.8229 0.26039 -3.4375 0.70313 -4.8438 1.3281 c-2.2916 0.98961 -4.2448 2.3177 -5.8594 3.9844 s-2.8906 3.6458 -3.8281 5.9374 s-1.4063 4.6875 -1.4063 7.1875 l0 0.15625 l0 0.23438 c0 2.5521 0.46875 4.948 1.4063 7.1876 c0.83336 2.2396 2.0834 4.1927 3.75 5.8594 c1.6666 1.7188 3.6198 3.0469 5.8594 3.9844 c1.4063 0.625 3.0469 1.0677 4.9219 1.3281 l0 -5.9375 z M161.594 20 l0.000076294 -0.23438 c0 -2.5521 -0.46875 -4.948 -1.4063 -7.1876 c-0.9375 -2.2916 -2.2135 -4.2708 -3.8281 -5.9374 c-1.5625 -1.6666 -3.4896 -2.9688 -5.7813 -3.9063 c-1.3021 -0.625 -2.8906 -1.0677 -4.7656 -1.3281 l0 5.9375 l0.9375 0.3125 c0.46875 0.15625 0.83336 0.28648 1.0938 0.39063 c1.4584 0.67711 2.7344 1.6146 3.8281 2.8125 c1.0416 1.0938 1.875 2.4479 2.5 4.0625 c0.57289 1.6146 0.85938 3.2552 0.85938 4.9219 l0 0.15625 l0 0.23438 c0 1.7188 -0.28648 3.3854 -0.85938 5 c-0.67711 1.6666 -1.5105 2.9948 -2.5001 3.9844 c-1.0416 1.1979 -2.2916 2.1094 -3.75 2.7344 c-0.67711 0.3125 -1.3802 0.54688 -2.1094 0.70313 l0 5.9375 c1.5625 -0.20836 3.125 -0.65109 4.6875 -1.3282 c2.1354 -0.88539 4.0885 -2.2135 5.8594 -3.9844 c1.7188 -1.8229 2.9948 -3.802 3.8281 -5.9374 c0.9375 -2.2916 1.4063 -4.6875 1.4063 -7.1875 l0 -0.15625 z M171.2656 12.5 c0.9375 -2.2916 2.2916 -4.2447 4.0624 -5.8593 c1.6146 -1.6146 3.698 -2.9167 6.2501 -3.9063 s5.2344 -1.4844 8.0469 -1.4844 l8.6719 0 l0 5.9375 l-8.5938 0 c-2.0313 0 -3.8281 0.33852 -5.3906 1.0156 c-1.6666 0.67711 -3.0208 1.5625 -4.0624 2.6563 c-1.0938 1.0416 -1.9791 2.3958 -2.6563 4.0624 c-0.625 1.5104 -0.9375 3.2031 -0.9375 5.0781 s0.3125 3.5677 0.9375 5.0781 c0.625 1.5625 1.5104 2.9166 2.6563 4.0625 c1.0416 1.0416 2.3958 1.901 4.0624 2.5781 c1.6666 0.625 3.4635 0.9375 5.3906 0.9375 l8.5938 0 l0 5.9375 l-8.6719 0 c-2.9166 0 -5.5729 -0.46875 -7.9688 -1.4063 c-2.5 -1.0416 -4.6094 -2.3698 -6.3281 -3.9844 c-1.7709 -1.6666 -3.125 -3.6458 -4.0625 -5.9374 c-0.98961 -2.3959 -1.4844 -4.8438 -1.4844 -7.3438 c0 -2.6563 0.49477 -5.1302 1.4844 -7.4219 z M235.703 38.5937 l7.0313 0 l-13.594 -37.266 l-7.1094 0 l7.8906 22.266 z M206.9531 38.5937 l6.875 0 l8.125 -19.844 l-3.3594 -8.9063 z M281.781 38.5937 l-10.078 -14.063 c1.3541 -0.41664 2.552 -0.91141 3.5937 -1.4843 c1.1459 -0.72914 2.0834 -1.5364 2.8125 -2.4218 c0.83336 -0.98961 1.4323 -2.0573 1.797 -3.2032 c0.46875 -1.25 0.70313 -2.6563 0.70313 -4.2188 c0 -1.8229 -0.3125 -3.4635 -0.9375 -4.9219 c-0.625 -1.4063 -1.5365 -2.6302 -2.7344 -3.6719 c-1.1459 -0.98961 -2.6042 -1.7709 -4.3751 -2.3438 c-1.8229 -0.57289 -3.75 -0.85938 -5.7813 -0.85938 l-16.563 0 l0 5.9375 l16.016 0 c2.4479 0 4.3489 0.52086 5.703 1.5625 s2.0313 2.6041 2.0313 4.6875 c0 1.9271 -0.67711 3.4375 -2.0313 4.5313 c-1.3541 1.1459 -3.2291 1.7188 -5.625 1.7188 l-16.094 0 l0 18.75 l6.4844 0 l0 -12.969 l8.2031 0 l9.1406 12.969 l7.7344 0 l0 0 z"></path>
              </g>
            </svg>
          </h2>
        </NavBrand>
        <NavItems>
          <NavItem>
            <NavLink href={webRoutes.cars}>Cars</NavLink>
          </NavItem>
          {/* <NavItem>
            <NavLink href="#">Jobs</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#">Parts & Accessories</NavLink>
          </NavItem> */}
          {!state.isAuthenticated && (
            <NavItem>
              <NavLink href={webRoutes.register} exact>
                Register
              </NavLink>
            </NavItem>
          )}
          {!state.isAuthenticated && (
            <NavItem>
              <NavLink href={webRoutes.login} exact>
                Login
              </NavLink>
            </NavItem>
          )}
          {state.isAuthenticated && (
            <NavItem>
              <NavLink href={webRoutes.profile}>Profile</NavLink>
            </NavItem>
          )}
          <NavItem>
            <Button success onClick={() => router.push(webRoutes.newCar)}>
              Free classified
            </Button>
          </NavItem>
        </NavItems>
      </Navbar>
      {/* <Popup
        show={showPopup}
        onConfirm={confirmHandler}
        onCancel={cancelHandler}
      >
        <div style={{ width: '70%', margin: '0 auto' }}>
          <Row>
            <Col span={4}>
              <Card
                hrefLink={webRoutes.newCar}
                extraClasses="align-center"
                bodyStyle={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                style={{ height: '100%' }}
                onClick={cancelHandler}
              >
                Cars
              </Card>
            </Col>
            <Col span={4}>
              <Card
                hrefLink="/login"
                extraClasses="align-center"
                bodyStyle={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                style={{ height: '100%' }}
              >
                Jobs
              </Card>
            </Col>
            <Col span={4}>
              <Card
                hrefLink="/login"
                extraClasses="align-center"
                bodyStyle={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                style={{ height: '100%' }}
              >
                Parts & Accessories
              </Card>
            </Col>
          </Row>
        </div>
      </Popup> */}
    </Fragment>
  );
};

export default AppNavbar;
