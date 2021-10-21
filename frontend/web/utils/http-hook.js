import axios from 'axios';
import { useState, useCallback } from 'react';

export const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState(false);

  const sendRequest = useCallback(
    async (url, method = 'GET', body = null, auth = false, headers = {}) => {
      setIsLoading(true);

      try {
        let response;
        if (auth) {
          if (body instanceof FormData) {
            const res = await sendRequest('/api/checkAuth', 'POST', {
              key: 'check_auth_key',
            });
            const token = res.token;
            response = await axios({
              url,
              method,
              headers: {
                ...headers,
                authorization: 'Bearer ' + token,
                'Content-Type': 'multipart/form-data',
              },
              // Attaching the form data
              data: body,
            });
          } else {
            response = await axios.post('/api/authRequestHandler', {
              requestUrl: url,
              requestType: method,
              ...body,
            });
          }
        } else {
          response = await axios({
            url,
            headers,
            method,
            data: body,
          });
        }

        const responseData = response.data;
        setIsLoading(false);
        return responseData;
      } catch (err) {
        setIsLoading(false);
        throw err;
      }
    },
    []
  );

  return { isLoading, sendRequest };
};
