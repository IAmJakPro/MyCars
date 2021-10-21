import axios from 'axios';
import Cookies from 'cookies';

export default async (req, res) => {
  const cookies = new Cookies(req, res);
  const dataToBeSent = {
    email: req.body.email,
    password: req.body.password,
  };

  return axios
    .post(`${process.env.PRIVATE_API_URL}/api/users/login`, dataToBeSent)
    .then((response) => {
      console.log(response.data.status);
      if (response.data.status === 'success') {
        cookies.set('jwtUser', response.data.token, {
          httpOnly: true,
          expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 60 * 60 * 1000
          ),
          sameSite: 'lax',
        });
        console.log(cookies.get('jwtUser'));

        return res.status(200).json(response.data);
      }

      return null;
    })
    .catch((err) => {
      return res.status(401).json({
        status: 'fail',
        message: err.response.data.message,
      });
    });
};
