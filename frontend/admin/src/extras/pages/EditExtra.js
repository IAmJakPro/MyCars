import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useHttpClient } from '../../hooks/http-hook';
import EditExtraForm from '../components/EditExtraForm';

const EditExtra = () => {
  const extraId = useParams().id;
  const [extra, setExtra] = useState();
  const { isLoading, sendRequest } = useHttpClient();
  useEffect(() => {
    const fetchExtra = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_API_URL}/api/extras/${extraId}`
        );
        console.log(responseData);
        setExtra(responseData.data);
      } catch (err) {}
    };
    fetchExtra();
  }, [sendRequest, extraId]);
  return (
    <div id="edit-extra">
      {!isLoading && extra && <EditExtraForm extra={extra} />}
    </div>
  );
};

export default EditExtra;
