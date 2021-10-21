import { Fragment } from 'react';
import {
  Form,
  Spin,
  Button,
  Row,
  Col,
  Input,
  Collapse,
  Select,
  Card,
  Space,
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import PropertiesFormList from './PropertiesFormList';
import { useHttpClient } from '../../hooks/http-hook';
import { useHistory } from 'react-router-dom';

const EditCategoryForm = (props) => {
  const { category } = props;
  const { brands, categories, properties } = category;

  const { isLoading, sendRequest } = useHttpClient();
  const history = useHistory();

  const getTranslateObject = (frStr, arStr) => {
    return {
      fr: frStr,
      ar: arStr,
    };
  };

  const getPropertiesObject = (pvsArray) => {
    if (!pvsArray) {
      return;
    }
    if (pvsArray.length < 0) {
      return [];
    }
    return pvsArray.map((prop) => {
      return {
        label: getTranslateObject(prop.label_fr, prop.label_ar),
        ui_control: prop.ui_control,
        unit: prop.unit,
        possible_values: prop.hasOwnProperty('possible_values')
          ? prop.possible_values.map((pv) => {
              return {
                label: getTranslateObject(pv.label_fr, pv.label_ar),
              };
            })
          : [],
      };
    });
  };

  const onFinish = async (values) => {
    console.log(values);

    const newValues = {
      name: getTranslateObject(values.name_fr, values.name_ar),
      description: getTranslateObject(
        values.description_fr,
        values.description_ar
      ),
      categories: values.categories.map((category) => {
        return {
          name: getTranslateObject(category.name_fr, category.name_ar),
        };
      }),
      brands: values.brands.map((brand) => {
        return {
          name: getTranslateObject(brand.name_fr, brand.name_ar),
        };
      }),
      properties: {
        vehicle_details:
          getPropertiesObject(values.vehicle_details) ||
          properties.vehicle_details,
        body_details:
          getPropertiesObject(values.body_details) || properties.body_details,
        engine_details:
          getPropertiesObject(values.engine_details) ||
          properties.engine_details,
        extras: getPropertiesObject(values.extras) || properties.extras,
      },
    };
    console.log(newValues);

    try {
      await sendRequest(
        `${process.env.REACT_APP_API_URL}/api/categories/${category.id}`,
        'PATCH',
        JSON.stringify(newValues),
        {
          'Content-Type': 'application/json',
        }
      );
      history.push('/categories');
    } catch (err) {}
  };

  const onFinishFailed = (errorInfo) => {
    console.log(errorInfo.values);
  };

  const reverseTranslatedObj = (properties) => {
    return properties.map((prop) => {
      return {
        label_ar: prop.label.ar,
        label_fr: prop.label.fr,
        ui_control: prop.ui_control,
        unit: prop.unit ? prop.unit : '',
        possible_values: prop.possible_values.map((pv) => {
          return {
            label_ar: pv.label.ar,
            label_fr: pv.label.fr,
          };
        }),
      };
    });
  };

  const formInitialValues = {
    name_ar: category.name.ar,
    name_fr: category.name.fr,
    description_fr: category.description.fr,
    description_ar: category.description.ar,
    categories: categories.map((cat) => {
      return {
        name_ar: cat.name.ar,
        name_fr: cat.name.fr,
      };
    }),
    brands: brands.map((brand) => {
      return {
        name_ar: brand.name.ar,
        name_fr: brand.name.fr,
      };
    }),

    vehicle_details: reverseTranslatedObj(properties.vehicle_details),
    body_details: reverseTranslatedObj(properties.body_details),
    engine_details: reverseTranslatedObj(properties.engine_details),
    extras: reverseTranslatedObj(properties.extras),
  };

  return (
    <div id="edit-category-form">
      <Spin spinning={false}>
        <Form
          className="cu-form"
          name="basic"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          layout="vertical"
          initialValues={formInitialValues}
        >
          <Space direction="vertical" size="large" style={{ width: '100%' }}>
            <Card title="Cars details" className="card-layout">
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item name="name_fr">
                    <Input placeholder="Name fr" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="name_ar">
                    <Input placeholder="Name ar" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="description_fr">
                    <Input.TextArea placeholder="Description fr" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="description_ar">
                    <Input.TextArea placeholder="Description ar" />
                  </Form.Item>
                </Col>
              </Row>
            </Card>

            <Card title="Properties" className="card-layout">
              <Collapse>
                <Collapse.Panel header="Vehicle details" key="1">
                  <PropertiesFormList
                    name="vehicle_details"
                    pvs={formInitialValues.vehicle_details.findIndex(
                      (prop) => prop.ui_control == 'select'
                    )}
                  />
                </Collapse.Panel>
                <Collapse.Panel header="Body details" key="2">
                  <PropertiesFormList
                    name="body_details"
                    pvs={formInitialValues.body_details.findIndex(
                      (prop) => prop.ui_control == 'select'
                    )}
                  />
                </Collapse.Panel>
                <Collapse.Panel header="Engine details" key="3">
                  <PropertiesFormList
                    name="engine_details"
                    pvs={formInitialValues.engine_details.findIndex(
                      (prop) => prop.ui_control == 'select'
                    )}
                  />
                </Collapse.Panel>
                <Collapse.Panel header="Extras" key="4">
                  <PropertiesFormList name="extras" />
                </Collapse.Panel>
              </Collapse>
            </Card>

            <Card title="Categories" className="card-layout">
              <Form.List name="categories">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, fieldKey, ...restField }) => (
                      <Card>
                        <Row gutter={16}>
                          <Col span={12}>
                            <Form.Item
                              {...restField}
                              name={[name, 'name_fr']}
                              fieldKey={[fieldKey, 'name_fr']}
                            >
                              <Input placeholder="Name fr" />
                            </Form.Item>
                          </Col>
                          <Col span={12}>
                            <Form.Item
                              {...restField}
                              name={[name, 'name_ar']}
                              fieldKey={[fieldKey, 'name_ar']}
                            >
                              <Input placeholder="Name ar" />
                            </Form.Item>
                          </Col>
                        </Row>
                      </Card>
                    ))}
                    <Form.Item>
                      <Button
                        type="dashed"
                        onClick={() => add()}
                        block
                        icon={<PlusOutlined />}
                      >
                        Add field
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>
            </Card>

            <Card title="Brands" className="card-layout">
              <Form.List name="brands">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, fieldKey, ...restField }) => (
                      <Card>
                        <Row gutter={16}>
                          <Col span={12}>
                            <Form.Item
                              {...restField}
                              name={[name, 'name_fr']}
                              fieldKey={[fieldKey, 'name_fr']}
                            >
                              <Input placeholder="Name fr" />
                            </Form.Item>
                          </Col>
                          <Col span={12}>
                            <Form.Item
                              {...restField}
                              name={[name, 'name_ar']}
                              fieldKey={[fieldKey, 'name_ar']}
                            >
                              <Input placeholder="Name ar" />
                            </Form.Item>
                          </Col>
                        </Row>
                      </Card>
                    ))}
                    <Form.Item>
                      <Button
                        type="dashed"
                        onClick={() => add()}
                        block
                        icon={<PlusOutlined />}
                      >
                        Add field
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>
            </Card>

            <Form.Item>
              <Button type="primary" htmlType="submit" size="large">
                Update
              </Button>
            </Form.Item>
          </Space>
        </Form>
      </Spin>
    </div>
  );
};

export default EditCategoryForm;
