import { useFormik } from 'formik';
import * as Yup from 'yup';
import Input from '../../components/UIElements/FormElements/Input';
import Button from '../../components/UIElements/FormElements/Button';
import SelectBox from '../../components/UIElements/FormElements/SelectBox';
import Option from '../../components/UIElements/FormElements/Option';

import styles from './RegisterForm.module.scss';
import Link from 'next/link';
import webRoutes from '../../utils/webRoutes';
import { useHttpClient } from '../../utils/http-hook';

const registerValidationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string()
    .required('No password provided.')
    .min(8, 'Password is too short - should be 8 chars minimum.'),
  phone: Yup.string().required(),
  city: Yup.string().required(),
  name: Yup.string().required(),
});

const RegisterForm = () => {
  const { isLoading, sendRequest } = useHttpClient();
  const registerHandler = async ({ email, password, phone, name, city }) => {
    try {
      const apiResponse = await sendRequest('/api/register', 'POST', {
        name,
        email,
        password,
        phone,
        city,
      });

      if (apiResponse.status === 'success') {
        return setTimeout(() => router.push(webRoutes.login), 1000);
      } else {
        console.log('Error!');
      }
    } catch (err) {}
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      name: '',
      phone: '',
      city: '',
    },
    validationSchema: registerValidationSchema,
    onSubmit: (values) => {
      console.log(values);
      registerHandler(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Input
        id="name"
        type="text"
        placeholder="name"
        value={formik.values.name}
        onChange={formik.handleChange}
        label="name"
        error={
          formik.touched.name && formik.errors.name ? formik.errors.name : null
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
        label="city"
        error={
          formik.touched.city && formik.errors.city ? formik.errors.city : null
        }
      >
        <Option value="test">test</Option>
        <Option value="wow">wow</Option>
      </SelectBox>
      <Input
        id="password"
        type="password"
        placeholder="Password"
        value={formik.values.password}
        onChange={formik.handleChange}
        label="Password"
        error={
          formik.touched.password && formik.errors.password
            ? formik.errors.password
            : null
        }
      />
      <div className="align-right">
        <a href="#" className={styles['forgot-password-link']}>
          Forgot password?
        </a>
      </div>
      <Button form extraClasses="align-center" type="submit">
        Register
      </Button>
      <div className="align-center">
        <span>
          Already have an account?{' '}
          <Link href={webRoutes.login}>
            <a className={styles['login']}>Login</a>
          </Link>
        </span>
      </div>
    </form>
  );
};

export default RegisterForm;
