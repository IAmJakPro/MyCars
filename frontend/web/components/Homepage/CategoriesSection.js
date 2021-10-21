import Card from '../UIElements/Card/Card';
import Col from '../UIElements/Grid/Col';
import Row from '../UIElements/Grid/Row';
import Container from '../UIElements/Layouts/Container';

const CategoriesSection = ({ categories }) => {
  return (
    <section id="vehicle_categories" className="section">
      <Container style={{ width: '65%', textAlign: 'center' }}>
        <h2>Categories</h2>
        <Row>
          {categories.map((category) => (
            <Col span={2} style={{ margin: '1rem 0' }}>
              <Card
                image={category.image}
                imageWidth="100px"
                imageHeight="auto"
                //hrefLink={webRoutes.cars}
                extraClasses="align-center"
                bodyStyle={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                style={{ height: '100%' /* width: '100px' */ }}
                subTitle={category.name}
              ></Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default CategoriesSection;
