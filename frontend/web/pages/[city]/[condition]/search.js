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
import { conditions, vehicleSchema } from '../../../utils/constants';
import { useRouter } from 'next/router';

const SearchPage = ({ vehicles, brands, categories, cities, pagination }) => {
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

  const router = useRouter();

  const onFiltersHandler = (values) => {
    console.log(values);
  };

  const onDisplayLayoutHandler = (value) => {
    console.log(value);
    setDisplayLayout(value);
  };

  const onSortMethodHandler = (value) => {};

  const onPaginate = (page) => {
    console.log(router);
    let url = router.asPath;
    console.log(conditions.find((c) => c.id == router.query.condition));
    router.push({
      pathname: url,
      query: { page },
    });
  };

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
            currentPage={pagination.currentPage}
            totalCount={pagination.totalRecords}
            pageSize={pagination.perPage}
            onPageChange={onPaginate}
          />
        </Container>
      </div>
    </div>
  );
};

export default SearchPage;

export const getServerSideProps = async ({
  locale,
  params,
  query,
  resolvedUrl,
}) => {
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
          }/${conditionObj ? conditionObj[locale] : avaibleCondition[locale]}/${
            resolvedUrl.split('/')[2]
          }`
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

  console.log(query);

  const newQuery = [];

  for (let q in query) {
    if (q === 'condition') {
      query[q] = conditionId;
    }

    let startsWith = '';

    if (q.startsWith('min_')) {
      q = q.replace('min_', '');
      startsWith = 'min_';
    }

    if (q.startsWith('max_')) {
      q = q.replace('max_', '');
      startsWith = 'max_';
    }

    for (const vs in vehicleSchema) {
      if (vs == 'vehicle_details') {
        for (const subVS in vehicleSchema[vs]) {
          if (vehicleSchema[vs][subVS].includes(q)) {
            newQuery.push({
              key: `${startsWith}${vs}.${subVS}.${q}`,
              value: query[startsWith + q],
            });
          }
        }
      } else {
        if (vehicleSchema[vs].includes(q)) {
          newQuery.push({
            key: `${startsWith}${vs}.${q}`,
            value: query[startsWith + q],
          });
        }
      }
    }
  }

  const { page = 1, limit = 1, search = '' } = query;

  let url = `${process.env.PRIVATE_API_URL}/api/vehicles?page=${page}&limit=${limit}&search=${search}`;

  for (const q of newQuery) {
    if (!q.value) continue;
    if (Array.isArray(q.value)) {
      if (q.value.length < 1) continue;
      for (const v of q.value) {
        const symbol = url.includes('?') ? '&' : '?';
        url += `${symbol}${q.key}=${v}`;
      }
    } else {
      const symbol = url.includes('?') ? '&' : '?';
      url += `${symbol}${q.key}=${q.value}`;
    }
  }

  console.log(newQuery);

  console.log(url);

  let pagination;

  const vehicles = await axios
    .get(url, {
      headers: { 'Accept-Language': locale },
    })
    .then((res) => {
      pagination = res.data.pagination;
      return res.data.data;
    })
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
      pagination,
    },
  };
};
