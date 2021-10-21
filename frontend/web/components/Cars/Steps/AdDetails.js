import Input from '../../UIElements/FormElements/Input';
import Button from '../../UIElements/FormElements/Button';
import SelectBox from '../../UIElements/FormElements/SelectBox';
import Col from '../../UIElements/Grid/Col';
import Row from '../../UIElements/Grid/Row';
import { useFormik } from 'formik';
import useLocalStorage from '../../../utils/localStorage-hook';
import { useRouter } from 'next/dist/client/router';
import CheckInput from '../../UIElements/FormElements/CheckInput';
import * as Yup from 'yup';
import Card from '../../UIElements/Card/Card';
import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import { useState } from 'react';
import { useEffect, useRef } from 'react/cjs/react.development';
import { useHttpClient } from '../../../utils/http-hook';

registerPlugin(FilePondPluginImagePreview);

const adDetailsValidationSchema = Yup.object().shape({
  title: Yup.string().min(10).max(100).required(),
  description: Yup.string().min(20).max(200).required(),
  ad_duration: Yup.number().oneOf([7, 15, 20]).required().default(7),
  price: Yup.number(),
  is_negociable: Yup.boolean().default(true),
  //images: [],
});

const AdDetails = () => {
  const { isLoading, sendRequest } = useHttpClient();
  const initialValues = {
    title: '',
    description: '',
    ad_duration: '7',
    price: '',
    is_negociable: true,
    images: [],
  };

  /* const uploadImages = async (fileList) => {
    try {
      let formData = new FormData();

      fileList.map((f) => formData.append('images', f.file));

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
  }; */

  const [details, setDetails] = useLocalStorage('ad_details', initialValues);
  const router = useRouter();
  const formik = useFormik({
    initialValues: details,
    validationSchema: adDetailsValidationSchema,
    onSubmit: (values) => {
      //uploadImages(files);
      setDetails(values);
      router.push('/cars/add/contact_details');
    },
  });

  const ref = useRef();

  function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  const [files, setFiles] = useState(details.images);

  return (
    <div id="ad_details">
      <form onSubmit={formik.handleSubmit} initialValues={formik.initialValues}>
        {/* <h2>Ad details</h2> */}
        <div id="classified" className="my-1">
          <Card title="Ad description">
            <Input
              id="title"
              type="text"
              placeholder="Title"
              value={formik.values.title}
              onChange={formik.handleChange}
              label="Title"
              error={
                formik.touched.title && formik.errors.title
                  ? formik.errors.title
                  : null
              }
            />
            <Input
              id="description"
              type="textarea"
              placeholder="Description"
              value={formik.values.description}
              onChange={formik.handleChange}
              label="Description"
              error={
                formik.touched.description && formik.errors.description
                  ? formik.errors.description
                  : null
              }
            />

            <SelectBox
              id="ad_duration"
              name="ad_duration"
              value={formik.values.ad_duration}
              onChange={(e) => formik.setFieldValue('ad_duration', e.value)}
              label="Ad duration"
              error={
                formik.touched.ad_duration && formik.errors.ad_duration
                  ? formik.errors.ad_duration
                  : null
              }
              options={[
                { label: '7', value: '7' },
                { label: '20', value: '20' },
                { label: '30', value: '30' },
              ]}
            />
          </Card>
        </div>
        <div id="price" className="my-1">
          <Card title="Price">
            <Row>
              <Col span={6}>
                <Input
                  id="price"
                  type="number"
                  placeholder="Price"
                  value={formik.values.price}
                  onChange={formik.handleChange}
                  label="Price"
                  error={
                    formik.touched.price && formik.errors.price
                      ? formik.errors.price
                      : null
                  }
                />
              </Col>
              <Col span={6}>
                <CheckInput
                  id="is_negociable"
                  name="is_negociable"
                  value={formik.values.is_negociable}
                  checked={formik.values.is_negociable}
                  label="Is negociable"
                  onChange={formik.handleChange}
                  error={
                    formik.touched.is_negociable && formik.errors.is_negociable
                      ? formik.errors.is_negociable
                      : null
                  }
                />
              </Col>
            </Row>
          </Card>
        </div>
        <div id="images" className="my-1">
          <Card title="Images">
            <FilePond
              ref={ref}
              files={files}
              allowReorder={true}
              allowMultiple={true}
              onupdatefiles={(e) => {
                setFiles(e);
                //uploadImages(e);
                formik.values.images = [];
                for (const f of e) {
                  getBase64(f.file).then((data) => {
                    console.log('DATA: ', data);
                    formik.setFieldValue('images', [
                      ...formik.values.images,
                      data,
                    ]);
                  });
                }
                /* getBase64(e[0].file).then((data) =>
                  console.log('DATA: ', data)
                ); */
              }}
              allowImagePreview={true}
              labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
            />
          </Card>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button secondary form onClick={() => router.back()}>
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

export default AdDetails;
