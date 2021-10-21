import Input from '../../UIElements/FormElements/Input';
import Button from '../../UIElements/FormElements/Button';
import SelectBox from '../../UIElements/FormElements/SelectBox';
import Option from '../../UIElements/FormElements/Option';
import Col from '../../UIElements/Grid/Col';
import Row from '../../UIElements/Grid/Row';
import CheckInput from '../../UIElements/FormElements/CheckInput';
import { getIn, useFormik } from 'formik';
import useLocalStorage from '../../../utils/localStorage-hook';
import { useRouter } from 'next/dist/client/router';
import { useState } from 'react';
import { useHttpClient } from '../../../utils/http-hook';
import { useEffect } from 'react';
import * as Yup from 'yup';
import Card from '../../UIElements/Card/Card';

const validationSchema = Yup.object().shape({
  general: Yup.object().shape({
    condition: Yup.string().oneOf(['used', 'new']).required(),
    category: Yup.string().required(),
    brand: Yup.string().required(),
    model: Yup.string().required(),
    year: Yup.number().required(),
    crashed: Yup.boolean().default(false),
    previous_owners: Yup.number().min(0).max(10),
    garanty: Yup.boolean().default(true),
    origin: Yup.string()
      .oneOf([
        'cleared',
        'not_cleared',
        'imported_new',
        'imported_used',
        'ww',
        null,
      ])
      .nullable(),
  }),
  engine: Yup.object().shape({
    mileage: Yup.number().required(),
    transmission: Yup.string().oneOf(['automatic', 'manuel']).required(),
    fuel_type: Yup.string()
      .oneOf(['gasoline', 'diesel', 'electric', 'hybrid', 'other'])
      .required(),
    power: Yup.number().min(3),
    drive_type: Yup.string()
      .oneOf(['4wd', 'rwd', 'fwd', 'awd', null])
      .nullable(),
    size: Yup.number().min(1).max(10),
    consumption: Yup.number().min(2).max(20),
  }),
  body: Yup.object().shape({
    extern_color: Yup.string().nullable(),
    intern_color: Yup.string().nullable(),
    doors: Yup.number(),
    seats: Yup.number(),
    interior_type: Yup.string()
      .oneOf([
        'alcantar',
        'cloth',
        'full_leather',
        'leatherette',
        'part_leather',
        'velour',
        'nylon',
        'faux_vinyl',
        'other',
        null,
      ])
      .nullable(),
  }),
});

const getInitialValues = (protoType) => {
  const initialValues = {};
  for (let p in protoType) {
    if (!initialValues.hasOwnProperty(p)) {
      initialValues[p] = {};
    }
    protoType[p].map((g) => {
      const splited = g.name.split('.');
      if (splited.length > 1) {
        if (!initialValues[p][splited[0]]) {
          initialValues[p][splited[0]] = {};
        }
        initialValues[p][splited[0]][splited[1]] = g.default;
      } else {
        initialValues[p][g.name] = g.default;
      }
    });
  }
  return initialValues;
};

const VehicleDetails = ({ categories, brands, defaultModels }) => {
  const [models, setModels] = useState(defaultModels);

  const protoType = {
    general: [
      {
        type: 'select',
        name: 'condition',
        label: 'Condition',
        default: 'used',
        options: [
          { label: 'Used', value: 'used' },
          { label: 'New', value: 'new' },
        ],
      },
      {
        type: 'select',
        name: 'category',
        label: 'Category',
        default: '',
        options: categories.map((c) => ({ label: c.name, value: c.id })),
      },
      {
        type: 'select',
        name: 'brand',
        label: 'Brand',
        default: '',
        options: brands.map((b) => ({ label: b.name, value: b.id })),
      },
      {
        type: 'select',
        name: 'model',
        label: 'Model',
        default: '',
        options: models.map((m) => ({ label: m.name, value: m.id })),
      },
      {
        type: 'number',
        name: 'year',
        label: 'Year',
        default: '',
        min: 1941,
        max: 2021,
        //validation: Yup.number().required('Required'),
      },
      {
        type: 'number',
        name: 'previous_owners',
        label: 'Previous owners',
        default: '',
        min: 1,
        max: 10,
      },
      {
        type: 'select',
        name: 'origin',
        label: 'Origin',
        default: null,
        options: [
          { label: 'Cleared', value: 'cleared' },
          { label: 'Not cleared', value: 'not_cleared' },
          { label: 'Imported new', value: 'imported_new' },
          { label: 'Imported used', value: 'imported_used' },
          { label: 'WW', value: 'ww' },
        ],
      },
      {
        type: 'checkbox',
        name: 'crashed',
        label: 'Crashed',
        default: false,
      },
      {
        type: 'checkbox',
        name: 'garanty',
        label: 'Garanty',
        default: false,
      },
    ],
    engine: [
      // Engine
      {
        type: 'number',
        name: 'mileage',
        label: 'Mileage',
        default: '',
      },
      {
        type: 'select',
        name: 'transmission',
        label: 'Transmission',
        default: '',
        options: [
          { label: 'Automatic', value: 'automatic' },
          { label: 'Manuel', value: 'manuel' },
        ],
      },
      {
        type: 'select',
        name: 'fuel_type',
        label: 'Fuel type',
        default: '',
        options: [
          { label: 'Gasoline', value: 'gasoline' },
          { label: 'Disel', value: 'diesel' },
          { label: 'Electric', value: 'electric' },
          { label: 'Hybrid', value: 'hybrid' },
          { label: 'Other', value: 'other' },
        ],
      },
      {
        type: 'number',
        name: 'power',
        label: 'Power',
        default: '',
      },
      {
        type: 'select',
        name: 'drive_type',
        label: 'Drive type',
        default: null,
        options: [
          { label: '4WD', value: '4wd' },
          { label: 'RWD', value: 'rwd' },
          { label: 'FWD', value: 'fwd' },
          { label: 'AWD', value: 'awd' },
        ],
      },
      {
        type: 'number',
        name: 'size',
        label: 'Size',
        default: '',
      },
      {
        type: 'number',
        name: 'consumption',
        label: 'Consumption',
        default: '',
      },
    ],
    body: [
      {
        type: 'select',
        name: 'extern_color',
        label: 'Extern color',
        default: null,
        options: [
          { label: 'Black', value: 'black' },
          { label: 'White', value: 'white' },
        ],
      },
      {
        type: 'select',
        name: 'intern_color',
        label: 'Intern color',
        default: null,
        options: [
          { label: 'Black', value: 'black' },
          { label: 'White', value: 'white' },
        ],
      },
      {
        type: 'number',
        name: 'doors',
        label: 'Doors',
        default: '',
      },
      {
        type: 'number',
        name: 'seats',
        label: 'Seats',
        default: '',
      },
      {
        type: 'select',
        name: 'interior_type',
        label: 'Interior type',
        options: [
          'alcantar',
          'cloth',
          'full_leather',
          'leatherette',
          'part_leather',
          'velour',
          'nylon',
          'faux_vinyl',
          'other',
        ],
        default: '',
      },
    ],
  };

  const [details, setDetails] = useLocalStorage(
    'vehicle_details',
    getInitialValues(protoType)
  );

  const router = useRouter();
  const formik = useFormik({
    initialValues: details,
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
      setDetails(values);
      router.push('/cars/add/ad_details');
    },
  });

  useEffect(() => {
    if (formik.values.general.brand) {
      const brand = brands.find((b) => b.id === formik.values.general.brand);
      if (brand) {
        setModels(brand.models);
      }
    }
  }, [formik.values.general.brand]);

  return (
    <div id="vehicle_details">
      <form onSubmit={formik.handleSubmit} initialValues={formik.initialValues}>
        {/* <h3>Vehicle details</h3> */}
        <div id="general" className="my-1">
          <Card title="General">
            <Row>
              {protoType.general.map((field) => (
                <Col span={4}>
                  {field.type === 'select' && (
                    <SelectBox
                      id={field.name}
                      name={field.name}
                      value={formik.values.general[field.name]}
                      onChange={(e) => {
                        formik.setFieldValue(`general.${field.name}`, e.value);
                        if (field.name === 'brand') {
                          const brand = brands.find((b) => b.id === e.value);
                          if (brand) {
                            setModels(brand.models);
                          }
                        }
                      }}
                      label={field.label}
                      error={
                        getIn(formik.touched, `general.${field.name}`) &&
                        getIn(formik.errors, `general.${field.name}`)
                          ? getIn(formik.errors, `general.${field.name}`)
                          : null
                      }
                      options={field.options}
                    />
                  )}
                  {field.type === 'number' && (
                    <Input
                      id={field.name}
                      name={`general[${field.name}]`}
                      value={eval(`formik.values.general.${field.name}`)}
                      type="tel"
                      label={field.label}
                      onChange={formik.handleChange}
                      error={
                        getIn(formik.touched, `general.${field.name}`) &&
                        getIn(formik.errors, `general.${field.name}`)
                          ? getIn(formik.errors, `general.${field.name}`)
                          : null
                      }
                    />
                  )}

                  {field.type === 'checkbox' && (
                    <CheckInput
                      id={field.name}
                      name={`general[${field.name}]`}
                      value={formik.values.general[field.name]}
                      label={field.label}
                      onChange={formik.handleChange}
                      error={
                        getIn(formik.touched, `general.${field.name}`) &&
                        getIn(formik.errors, `general.${field.name}`)
                          ? getIn(formik.errors, `general.${field.name}`)
                          : null
                      }
                    />
                  )}
                </Col>
              ))}
            </Row>
          </Card>
        </div>
        <div id="engine" className="my-1">
          <Card title="Engine">
            <Row>
              {protoType.engine.map((field) => (
                <Col span={4}>
                  {field.type === 'select' && (
                    <SelectBox
                      id={field.name}
                      name={field.name}
                      value={formik.values.engine[field.name]}
                      onChange={(e) =>
                        formik.setFieldValue(`engine[${field.name}]`, e.value)
                      }
                      label={field.label}
                      error={
                        getIn(formik.touched, `engine.${field.name}`) &&
                        getIn(formik.errors, `engine.${field.name}`)
                          ? getIn(formik.errors, `engine.${field.name}`)
                          : null
                      }
                      options={field.options}
                    />
                  )}
                  {field.type === 'number' && (
                    <Input
                      id={field.name}
                      name={`engine[${field.name}]`}
                      value={eval(`formik.values.engine.${field.name}`)}
                      type="tel"
                      label={field.label}
                      onChange={formik.handleChange}
                      error={
                        getIn(formik.touched, `engine.${field.name}`) &&
                        getIn(formik.errors, `engine.${field.name}`)
                          ? getIn(formik.errors, `engine.${field.name}`)
                          : null
                      }
                    />
                  )}

                  {field.type === 'checkbox' && (
                    <CheckInput
                      id={field.name}
                      name={`engine[${field.name}]`}
                      value={formik.values.engine[field.name]}
                      label={field.label}
                      onChange={formik.handleChange}
                      error={
                        getIn(formik.touched, `engine.${field.name}`) &&
                        getIn(formik.errors, `engine.${field.name}`)
                          ? getIn(formik.errors, `engine.${field.name}`)
                          : null
                      }
                    />
                  )}
                </Col>
              ))}
            </Row>
          </Card>
        </div>
        <div id="body" className="my-1">
          <Card title="Body">
            <Row>
              {protoType.body.map((field) => (
                <Col span={4}>
                  {field.type === 'select' && (
                    <SelectBox
                      id={field.name}
                      name={field.name}
                      value={formik.values.body[field.name]}
                      onChange={(e) =>
                        formik.setFieldValue(`body[${field.name}]`, e.value)
                      }
                      label={field.label}
                      error={
                        getIn(formik.touched, `body.${field.name}`) &&
                        getIn(formik.errors, `body.${field.name}`)
                          ? getIn(formik.errors, `body.${field.name}`)
                          : null
                      }
                      options={field.options}
                    />
                  )}
                  {field.type === 'number' && (
                    <Input
                      id={field.name}
                      name={`body[${field.name}]`}
                      value={eval(`formik.values.body.${field.name}`)}
                      type="tel"
                      label={field.label}
                      onChange={formik.handleChange}
                      error={
                        getIn(formik.touched, `body.${field.name}`) &&
                        getIn(formik.errors, `body.${field.name}`)
                          ? getIn(formik.errors, `body.${field.name}`)
                          : null
                      }
                    />
                  )}

                  {field.type === 'checkbox' && (
                    <CheckInput
                      id={field.name}
                      name={`body[${field.name}]`}
                      value={formik.values.body[field.name]}
                      label={field.label}
                      onChange={formik.handleChange}
                      error={
                        getIn(formik.touched, `body.${field.name}`) &&
                        getIn(formik.errors, `body.${field.name}`)
                          ? getIn(formik.errors, `body.${field.name}`)
                          : null
                      }
                    />
                  )}
                </Col>
              ))}
            </Row>
          </Card>
        </div>
        <Button extraClasses="align-right" form type="submit">
          Next
        </Button>
      </form>
    </div>
  );
};

export default VehicleDetails;
