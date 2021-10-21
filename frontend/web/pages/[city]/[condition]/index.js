import Container from '../../../components/UIElements/Layouts/Container';
import Row from '../../../components/UIElements/Grid/Row';
import Col from '../../../components/UIElements/Grid/Col';
import Filters from '../../../components/Cars/Search/Filters';
import Results from '../../../components/Cars/Search/Results';
import LayoutSort from '../../../components/Cars/Search/LayoutSort';
import TopPanel from '../../../components/Cars/Search/TopPanel';
import { useState } from 'react';
import Pagination from '../../../components/UIElements/Pagination/Pagination';
import axios from 'axios';
import { conditions } from '../../../utils/constants';

const CarsSearch = ({ vehicles, brands, categories, cities }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [displayLayout, setDisplayLayout] = useState('vertical');
  const [sortBy, setSortBy] = useState({
    label: 'Matched',
    value: 'matched',
  });
  const sortOptions = [
    {
      label: 'Matched',
      value: 'matched',
    },
    {
      label: 'Popular',
      value: 'popular',
    },
    {
      label: 'New',
      value: 'new',
    },
  ];

  const onFiltersHandler = (values) => {
    console.log(values);
  };

  const onDisplayLayoutHandler = (value) => {
    console.log(value);
    setDisplayLayout(value);
  };

  const onSortMethodHandler = (value) => {};
  return (
    <div>
      <TopPanel />
      <div className="py-2">
        <Container>
          <LayoutSort
            sort={sortBy}
            layout={displayLayout}
            onLayout={onDisplayLayoutHandler}
            onSort={onSortMethodHandler}
            sortOptions={sortOptions}
          />
          <Row>
            <Col span={3}>
              <Filters
                onFilters={onFiltersHandler}
                brands={brands}
                categories={categories}
                cities={cities}
              />
            </Col>
            <Col span={9}>
              <Results layout={displayLayout} results={vehicles} />
            </Col>
          </Row>
          <Pagination
            className="pagination-bar"
            currentPage={currentPage}
            totalCount={1000}
            pageSize={10}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </Container>
      </div>
    </div>
  );
};

export default CarsSearch;

export async function getStaticPaths() {
  const cities = await axios
    .get(`${process.env.PRIVATE_API_URL}/api/cities`)
    .then((res) => res.data.data)
    .catch((err) => {
      console.log(err.response);
      return [];
    });

  const paths = [];

  for (let city of cities) {
    for (let condition of conditions) {
      paths.push(
        {
          params: { city: city.key.fr, condition: condition.fr },
          locale: 'fr',
        },
        {
          params: { city: city.key.ar, condition: condition.ar },
          locale: 'ar',
        }
      );
    }
  }
  return { paths, fallback: 'blocking' };
}

export async function getStaticProps({ locale, params }) {
  const brands = await axios
    .get(`${process.env.PRIVATE_API_URL}/api/brands`, {
      headers: { 'Accept-Language': locale },
    })
    .then((res) => res.data.data)
    .catch((err) => {
      console.log(err);
      return [];
    });

  const categories = await axios
    .get(`${process.env.PRIVATE_API_URL}/api/categories`, {
      headers: { 'Accept-Language': locale },
    })
    .then((res) => res.data.data)
    .catch((err) => {
      console.log(err);
      return [];
    });

  const cities = await axios
    .get(`${process.env.PRIVATE_API_URL}/api/cities`, {
      headers: { 'Accept-Language': locale },
    })
    .then((res) => res.data.data)
    .catch((err) => {
      console.log(err.response);
      return [];
    });

  //#1 - Get the city and condition
  const { city, condition } = params;

  const cityObj = cities.find((c) => c.key[locale] == city);
  const conditionObj = conditions.find((c) => c[locale] == condition);

  if (!cityObj || !conditionObj) {
    const oppositeLocale = locale === 'fr' ? 'ar' : 'fr';
    const avaibleCity = cities.find((c) => c.key[oppositeLocale] == city);
    const avaibleCondition = conditions.find(
      (c) => c[oppositeLocale] == condition
    );

    if ((!cityObj && !avaibleCity) || (!conditionObj && !avaibleCondition)) {
      return {
        notFound: true,
      };
    }

    return {
      redirect: {
        destination: encodeURI(
          `/${locale}/${
            cityObj ? cityObj.key[locale] : avaibleCity.key[locale]
          }/${conditionObj ? conditionObj[locale] : avaibleCondition[locale]}`
        ),
        permanent: false,
      },
    };
  }

  let conditionId;

  if (conditionObj) {
    conditionId = conditionObj.id;
  } else {
    conditionId = avaibleCondition.id;
  }

  const vehicles = await axios
    .get(
      `${process.env.PRIVATE_API_URL}/api/vehicles?vehicle_details.general.condition=${conditionId}&contact_details.city=${city}`,
      {
        headers: { 'Accept-Language': locale },
      }
    )
    .then((res) => res.data.data)
    .catch((err) => {
      console.log(err);
      return [];
    });

  return {
    props: {
      vehicles,
      brands,
      categories,
      cities,
    },
    revalidate: 10,
  };
}
