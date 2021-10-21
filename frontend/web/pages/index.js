import axios from 'axios';
import { useRouter } from 'next/dist/client/router';
import { Fragment } from 'react';

import AppHeader from '../components/AppHeader';
import AdTypeSection from '../components/Homepage/AdTypeSection';
import BrandsSection from '../components/Homepage/BrandsSection';
import CategoriesSection from '../components/Homepage/CategoriesSection';

export default function Home({ cities, brands, categories }) {
  const router = useRouter();
  return (
    <Fragment>
      <AppHeader cities={cities} />
      {/* <AdTypeSection /> */}
      <BrandsSection brands={brands} />
      <CategoriesSection categories={categories} />
    </Fragment>
  );
}

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

  const brands = await axios
    .get(`${process.env.PRIVATE_API_URL}/api/brands?limit=30`, {
      headers: { 'Accept-Language': locale },
    })
    .then((res) => res.data.data)
    .catch((err) => {
      console.log(err.response);
      return [];
    });

  const categories = await axios
    .get(`${process.env.PRIVATE_API_URL}/api/categories?limit=20`, {
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
      brands,
      categories,
    },
  };
}
