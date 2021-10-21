import Card from '../../UIElements/Card/Card';
import Col from '../../UIElements/Grid/Col';
import Row from '../../UIElements/Grid/Row';
import ResultItem from './ResultItem';
import SelectBox from '../../UIElements/FormElements/SelectBox';

import styles from './Results.module.scss';
import LayoutSort from './LayoutSort';
import { useEffect, useState } from 'react';
import { useHttpClient } from '../../../utils/http-hook';
import Spinner from '../../UIElements/Spinner/Spinner';

const Results = ({ layout, results, requestUrl, newPagination, hasQuery }) => {
  const { isLoading, sendRequest } = useHttpClient();
  const [vehicles, setVehicles] = useState(hasQuery ? [] : results);
  useEffect(() => {
    if (requestUrl && hasQuery) {
      const fetchVehicles = async () => {
        console.log(requestUrl);
        try {
          const response = await sendRequest(requestUrl);
          console.log('This is the response: ', response);
          setVehicles(response.data);
          if (response.pagination) {
            newPagination(response.pagination);
          }
        } catch (err) {
          console.log(err);
        }
      };
      fetchVehicles();
    }
  }, [requestUrl]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div>
      {layout !== 'horizontal' && (
        <Row>
          {vehicles.map((r) => {
            const { vehicle_details, ad_details } = r;
            return (
              <Col span={4} extraClasses="mb-2">
                <ResultItem
                  layout={layout}
                  title={ad_details.title}
                  price={ad_details.price}
                  is_negociable={ad_details.is_negociable}
                  images={ad_details.images}
                  brand={vehicle_details.general.brand}
                  model={vehicle_details.general.model}
                  category={vehicle_details.general.category}
                  crashed={vehicle_details.general.crashed}
                  transmission={vehicle_details.engine.transmission}
                  fuel_type={vehicle_details.engine.fuel_type}
                />
              </Col>
            );
          })}
        </Row>
      )}

      {layout === 'horizontal' &&
        vehicles.map((r) => {
          const { vehicle_details, ad_details } = r;
          return (
            <div>
              <ResultItem
                layout={layout}
                title={ad_details.title}
                price={ad_details.price}
                is_negociable={ad_details.is_negociable}
                images={ad_details.images}
                brand={vehicle_details.general.brand}
                model={vehicle_details.general.model}
                category={vehicle_details.general.category}
                crashed={vehicle_details.general.crashed}
                year={vehicle_details.general.year}
                transmission={vehicle_details.engine.transmission}
                fuel_type={vehicle_details.engine.fuel_type}
              />
            </div>
          );
        })}
    </div>
  );
};

export default Results;
