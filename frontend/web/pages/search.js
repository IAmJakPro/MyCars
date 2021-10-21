import axios from 'axios';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import Filters from '../components/Cars/Search/Filters';
import LayoutSort from '../components/Cars/Search/LayoutSort';
import Results from '../components/Cars/Search/Results';
import TopPanel from '../components/Cars/Search/TopPanel';
import Col from '../components/UIElements/Grid/Col';
import Row from '../components/UIElements/Grid/Row';
import Container from '../components/UIElements/Layouts/Container';
import Pagination from '../components/UIElements/Pagination/Pagination';
import Spinner from '../components/UIElements/Spinner/Spinner';
import { vehicleSchema } from '../utils/constants';

const CarSearchPage = ({
  cities,
  categories,
  brands,
  vehicles,
  pagination,
}) => {
  const [displayLayout, setDisplayLayout] = useState('vertical');
  const [sortBy, setSortBy] = useState();
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

  const [pagin, setPagin] = useState(pagination);

  const onFiltersHandler = (values) => {
    router.push({ pathname: '/search', query: values }, undefined, {
      shallow: true,
    });
  };

  const getRequestUrl = useCallback(() => {
    const query = router.query;
    const newQuery = [];
    for (let q in query) {
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

    const { page = 1, limit = 12, search = '' } = query;

    let url = `${process.env.NEXT_PUBLIC_API_URL}/api/vehicles?page=${page}&limit=${limit}&search=${search}`;

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

    return url;
  }, [router]);

  const onDisplayLayoutHandler = (value) => {
    console.log(value);
    setDisplayLayout(value);
  };

  const onSortMethodHandler = (value) => {
    const q = { ...router.query };
    router.push(
      { pathname: '/search', query: { ...q, sort: value.target.value } },
      undefined,
      {
        shallow: true,
      }
    );
  };

  const getNewPagination = (p) => {
    setPagin(p);
  };

  const onPaginate = (page) => {
    const q = { ...router.query };
    router.push(
      { pathname: '/search', query: { ...q, page: page } },
      undefined,
      {
        shallow: true,
      }
    );
  };

  const onSearch = (event) => {
    const value = event.target.value;
    if (event.key == 'Enter') {
      const q = { ...router.query };
      router.push(
        { pathname: '/search', query: { ...q, search: value } },
        undefined,
        {
          shallow: true,
        }
      );
    }
  };

  useEffect(() => {
    console.log('Re-rendering...');
  }, []);

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
            onSearch={onSearch}
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
              <Results
                layout={displayLayout}
                results={vehicles}
                requestUrl={getRequestUrl()}
                newPagination={getNewPagination}
                hasQuery={Object.entries(router.query).length > 0}
              />
            </Col>
          </Row>
          <Pagination
            className="pagination-bar"
            currentPage={pagin.currentPage}
            totalCount={pagin.totalRecords}
            pageSize={pagin.perPage}
            onPageChange={onPaginate}
          />
        </Container>
      </div>
    </div>
  );
};

export default CarSearchPage;

export const getStaticProps = async ({
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

  let pagination = {
    totalPages: 0,
    totalRecords: 0,
    currentPage: 1,
    perPage: 12,
  };

  const vehicles = await axios
    .get(`${process.env.PRIVATE_API_URL}/api/vehicles?limit=12`, {
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
