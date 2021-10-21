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

const NewBrandForm = () => {
  const { isLoading, sendRequest } = useHttpClient();
  const history = useHistory();
  const [img, setImg] = useState();
  const [state, setState] = useState({
    tags: [],
    inputVisible: false,
    inputValue: '',
  });

  const getImageUrl = (img) => {
    setImg(img);
  };

  const onFinish = async (values) => {
    console.log('Success:', values);

    const newValues = {
      name: transToObject(values.name_fr, values.name_ar),
      image: img,
      models: state.tags.map((t) => ({ name: t })),
    };

    console.log(newValues);

    try {
      await sendRequest(
        `${process.env.REACT_APP_API_URL}/api/brands`,
        'POST',
        JSON.stringify(newValues),
        {
          'Content-Type': 'application/json',
        }
      );
      history.push('/brands');
    } catch (err) {}
  };

  const onFinishFailed = (values) => {
    console.log('Failed: ', values);
  };

  const handleClose = (removedTag) => {
    const tags = state.tags.filter((tag) => tag !== removedTag);
    setState({ ...state, tags });
  };

  const showInput = () => {
    setState({ ...state, inputVisible: true });
  };

  const handleInputChange = (e) => {
    setState({ ...state, inputValue: e.target.value });
  };

  const handleInputConfirm = () => {
    const { inputValue } = state;
    let { tags } = state;
    if (inputValue && tags.indexOf(inputValue) === -1) {
      tags = [...tags, inputValue];
    }
    console.log(tags);
    setState({
      tags,
      inputVisible: false,
      inputValue: '',
    });
  };

  const forMap = (tag) => {
    const tagElem = (
      <Tag
        closable
        onClose={(e) => {
          e.preventDefault();
          handleClose(tag);
        }}
      >
        {tag}
      </Tag>
    );
    return (
      <span key={tag} style={{ display: 'inline-block' }}>
        {tagElem}
      </span>
    );
  };

  //const { tags, inputVisible, inputValue } = state;
  const tagChild = state.tags.map(forMap);

  return (
    <div id="new-brand-form">
      <Spin spinning={isLoading}>
        <Form
          className="cu-form"
          name="basic"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          layout="vertical"
        >
          <Card title="Create brand" className="card-layout cu-form-card">
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
                    uploadAction={`${process.env.REACT_APP_API_URL}/api/brands/upload`}
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
            <Form.Item name="areas" label="Areas">
              <div style={{ marginBottom: 16 }}>
                {tagChild}
                {state.inputVisible && (
                  <Input
                    //ref={inputRef}
                    className="area-input"
                    autoFocus
                    type="text"
                    size="small"
                    style={{ width: 78 }}
                    value={state.inputValue}
                    onChange={handleInputChange}
                    onBlur={handleInputConfirm}
                    onPressEnter={handleInputConfirm}
                  />
                )}
                {!state.inputVisible && (
                  <Tag onClick={showInput} className="site-area-plus">
                    <PlusOutlined /> New Area
                  </Tag>
                )}
              </div>
            </Form.Item>
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

export default NewBrandForm;
