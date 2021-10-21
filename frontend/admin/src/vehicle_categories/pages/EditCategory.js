import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useHttpClient } from '../../hooks/http-hook';
import EditCategoryForm from '../components/EditCategoryForm';

const EditCategory = () => {
  const categoryId = useParams().id;
  const [category, setCategory] = useState();
  const { isLoading, sendRequest } = useHttpClient();
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_API_URL}/api/categories/${categoryId}`
        );
        console.log(responseData);
        setCategory(responseData.data);
      } catch (err) {}
    };
    fetchCategory();
  }, [sendRequest, categoryId]);
  return (
    <div id="edit-category">
      {!isLoading && category && <EditCategoryForm category={category} />}
    </div>
  );
};

export default EditCategory;
