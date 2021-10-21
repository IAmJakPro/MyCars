import { useRouter } from 'next/router';

import Carousel, { Dots } from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';

import Container from '../../components/UIElements/Layouts/Container';
import Card from '../../components/UIElements/Card/Card';
import Row from '../../components/UIElements/Grid/Row';
import Col from '../../components/UIElements/Grid/Col';
import { useState } from 'react';
import CustomCarousel from '../../components/UIElements/Carousel/CustomCarousel';
import CarDetailsSide from '../../components/Cars/CarDetails/CarDetailsSide';
import UserDetailsSide from '../../components/Cars/CarDetails/UserDetailsSide';

const CarDetails = () => {
  const router = useRouter();
  const { carSlug } = router.query;
  /* 
  const [carousel, setCarousel] = useState({
    value: 0,
    slides: [
      <img
        src="https://listings-prod.tcimg.net/listings/191199/13/06/YH4K14AA8CA000613/PM6TD54CHTB7GRM7OADRFVQ6WA-cr-360.jpg"
        style={{ maxWidth: '100%', height: '100%', width: 'auto' }}
      />,
      <img
        src="https://listings-prod.tcimg.net/listings/191199/13/06/YH4K14AA8CA000613/PM6TD54CHTB7GRM7OADRFVQ6WA-cr-360.jpg"
        style={{ maxWidth: '100%', height: '100%', width: 'auto' }}
      />,
      <img
        src="https://content.avito.ma/gt-assets/imgs/banner-creative.png"
        style={{ maxWidth: '100%', height: '100%', width: 'auto' }}
      />,
    ],
    thumbnails: [
      <img
        src="https://content.avito.ma/gt-assets/imgs/banner-creative.png"
        width="50px"
        height="50px"
      />,
      <img
        src="https://content.avito.ma/gt-assets/imgs/banner-creative.png"
        width="50px"
        height="50px"
      />,
      <img
        src="https://content.avito.ma/gt-assets/imgs/banner-creative.png"
        width="50px"
        height="50px"
      />,
    ],
  });

  console.log('Carousel: ', carousel);
  const onchange = (value) => {
    console.log('Value: ', value);
    console.log('Carousel: ', carousel);
    setCarousel((prev) => {
      return { ...prev, value };
    });
  };
 */
  return (
    <div>
      <Container extraClasses="py-2">
        <div>Breadcrumbs</div>
        <div>
          <Row>
            <Col span={8}>
              <CarDetailsSide />
            </Col>
            <Col span={4}>
              <UserDetailsSide />
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
};

export default CarDetails;
