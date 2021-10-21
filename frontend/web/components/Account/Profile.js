import Card from '../UIElements/Card/Card';
import SelectBox from '../UIElements/FormElements/SelectBox';
import Input from '../UIElements/FormElements/Input';
import './Profile.module.scss';
import { useFormik } from 'formik';
import Button from '../UIElements/FormElements/Button';
import { useHttpClient } from '../../utils/http-hook';
import axios from 'axios';
import ChangePassword from './ChangePassword';

const Profile = ({ name, email, phone, city }) => {
  const { isLoading, sendRequest } = useHttpClient();
  const updateProfileHandler = async (values) => {
    try {
      const response = await sendRequest(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users/update-me`,
        'PATCH',
        values,
        true
      );
      console.log('Response: ', response);
    } catch (err) {
      console.log(err);
    }
  };

  const formik = useFormik({
    initialValues: {
      email,
      name,
      phone,
      city,
    },
    //validationSchema: registerValidationSchema,
    onSubmit: (values) => {
      console.log(values);
      updateProfileHandler(values);
    },
  });

  return (
    <div>
      <Card>
        <form onSubmit={formik.handleSubmit}>
          <Input
            id="name"
            type="text"
            placeholder="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            label="name"
            error={
              formik.touched.name && formik.errors.name
                ? formik.errors.name
                : null
            }
          />

          <Input
            id="email"
            type="email"
            placeholder="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            label="Email"
            error={
              formik.touched.email && formik.errors.email
                ? formik.errors.email
                : null
            }
          />

          <Input
            id="phone"
            type="text"
            placeholder="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            label="phone"
            error={
              formik.touched.phone && formik.errors.phone
                ? formik.errors.phone
                : null
            }
          />
          <SelectBox
            id="city"
            name="city"
            value={formik.values.city}
            onChange={formik.handleChange}
            label="City"
            error={
              formik.touched.city && formik.errors.city
                ? formik.errors.city
                : null
            }
            options={[]}
          />
          <Button type="submit" form>
            Update
          </Button>
        </form>
      </Card>
      <ChangePassword />
    </div>
  );
};

export default Profile;
