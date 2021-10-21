import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useHttpClient } from '../../hooks/http-hook';
import EditBrandForm from '../components/EditBrandForm';

const EditBrand = () => {
  const brandId = useParams().id;
  const [brand, setBrand] = useState();
  const { isLoading, sendRequest } = useHttpClient();
  useEffect(() => {
    const fetchBrand = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_API_URL}/api/brands/${brandId}`
        );
        console.log(responseData);
        setBrand(responseData.data);
      } catch (err) {}
    };
    fetchBrand();
  }, [sendRequest, brandId]);
  return (
    <div id="edit-brand">
      {!isLoading && brand && <EditBrandForm brand={brand} />}
    </div>
  );
};

export default EditBrand;
