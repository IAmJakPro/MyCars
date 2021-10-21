import { message } from 'antd';
import { useCallback, useState } from 'react';

export const useUploadClient = () => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

  const beforeUpload = useCallback((file) => {
    const isValidMimeType =
      file.type === 'image/jpeg' ||
      file.type === 'image/png' ||
      file.type === 'image/jpg';
    if (!isValidMimeType) {
      message.error('You can only upload JPG/PNG/JPEG file!');
    }
    const isLt5M = file.size / 1024 / 1024 < 5;
    if (!isLt5M) {
      message.error('Image must smaller than 2MB!');
    }
    return isValidMimeType && isLt5M;
  });

  const handleChange = useCallback((info) => {
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
      setLoading(false);
    }
  });

  return { loading, imageUrl, handleChange, beforeUpload };
};
