import { useRouter } from 'next/dist/client/router';
import { useRef } from 'react';
import { useEffect, useState } from 'react/cjs/react.development';
import AdDetails from '../../../components/Cars/Steps/AdDetails';
import Card from '../../../components/UIElements/Card/Card';
import Container from '../../../components/UIElements/Layouts/Container';
import StepsProgress from '../../../components/UIElements/StepsProgress/StepsProgress';
import useLocalStorage from '../../../utils/localStorage-hook';

const AdDetailsPage = () => {
  const [vd] = useLocalStorage('vehicle_details');

  const router = useRouter();

  const isMounted = useRef(false);

  if (!vd) {
    router.replace('/cars/add/vehicle_details');
  }
  isMounted.current = true;

  console.log(isMounted.current);

  if (!isMounted.current) return <p></p>;

  return (
    <div>
      <Container>
        <StepsProgress
          steps={['Vehicle details', 'Ad details', 'Contact details']}
          currentStep={2}
        />
        <AdDetails />
      </Container>
    </div>
  );
};

export default AdDetailsPage;
