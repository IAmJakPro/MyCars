import Card from '../UIElements/Card/Card';
import Col from '../UIElements/Grid/Col';
import Row from '../UIElements/Grid/Row';
import Container from '../UIElements/Layouts/Container';

const BrandsSection = ({ brands }) => {
  return (
    <section id="brands" className="section">
      <Container>
        <h2>Brands</h2>
        <Row>
          {brands.map((brand) => (
            <Col span={3} md={2} style={{ margin: '1rem 0' }}>
              <Card
                image={`${brand.image}?ignoreCache=1`}
                imageWidth="auto"
                imageHeight="40px"
                //hrefLink={webRoutes.cars}
                extraClasses="align-center"
                bodyStyle={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                style={{ height: '100%', padding: '5px' }}
                subTitle={brand.name}
              ></Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default BrandsSection;
