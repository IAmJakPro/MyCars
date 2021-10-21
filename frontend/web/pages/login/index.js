import LoginForm from '../../components/Auth/LoginForm';
import Card from '../../components/UIElements/Card/Card';
import Container from '../../components/UIElements/Layouts/Container';

const Login = () => {
  return (
    <section id="login">
      <Container extraClasses="py-4">
        <Card
          title="Login"
          //extraClasses="center-both"
          style={{ width: '60%', margin: 'auto' }}
          titleStyle={{ textAlign: 'center' }}
        >
          <LoginForm />
        </Card>
      </Container>
    </section>
  );
};

export default Login;
