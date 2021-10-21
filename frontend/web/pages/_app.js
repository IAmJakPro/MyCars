import UserContextProvider from '../components/UserProvider';
import AppNavbar from '../components/AppNavbar';
import Content from '../components/UIElements/Layouts/Content';
import AppFooter from '../components/AppFooter';
import '../styles/globals.scss';

const MyApp = ({ Component, pageProps }) => {
  return (
    <UserContextProvider>
      <AppNavbar />
      <Content>
        <Component {...pageProps} />
      </Content>
      <AppFooter />
    </UserContextProvider>
  );
}

export default MyApp;
