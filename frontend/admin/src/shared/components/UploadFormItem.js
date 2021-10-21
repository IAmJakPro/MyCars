import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Form, message, Upload } from 'antd';
import { useState } from 'react';
import { useAuth } from '../../hooks/auth-hook';

const UploadFormItem = (props) => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(props.defaultImage);
  const { token } = useAuth();
  const beforeUpload = (file) => {
    const isValidMimeType =
      file.type === 'image/jpeg' ||
      file.type === 'image/png' ||
      file.type === 'image/svg+xml' ||
      file.type === 'image/jpg';
    if (!isValidMimeType) {
      message.error('You can only upload JPG/PNG/JPEG file!');
    }
    const isLt5M = file.size / 1024 / 1024 < 5;
    if (!isLt5M) {
      message.error('Image must smaller than 2MB!');
    }
    return isValidMimeType && isLt5M;
  };

  const handleChange = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'error') {
      // Get this url from response in real world.
      setLoading(false);
      if (info.file.response && info.file.response.status === 'error') {
        message.error(info.file.response.message);
      }
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      setImageUrl(info.file.response.data);
      props.getImageUrl(info.file.response.data);
      setLoading(false);
    }
  };

  return (
    <Upload
      name="image"
      listType="picture-card"
      className="avatar-uploader"
      showUploadList={false}
      action={props.uploadAction}
      beforeUpload={beforeUpload}
      onChange={handleChange}
      accept=".png,.jpg,.jpeg,.svg"
      maxCount={1}
      headers={{ Authorization: 'Bearer ' + token }}
    >
      {imageUrl ? (
        <img
          src={imageUrl}
          alt="Category image"
          style={{ width: '100%', height: '100%' }}
        />
      ) : (
        <div>
          {loading ? <LoadingOutlined /> : <PlusOutlined />}
          <div style={{ marginTop: 8 }}>Upload</div>
        </div>
      )}
    </Upload>
  );
};

export default UploadFormItem;
