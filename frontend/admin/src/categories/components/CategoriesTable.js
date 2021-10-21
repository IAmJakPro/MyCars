import { useState, useEffect, useCallback } from 'react';
import {
  Table,
  Space,
  Input,
  Row,
  Col,
  Button,
  Popconfirm,
  Badge,
  Card,
} from 'antd';

import { useHttpClient } from '../../hooks/http-hook';
import { Link } from 'react-router-dom';

const CategoriesTable = (props) => {
  const columns = [
    {
      title: 'Category',
      dataIndex: 'image',
      key: 'image',
      render: (imageSrc) => (
        <div>
          <img
            src={imageSrc}
            width="100"
            height="100"
            style={{ maxHeight: '200px', maxWidth: '200px' }}
          />
        </div>
      ),
    },
    {
      title: 'Name',
      /* dataIndex: 'name',
      key: 'name', */
      children: [
        {
          title: 'fr',
          dataIndex: ['name', 'fr'],
          key: 'name_fr',
        },
        {
          title: 'ar',
          dataIndex: ['name', 'ar'],
          key: 'name_ar',
        },
      ],
    },
    {
      title: 'Created at',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (value) => {
        const date = new Date(value);
        return date.toLocaleString('en-US');
      },
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => {
        console.log(record);
        return (
          <Space size="middle">
            <Badge>
              <Link
                to={`/categories/edit/${record.id}`}
                style={{ color: 'green' }}
              >
                Edit
              </Link>
            </Badge>
            <Popconfirm
              title="Sure to delete?"
              onConfirm={() => deleteHandler(record.id)}
            >
              <a href="#" style={{ color: 'red' }}>
                Delete
              </a>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  const [categories, setCategories] = useState([]);
  const [pagination, setPagination] = useState({
    totalPages: null,
    totalRecords: 0,
    currentPage: 1,
    perPage: 3,
  });
  const { isLoading, sendRequest } = useHttpClient();

  const fetchCategories = useCallback(
    async (page = 1, search = '') => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_API_URL}/api/categories?page=${page}&search=${search}`
        );
        setCategories(responseData.data);
        setPagination(responseData.pagination);
        console.log(responseData);
      } catch (err) {
        console.log(err);
      }
    },
    [sendRequest]
  );

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      fetchCategories();
    }
    return () => {
      isMounted = false;
    };
  }, [fetchCategories]);

  const onPaginateHandler = (page, pageSize) => {
    fetchCategories(page);
  };

  const onSearchHandler = (value) => {
    fetchCategories(1, value);
  };

  const deleteHandler = async (id) => {
    try {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_API_URL}/api/categories/${id}`,
        'DELETE'
      );
      console.log(responseData);
      fetchCategories();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div id="categories-table">
      <Card className="card-layout" title="Categories">
        <Space direction="vertical" style={{ width: '100%' }}>
          <div className="table-toolbar">
            <Row gutter={16}>
              <Col span={12}>
                <Input.Search
                  placeholder="Search"
                  allowClear
                  onSearch={onSearchHandler}
                />
              </Col>
              <Col span={12} style={{ textAlign: 'right' }}>
                <Button type="primary">
                  <Link to="/categories/create">Add new</Link>
                </Button>
              </Col>
            </Row>
          </div>
          <Table
            columns={columns}
            dataSource={categories}
            rowKey="id"
            pagination={{
              total: pagination.totalRecords,
              pageSize: pagination.perPage,
              current: pagination.currentPage,
              onChange: onPaginateHandler,
            }}
            loading={isLoading}
          />
        </Space>
      </Card>
    </div>
  );
};

export default CategoriesTable;
