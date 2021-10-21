import { useFormik } from 'formik';
import * as Yup from 'yup';
import Input from '../../components/UIElements/FormElements/Input';
import Button from '../../components/UIElements/FormElements/Button';
import Link from 'next/link';

import styles from './LoginForm.module.scss';
import webRoutes from '../../utils/webRoutes';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import UserContext from '../../utils/userContext';
import { useHttpClient } from '../../utils/http-hook';

const loginValidationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string()
    .required('No password provided.')
    .min(8, 'Password is too short - should be 8 chars minimum.'),
});

const LoginForm = (props) => {
  const { isLoading, sendRequest } = useHttpClient();
  const { dispatch, state } = useContext(UserContext);
  console.log(state);
  const router = useRouter();
  const loginHandler = async ({ email, password }) => {
    try {
      const responseData = await sendRequest('api/login', 'POST', {
        email,
        password,
      });
      console.log('ResponseData: ', responseData);
      dispatch({ type: 'login' });
      router.push(webRoutes.homepage);
    } catch (err) {}
    /* if (error) {
      console.log('ERROR: ', error);
    } */
    //const apiResponse = await post('/api/login', { email, password });

    /* if (apiResponse.status === 'success') {
      dispatch({ type: 'login' });
      router.push(webRoutes.homepage);
      console.log('Logged in!');
    } else {
      console.log('error');
    } */
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginValidationSchema,
    onSubmit: (values) => {
      loginHandler(values);
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
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
        Login
      </Button>
      <div className="align-center">
        <span>
          Don't have an account?{' '}
          <Link href={webRoutes.register}>
            <a className={styles['create-account']}>Create one</a>
          </Link>
        </span>
      </div>
    </form>
  );
};

export default LoginForm;
