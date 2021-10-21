import webRoutes from '../../utils/webRoutes';
import Card from '../UIElements/Card/Card';
import Col from '../UIElements/Grid/Col';
import Row from '../UIElements/Grid/Row';
import Container from '../UIElements/Layouts/Container';

const AdTypeSection = () => {
  return (
    <section id="ad_type" className="section">
      <Container>
        <div style={{ width: '70%', margin: '0 auto' }}>
          <Row>
            <Col span={12} md={4}>
              <Card
                //image="https://content.avito.ma/autoneuf/images/a0/a049563a-fef8-4c70-8470-4bc664db8a58?t=logo_120_120"
                image="https://content.avito.ma/gt-assets/imgs/banner-creative.png"
                //imageWidth="100px"
                imageHeight="auto"
                hrefLink={webRoutes.cars}
                extraClasses="align-center"
                bodyStyle={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                style={{ height: '100%', padding: '.5rem' }}
              >
                Cars
              </Card>
            </Col>
            <Col span={12} md={4}>
              <Card
                image="https://content.avito.ma/gt-assets/imgs/banner-creative.png"
                imageHeight="auto"
                hrefLink={webRoutes.cars}
                extraClasses="align-center"
                bodyStyle={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                style={{ height: '100%', padding: '.5rem' }}
              >
                Jobs
              </Card>
            </Col>
            <Col span={12} md={4}>
              <Card
                image="https://content.avito.ma/gt-assets/imgs/banner-creative.png"
                imageHeight="auto"
                hrefLink={webRoutes.cars}
                extraClasses="align-center"
                bodyStyle={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                style={{ height: '100%', padding: '.5rem' }}
              >
                Parts & accessoroes
              </Card>
            </Col>
          </Row>
        </div>
      </Container>
    </section>
  );
};

export default AdTypeSection;
