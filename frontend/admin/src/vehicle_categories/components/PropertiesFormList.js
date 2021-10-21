import { Fragment, useState } from 'react';
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
} from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

const PropertiesFormList = (props) => {
  const { name: formListName } = props;
  const [showPossibleValues, setShowPossibleValues] = useState([
    props.pvs
  ]);

  const showHidePVs = (value, index) => {
    console.log(value + ' : ' + index);
    if (value === 'select') {
      setShowPossibleValues((prev) => [...prev, index]);
    } else {
      setShowPossibleValues((prev) => {
        const arr = [...prev];
        const i = arr.indexOf(index);
        if (i > -1) {
          arr.splice(i, 1);
        }
        return arr;
      });
    }
  };
  return (
    <div id="properties-form-list">
      <Form.List name={formListName}>
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, fieldKey, ...restField }) => (
              <Card style={{ marginBottom: '20px' }}>
                <Row gutter={16}>
                  <Col span={17}>
                    <Row gutter={16}>
                      <Col span={6}>
                        <Form.Item
                          {...restField}
                          name={[name, 'label_ar']}
                          fieldKey={[fieldKey, 'label_ar']}
                          rules={[{ required: true }]}
                        >
                          <Input placeholder="Label ar" />
                        </Form.Item>
                      </Col>
                      <Col span={6}>
                        <Form.Item
                          {...restField}
                          name={[name, 'label_fr']}
                          fieldKey={[fieldKey, 'label_fr']}
                          rules={[{ required: true }]}
                        >
                          <Input placeholder="Label fr" />
                        </Form.Item>
                      </Col>
                      <Col span={4}>
                        <Form.Item
                          {...restField}
                          name={[name, 'ui_control']}
                          fieldKey={[fieldKey, 'ui_control']}
                        >
                          <Select
                            placeholder="select ui control"
                            onChange={(value) => showHidePVs(value, fieldKey)}
                            defaultValue="checkbox"
                            disabled={formListName == 'extras'}
                          >
                            <Select.Option key="select" value="select">
                              Select
                            </Select.Option>
                            <Select.Option key="number" value="number">
                              Number
                            </Select.Option>
                            <Select.Option key="text" value="text">
                              Text
                            </Select.Option>
                            <Select.Option key="checkbox" value="checkbox">
                              Checkbox
                            </Select.Option>
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col span={3}>
                        <Form.Item
                          {...restField}
                          name={[name, 'unit']}
                          fieldKey={[fieldKey, 'unit']}
                        >
                          <Input
                            placeholder="Unit"
                            disabled={formListName == 'extras'}
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                  </Col>
                  {showPossibleValues.indexOf(fieldKey) > -1 && (
                    <Col span={6}>
                      <Form.List
                        {...restField}
                        name={[name, 'possible_values']}
                        fieldKey={[fieldKey, 'possible_values']}
                      >
                        {(fields, { add, remove }) => (
                          <>
                            {fields.map(
                              ({ key, name, fieldKey, ...restField }) => (
                                <Row gutter={16}>
                                  <Col span={12}>
                                    <Form.Item
                                      {...restField}
                                      name={[name, 'label_fr']}
                                      fieldKey={[fieldKey, 'label_fr']}
                                    >
                                      <Input placeholder="Label FR" />
                                    </Form.Item>
                                  </Col>
                                  <Col span={12}>
                                    <Form.Item
                                      {...restField}
                                      name={[name, 'label_ar']}
                                      fieldKey={[fieldKey, 'label_ar']}
                                    >
                                      <Input placeholder="Label AR" />
                                    </Form.Item>
                                  </Col>
                                </Row>
                              )
                            )}
                            <Form.Item>
                              <Button
                                type="dashed"
                                onClick={() => add()}
                                block
                                icon={<PlusOutlined />}
                              >
                                Add value
                              </Button>
                            </Form.Item>
                          </>
                        )}
                      </Form.List>
                    </Col>
                  )}
                  <Col span={1}>
                    <MinusCircleOutlined onClick={() => remove(name)} />
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
    </div>
  );
};

export default PropertiesFormList;
