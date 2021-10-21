import { Form, Input, Button, Select, Spin, Card } from 'antd';
import { useHistory } from 'react-router-dom';

import { useHttpClient } from '../../hooks/http-hook';

const NewUserForm = (props) => {
  const { cities } = props;

  const { isLoading, sendRequest } = useHttpClient();
  const history = useHistory();
  const onFinish = async (values) => {
    try {
      await sendRequest(
        `${process.env.REACT_APP_API_URL}/api/users`,
        'POST',
        JSON.stringify(values),
        {
          'Content-Type': 'application/json',
        }
      );
      history.push('/users');
    } catch (err) {}
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div id="new-user-form">
      <Spin spinning={isLoading}>
        <Form
          className="cu-form"
          name="basic"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          layout="vertical"
        >
          <Card title="Create user" className="card-layout cu-form-card">
            <Form.Item
              label="Name"
              name="name"
              rules={[
                {
                  required: true,
                  min: 3,
                },
                {
                  max: 50,
                },
              ]}
            >
              <Input size="large" />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  type: 'email',
                },
              ]}
            >
              <Input type="email" size="large" />
            </Form.Item>

            <Form.Item
              label="Phone Number"
              name="phone"
              rules={[
                {
                  required: true,
                },
                {
                  type: 'string',
                  len: 9,
                  message: 'Phone number is invalid!',
                },
              ]}
            >
              <Input
                addonBefore="+212"
                size="large"
                style={{
                  width: '100%',
                }}
              />
            </Form.Item>

            <Form.Item label="City" name="city">
              <Select placeholder="select city" size="large">
                {cities.map(({ id, name }, index) => (
                  <Select.Option key={index} value={id}>
                    {name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  min: 6,
                },
                {
                  max: 30,
                },
              ]}
            >
              <Input.Password size="large" />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" size="large">
                Create
              </Button>
            </Form.Item>
          </Card>
        </Form>
      </Spin>
    </div>
  );
};

export default NewUserForm;
