import axios from 'axios';
import { useRouter } from 'next/dist/client/router';
import { useRef, useEffect, useState } from 'react';
import ContactDetails from '../../../components/Cars/Steps/ContactDetails';
import Card from '../../../components/UIElements/Card/Card';
import Container from '../../../components/UIElements/Layouts/Container';
import StepsProgress from '../../../components/UIElements/StepsProgress/StepsProgress';
import useLocalStorage from '../../../utils/localStorage-hook';

const ContactDetailsPage = ({ cities }) => {
  const [vd] = useLocalStorage('vehicle_details');
  const [ad] = useLocalStorage('ad_details');

  const isMounted = useRef(true);

  const router = useRouter();

  if (!vd) {
    isMounted.current = false;
    router.replace('/cars/add/vehicle_details');
  } else if (!ad) {
    isMounted.current = false;
    router.replace('/cars/add/ad_details');
  }

  if (!isMounted.current) return <p></p>;

  return (
    <div>
      <Container>
        <StepsProgress
          steps={['Vehicle details', 'Ad details', 'Contact details']}
          currentStep={3}
        />
        <Card>
          <ContactDetails cities={cities} />
        </Card>
      </Container>
    </div>
  );
};

export async function getStaticProps({ locale }) {
  const cities = await axios
    .get(`${process.env.PRIVATE_API_URL}/api/cities`, {
      headers: { 'Accept-Language': locale },
    })
    .then((res) => res.data.data)
    .catch((err) => {
      console.log(err.response);
      return [];
    });

  return {
    props: {
      cities,
    },
  };
}

export default ContactDetailsPage;
