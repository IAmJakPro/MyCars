import axios from 'axios';
import { useEffect, useState } from 'react/cjs/react.development';
import VehicleDetails from '../../../components/Cars/Steps/VehicleDetails';
import Card from '../../../components/UIElements/Card/Card';
import Container from '../../../components/UIElements/Layouts/Container';
import StepsProgress from '../../../components/UIElements/StepsProgress/StepsProgress';
import useLocalStorage from '../../../utils/localStorage-hook';
import { useAmp } from 'next/amp';

export const config = { amp: 'hybrid' };

const VehicleDetailsPage = ({ brands, categories }) => {
  const isAmp = useAmp();
  const [details] = useLocalStorage('vehicle_details');
  let models = [];
  if (details) {
    const brand = brands.find((b) => b.id === details.general.brand);
    if (brand) {
      models = brand.models;
    }
  }
  console.log('AMP: ', isAmp);
  return (
    <div>
      <Container>
        {isAmp && (
          <p>Test</p>
        )}
        <StepsProgress
          steps={['Vehicle details', 'Ad details', 'Contact details']}
          currentStep={1}
        />
        <VehicleDetails
          categories={categories}
          brands={brands}
          defaultModels={models}
        />
      </Container>
    </div>
  );
};

export default VehicleDetailsPage;

export async function getStaticProps({ locale }) {
  const brands = await axios
    .get(`${process.env.PRIVATE_API_URL}/api/brands`, {
      headers: { 'Accept-Language': locale },
    })
    .then((res) => res.data.data)
    .catch((err) => {
      console.log(err.response);
      return [];
    });

  const categories = await axios
    .get(`${process.env.PRIVATE_API_URL}/api/categories`, {
      headers: { 'Accept-Language': locale },
    })
    .then((res) => res.data.data)
    .catch((err) => {
      console.log(err.response);
      return [];
    });

  return {
    props: {
      brands,
      categories,
    },
  };
}
