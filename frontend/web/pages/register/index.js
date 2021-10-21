import { useRouter } from 'next/router';
import { useState } from 'react';
import RegisterForm from '../../components/Auth/RegisterForm';
import Card from '../../components/UIElements/Card/Card';
import Container from '../../components/UIElements/Layouts/Container';

const Register = () => {
  return (
    <Container extraClasses="py-2">
      <Card
        title="Register"
        //extraClasses="center-both"
        style={{ width: '80%', margin: '0 auto' }}
        titleStyle={{ textAlign: 'center' }}
      >
        <RegisterForm />
      </Card>
    </Container>
  );
};

export default Register;
