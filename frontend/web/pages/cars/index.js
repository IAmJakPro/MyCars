import Container from '../../components/UIElements/Layouts/Container';
import Row from '../../components/UIElements/Grid/Row';
import Col from '../../components/UIElements/Grid/Col';
import Filters from '../../components/Cars/Search/Filters';
import Results from '../../components/Cars/Search/Results';
import LayoutSort from '../../components/Cars/Search/LayoutSort';
import TopPanel from '../../components/Cars/Search/TopPanel';
import { useState } from 'react';
import Pagination from '../../components/UIElements/Pagination/Pagination';
import axios from 'axios';

const Cars = ({ vehicles, brands, categories, cities }) => {
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
export default Cars;

export async function getStaticProps({ locale }) {
  const vehicles = await axios
    .get(`${process.env.PRIVATE_API_URL}/api/vehicles`, {
      headers: { 'Accept-Language': locale },
    })
    .then((res) => res.data.data)
    .catch((err) => {
      console.log(err);
      return [];
    });

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

  return {
    props: {
      vehicles,
      brands,
      categories,
      cities,
    },
  };
}
