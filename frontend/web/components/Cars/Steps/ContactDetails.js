import Input from '../../UIElements/FormElements/Input';
import Button from '../../UIElements/FormElements/Button';
import SelectBox from '../../UIElements/FormElements/SelectBox';
import Option from '../../UIElements/FormElements/Option';
import Col from '../../UIElements/Grid/Col';
import Row from '../../UIElements/Grid/Row';
import { useContext, useEffect, useMemo, useState } from 'react';
import UserContext from '../../../utils/userContext';
import useSWR from 'swr';
import { useHttpClient } from '../../../utils/http-hook';
import { useFormik } from 'formik';
import useLocalStorage from '../../../utils/localStorage-hook';
import { useRouter } from 'next/dist/client/router';

const ContactDetails = ({ cities }) => {
  const { state, dispatch } = useContext(UserContext);
  const [user, setUser] = useState({});
  const { isLoading, sendRequest } = useHttpClient();
  useEffect(() => {
    if (state.isAuthenticated) {
      const fetchUser = async () => {
        try {
          const response = await sendRequest(
            `${process.env.NEXT_PUBLIC_API_URL}/api/users/me`,
            'GET',
            {},
            true
          );
          setUser(response.data);
          formik.setFieldValue('name', response.data.name);
          formik.setFieldValue('email', response.data.email);
          formik.setFieldValue('phone', response.data.phone);
          formik.setFieldValue('city', response.data.city);
        } catch (err) {}
      };
      fetchUser();
    }
  }, [state.isAuthenticated]);

  const [details, setDetails] = useLocalStorage('contact_details', {
    name: '',
    email: '',
    phone: '',
    city: '',
    password: '',
  });
  const [vehicle_details, setVehicleDetails] =
    useLocalStorage('vehicle_details');
  const [ad_details, setAdDetails] = useLocalStorage('ad_details');

  const loginHandler = async ({ email, password }) => {
    try {
      const responseData = await sendRequest('/api/login', 'POST', {
        email,
        password,
      });
      console.log('ResponseData: ', responseData);

      return responseData.data.id;
    } catch (err) {}
  };

  const registerHandler = async ({ email, password, phone, name, city }) => {
    try {
      const apiResponse = await sendRequest(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users/register`,
        'POST',
        {
          name,
          email,
          password,
          phone,
          city,
        }
      );

      if (apiResponse.status === 'success') {
        console.log(apiResponse);
        return apiResponse.data.id;
      } else {
        console.log('Error!');
      }
    } catch (err) {}
  };

  /**
   * Convert a base64 string in a Blob according to the data and contentType.
   *
   * @param b64Data {String} Pure base64 string without contentType
   * @param contentType {String} the content type of the file i.e (image/jpeg - image/png - text/plain)
   * @param sliceSize {Int} SliceSize to process the byteCharacters
   * @see http://stackoverflow.com/questions/16245767/creating-a-blob-from-a-base64-string-in-javascript
   * @return Blob
   */
  function b64toBlob(b64Data, contentType, sliceSize) {
    contentType = contentType || 'image/jpeg';
    sliceSize = sliceSize || 512;

    var byteCharacters = atob(b64Data);
    var byteArrays = [];

    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      var slice = byteCharacters.slice(offset, offset + sliceSize);

      var byteNumbers = new Array(slice.length);
      for (var i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      var byteArray = new Uint8Array(byteNumbers);

      byteArrays.push(byteArray);
    }

    var blob = new Blob(byteArrays, { type: contentType });
    return blob;
  }

  async function urltoFile(url, filename, mimeType) {
    const res = await fetch(url);
    const buf = await res.arrayBuffer();
    return new File([buf], filename, { type: mimeType });
  }
  const uploadImages = async () => {
    try {
      let formData = new FormData();
      ad_details.images.map((image, i) => {
        var block = image.split(';');
        // Get the content type of the image
        var contentType = block[0].split(':')[1]; // In this case "image/gif"
        // get the real base64 content of the file
        var realData = block[1].split(',')[1]; // In this case "R0lGODlhPQBEAPeoAJosM...."

        // Convert it to a blob to upload
        var blob = b64toBlob(realData, contentType);
        //urltoFile(image, 'anything.png', contentType);

        formData.append(
          'images',
          blob,
          `image-${i}.${contentType.split('/')[1]}`
        );
      });

      const response = await sendRequest(
        `${process.env.NEXT_PUBLIC_API_URL}/api/vehicles/upload`,
        'POST',
        formData,
        true
      );
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  const submitHandler = async (values) => {
    let id = user.id;

    if (!state.isAuthenticated) {
      id = await registerHandler(values);
      if (id) {
        await loginHandler(values);
      }
    }

    //uploadImages();

    try {
      let formData = new FormData();

      if (ad_details.images && ad_details.images.length > 0) {
        const fileList = [];
        ad_details.images.map((image, i) => {
          // Split the base64 string in data and contentType
          var block = image.split(';');
          // Get the content type of the image
          var contentType = block[0].split(':')[1]; // In this case "image/gif"
          // get the real base64 content of the file
          var realData = block[1].split(',')[1]; // In this case "R0lGODlhPQBEAPeoAJosM...."

          // Convert it to a blob to upload
          var blob = b64toBlob(realData, contentType);

          formData.append(
            'images',
            blob,
            `image-${i}.${contentType.split('/')[1]}`
          );
        });
        //formData.append('images', fileList);
        //delete ad_details.images;
        //fileList.map((f) => formData.append('ad_details.images', f));
      }

      for (const key in vehicle_details) {
        for (const f in vehicle_details[key]) {
          if (vehicle_details[key][f] === 'null' || !vehicle_details[key][f])
            continue;
          formData.append(
            `vehicle_details.${key}.${f}`,
            vehicle_details[key][f]
          );
        }
      }

      for (const key in ad_details) {
        if (key != 'images') {
          formData.append(`ad_details.${key}`, ad_details[key]);
        }
      }

      for (const key in values) {
        formData.append(`contact_details.${key}`, values[key]);
      }

      formData.append('user', id);

      const response = await sendRequest(
        `${process.env.NEXT_PUBLIC_API_URL}/api/vehicles`,
        'POST',
        formData,
        /* {
          vehicle_details,
          ad_details,
          contact_details: values,
          user: id,
        }, */
        true
      );
      console.log('response of storing: ', response);
      if (response.status === 'success') {
        localStorage.removeItem('vehicle_details');
        localStorage.removeItem('ad_details');
        localStorage.removeItem('contact_details');
        /* setVehicleDetails();
        setAdDetails();
        setDetails(); */
        dispatch({ type: 'login' });
        return router.replace('/');
      } else {
        console.log('Error!');
      }
    } catch (err) {}
  };

  const router = useRouter();
  const formik = useFormik({
    initialValues: details,
    onSubmit: (values) => {
      submitHandler(values);
    },
  });

  return (
    <div id="ontact_details">
      <form onSubmit={formik.handleSubmit} initialValues={formik.initialValues}>
        <h2>Contact details</h2>
        <div>
          <Row>
            <Col span={4}>
              <Input
                id="name"
                type="text"
                placeholder="Name"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                label="Name"
                error={
                  formik.touched.name && formik.errors.name
                    ? formik.errors.name
                    : null
                }
              />
            </Col>
            <Col span={4}>
              <Input
                id="email"
                type="email"
                placeholder="Email"
                name="email"
                disabled={state.isAuthenticated && user.email}
                value={formik.values.email}
                onChange={formik.handleChange}
                label="Email"
                error={
                  formik.touched.email && formik.errors.email
                    ? formik.errors.email
                    : null
                }
              />
            </Col>
            <Col span={4}>
              <Input
                id="phone"
                type="text"
                placeholder="phone"
                name="phone"
                disabled={state.isAuthenticated && user.phone}
                value={formik.values.phone}
                onChange={formik.handleChange}
                label="phone"
                error={
                  formik.touched.phone && formik.errors.phone
                    ? formik.errors.phone
                    : null
                }
              />
            </Col>
            <Col span={4}>
              <SelectBox
                id="city"
                name="city"
                value={formik.values.city}
                onChange={(e) => formik.setFieldValue('city', e.value)}
                label="City"
                error={
                  formik.touched.city && formik.errors.city
                    ? formik.errors.city
                    : null
                }
                options={cities.map((c) => ({ label: c.name, value: c.id }))}
              />
            </Col>

            {!state.isAuthenticated && (
              <Col span={4}>
                <Input
                  id="password"
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  label="Password"
                  error={
                    formik.touched.password && formik.errors.password
                      ? formik.errors.password
                      : null
                  }
                />
              </Col>
            )}
          </Row>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button secondary form type="button" onClick={() => router.back()}>
            Back
          </Button>
          <Button form type="submit">
            Next
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ContactDetails;
