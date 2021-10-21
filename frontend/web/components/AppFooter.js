import styles from './AppFooter.module.scss';
import Container from './UIElements/Layouts/Container';
import Row from './UIElements/Grid/Row';
import Col from './UIElements/Grid/Col';

const AppFooter = (props) => {
  return (
    <footer className={styles.footer}>
      <Container>
        <Row>
          <Col span={4} extraClasses="flex-center-x">
            <div id="pages">
              <h3>Pages</h3>
              <ul>
                <li>
                  <a href="#">Home</a>
                </li>
                <li>
                  <a href="#">About us</a>
                </li>
                <li>
                  <a href="#">Contact us</a>
                </li>
                <li>
                  <a href="#">Privacy policy</a>
                </li>
                <li>
                  <a href="#">FAQs</a>
                </li>
              </ul>
            </div>
          </Col>
          <Col span={4} extraClasses="flex-center-x">
            <div id="links">
              <h3>Links</h3>
              <ul>
                <li>
                  <a href="#">Login</a>
                </li>
                <li>
                  <a href="#">Register</a>
                </li>
                <li>
                  <a href="#">Cars</a>
                </li>
                <li>
                  <a href="#">Jobs</a>
                </li>
                <li>
                  <a href="#">Parts & Accessories</a>
                </li>
              </ul>
            </div>
          </Col>
          <Col span={4} extraClasses="flex-center-x">
            <div id="follow">
              <h3>Follow us</h3>
              <ul>
                <li>
                  <a href="#">Instagram</a>
                </li>
                <li>
                  <a href="#">Youtube</a>
                </li>
                <li>
                  <a href="#">Facebook</a>
                </li>
                <li>
                  <a href="#">Tiktok</a>
                </li>
                <li>
                  <a href="#">Twitter</a>
                </li>
              </ul>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default AppFooter;
