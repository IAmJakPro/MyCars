import axios from 'axios';
import ChangePassword from '../../components/Account/ChangePassword';
import Profile from '../../components/Account/Profile';
import MyAds from '../../components/Account/MyAds';
import Tabs from '../../components/Account/Tabs';
import Container from '../../components/UIElements/Layouts/Container';
import webRoutes from '../../utils/webRoutes';

export const getServerSideProps = async ({ req }) => {
  const token = req.cookies.jwtUser;
  console.log(token);
  if (!token) {
    return {
      redirect: {
        destination: webRoutes.login,
        permanent: false,
      },
    };
  }

  const user = await axios
    .get(`${process.env.PRIVATE_API_URL}/api/users/me`, {
      headers: {
        Authorization: token ? 'Bearer ' + token : null,
        cookie: req ? req.headers.cookie : undefined,
      },
    })
    .then((res) => {
      console.log(res);
      return res.data.data;
    })
    .catch((err) => console.log(err));

  if (!user) {
    return {
      redirect: {
        destination: webRoutes.unauthorized,
        permanent: false,
      },
    };
  }

  return {
    props: {
      user,
    },
  };
};

const ProfilePage = ({ user }) => {
  const { name, phone, email, city } = user;
  const listItems = [
    {
      name: 'Profile',
      index: 0,
      body: <Profile name={name} phone={phone} email={email} city={city} />,
    },
    { name: 'My ads', index: 1, body: <MyAds /> },
  ];
  console.log(user);
  return (
    <div>
      <Container extraClasses="py-2">
        <h2></h2>
        <Tabs items={listItems} />
      </Container>
    </div>
  );
};

export default ProfilePage;
