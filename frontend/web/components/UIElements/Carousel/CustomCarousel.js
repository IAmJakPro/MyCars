import { useState } from 'react';
import Carousel, { Dots } from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';

const CustomCarousel = ({ images, style, ...props }) => {
  const [value, setValue] = useState(0);

  const onChange = (value) => {
    setValue(value);
  };

  return (
    <div>
      <Carousel value={value} onChange={onChange} plugins={['arrows']}>
        {images.map((image) => (
          <img
            src={image}
            style={{ maxWidth: '100%', height: '100%', width: 'auto' }}
          />
        ))}
      </Carousel>
      <Dots
        value={value}
        onChange={onChange}
        thumbnails={images.map((image) => (
          <img src={image} width="80px" height="60px" />
        ))}
      />
    </div>
  );
};

export default CustomCarousel;
