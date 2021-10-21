import {
  Form,
  Input,
  Button,
  Upload,
  Spin,
  Row,
  Col,
  Card,
  Tag,
  message,
} from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { useHttpClient } from '../../hooks/http-hook';
import { transToObject } from '../../utils/transObject';

import UploadFormItem from '../../shared/components/UploadFormItem';

const NewExtraForm = () => {
  const { isLoading, sendRequest } = useHttpClient();
  const history = useHistory();
  const [img, setImg] = useState();

  const getImageUrl = (img) => {
    setImg(img);
  };

  const onFinish = async (values) => {
    console.log('Success:', values);

    const newValues = {
      name: transToObject(values.name_fr, values.name_ar),
      image: img,
    };

    try {
      await sendRequest(
        `${process.env.REACT_APP_API_URL}/api/extras`,
        'POST',
        JSON.stringify(newValues),
        {
          'Content-Type': 'application/json',
        }
      );
      history.push('/extras');
    } catch (err) {}
  };

  const onFinishFailed = (values) => {
    console.log('Failed: ', values);
  };


  return (
    <div id="new-extra-form">
      <Spin spinning={isLoading}>
        <Form className="cu-form" 
         
          name="basic"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          layout="vertical"
        >
          <Card title="Create Extra" className="card-layout cu-form-card">
            <Row gutter={16}>
              <Col span={4} style={{ alignItems: 'center', display: 'flex' }}>
                <Form.Item
                  style={{ width: '100%' }}
                  name="upload"
                  label="Upload image"
                  valuePropName="fileList"
                >
                  <UploadFormItem
                    getImageUrl={getImageUrl}
                    uploadAction={`${process.env.REACT_APP_API_URL}/api/extras/upload`}
                  />
                </Form.Item>
              </Col>
              <Col span={10} style={{ alignItems: 'center', display: 'flex' }}>
                <Form.Item
                  style={{ width: '100%' }}
                  label="Name fr"
                  name="name_fr"
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
              </Col>
              <Col span={10} style={{ alignItems: 'center', display: 'flex' }}>
                <Form.Item
                  style={{ width: '100%' }}
                  label="Name ar"
                  name="name_ar"
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
              </Col>
            </Row>
          </Card>
          <Form.Item>
            <Button type="primary" htmlType="submit" size="large">
              Create
            </Button>
          </Form.Item>
        </Form>
      </Spin>
    </div>
  );
};

export default NewExtraForm;
