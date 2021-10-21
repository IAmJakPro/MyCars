import { useFormik } from 'formik';
import { useRef, useState } from 'react';
import Card from '../../UIElements/Card/Card';
import FilterListItem from './FilterListItem';
import styles from './Filters.module.scss';
import SelectBox from '../../UIElements/FormElements/SelectBox';
import Row from '../../UIElements/Grid/Row';
import Col from '../../UIElements/Grid/Col';
import Input from '../../UIElements/FormElements/Input';
import { useRouter } from 'next/router';
import { conditions } from '../../../utils/constants';
import CheckInput from '../../UIElements/FormElements/CheckInput';

const Filters = ({ onFilters, cities, brands, categories }) => {
  const router = useRouter();
  const { locale } = router;

  const [overflow, setOverflow] = useState([{ index: 0, value: 'hidden' }]);

  //
  /**
   * single-check
   * multi-check
   * min-max
   * single-select
   * multi-select
   */

  const options = {
    fixed: [
      {
        type: 'single-select',
        label: 'Condition',
        name: 'condition',
        options: [
          { label: 'Used', value: 'used' },
          { label: 'New', value: 'new' },
        ],
        default: '',
      },
      {
        type: 'single-select',
        label: 'City',
        name: 'city',
        options: cities.map((c) => ({ label: c.name, value: c.id })),
        default: '',
      },
      {
        type: 'single-select',
        label: 'Brand',
        name: 'brand',
        options: brands.map((b) => ({ label: b.name, value: b.id })),
        default: '',
      },
      {
        type: 'single-select',
        label: 'Model',
        name: 'model',
        options: [],
        default: '',
      },
      {
        type: 'single-select',
        label: 'Category',
        name: 'category',
        options: categories.map((c) => ({ label: c.name, value: c.id })),
        default: '',
      },
      {
        type: 'min-max',
        label: 'Price',
        name: 'price',
        default: '',
      },
    ],

    others: [
      {
        type: 'single-check',
        label: 'Crashed',
        name: 'crashed',
        default: false,
        options: [{ label: 'Crashed', value: true }],
      },
      {
        type: 'single-check',
        label: 'Garanty',
        name: 'garanty',
        default: false,
        options: [{ label: 'Garanty', value: true }],
      },
      {
        type: 'min-max',
        label: 'Previous owners',
        name: 'previous_owners',
        default: '',
      },
      {
        type: 'single-check',
        label: 'Origin',
        name: 'origin',
        default: '',
        options: [
          { label: 'Cleared', value: 'cleared' },
          { label: 'Not cleared', value: 'not_cleared' },
          { label: 'Imported new', value: 'imported_new' },
          { label: 'Imported used', value: 'imported_used' },
          { label: 'WW', value: 'ww' },
        ],
      },

      // Engine
      {
        type: 'min-max',
        label: 'Mileage',
        name: 'mileage',
        default: '',
      },
      {
        type: 'single-check',
        label: 'Transmission',
        name: 'transmission',
        options: [
          { label: 'Automatic', value: 'automatic' },
          { label: 'Manuel', value: 'manuel' },
        ],
        default: '',
      },
      {
        type: 'single-check',
        label: 'Fuel type',
        name: 'fuel_type',
        options: [
          { label: 'Gasoline', value: 'gasoline' },
          { label: 'Disel', value: 'diesel' },
          { label: 'Electric', value: 'electric' },
          { label: 'Hybrid', value: 'hybrid' },
          { label: 'Other', value: 'other' },
        ],
        default: '',
      },
      {
        type: 'single-check',
        label: 'Drive type',
        name: 'drive_type',
        options: [
          { label: '4WD', value: '4wd' },
          { label: 'RWD', value: 'rwd' },
          { label: 'FWD', value: 'fwd' },
          { label: 'AWD', value: 'awd' },
        ],
        default: '',
      },
      {
        type: 'min-max',
        label: 'Size',
        name: 'size',
        default: '',
      },
      {
        type: 'min-max',
        label: 'Power',
        name: 'power',
        default: '',
      },
      {
        type: 'min-max',
        label: 'Consumption',
        name: 'consumption',
        default: '',
      },

      // Body
      {
        type: 'single-check',
        label: 'Extern color',
        name: 'extern_color',
        options: [
          { value: 'ocean', label: 'Ocean', color: '#00B8D9', isFixed: true },
          { value: 'blue', label: 'Blue', color: '#0052CC', isDisabled: true },
          { value: 'purple', label: 'Purple', color: '#5243AA' },
          { value: 'red', label: 'Red', color: '#FF5630', isFixed: true },
          { value: 'orange', label: 'Orange', color: '#FF8B00' },
          { value: 'yellow', label: 'Yellow', color: '#FFC400' },
          { value: 'green', label: 'Green', color: '#36B37E' },
          { value: 'forest', label: 'Forest', color: '#00875A' },
          { value: 'slate', label: 'Slate', color: '#253858' },
          { value: 'silver', label: 'Silver', color: '#666666' },
        ],
        default: '',
      },
      {
        type: 'single-check',
        label: 'Intern color',
        name: 'intern_color',
        options: [
          { value: 'ocean', label: 'Ocean', color: '#00B8D9', isFixed: true },
          { value: 'blue', label: 'Blue', color: '#0052CC', isDisabled: true },
          { value: 'purple', label: 'Purple', color: '#5243AA' },
          { value: 'red', label: 'Red', color: '#FF5630', isFixed: true },
          { value: 'orange', label: 'Orange', color: '#FF8B00' },
          { value: 'yellow', label: 'Yellow', color: '#FFC400' },
          { value: 'green', label: 'Green', color: '#36B37E' },
          { value: 'forest', label: 'Forest', color: '#00875A' },
          { value: 'slate', label: 'Slate', color: '#253858' },
          { value: 'silver', label: 'Silver', color: '#666666' },
        ],
        default: '',
      },
    ],
  };

  const getSearchUrl = (values) => {
    let url = '';
    if (values.city) {
      url += `/${values.city}`;
    }
    url += `/${
      conditions.find((c) => c.id == values.condition)[locale]
    }/search`;
    for (let key in values) {
      if (key == 'city' || key == 'condition') continue;
      if (values[key]) {
        if (Array.isArray(values[key])) {
          if (values[key].length < 1) continue;
          console.log('it is array: ', values[key]);
          for (const v of values[key]) {
            const symbol = url.includes('?') ? '&' : '?';
            url += `${symbol}${key}=${v}`;
          }
        } else {
          const symbol = url.includes('?') ? '&' : '?';
          url += `${symbol}${key}=${values[key]}`;
        }
      }
    }
    return url;
  };

  const formik = useFormik({
    initialValues: {
      city: '',
      brand: [],
      model: '',
      category: '',
      min_price: '',
      max_price: '',
      condition: 'used',
      crashed: false,
      fuel_type: [],
      transmission: [],
    },
    //validationSchema: offerValidationSchema,
    onSubmit: (values) => {
      console.log(values);
      console.log(getSearchUrl(values));

      //router.push(getSearchUrl(values));

      const q = { ...values };

      delete q.city;
      delete q.condition;

      router.push({
        pathname: `/${values.city ? values.city : 'casablanca'}/${
          conditions.find((c) => c.id == values.condition)[locale]
        }/search`,
        query: q,
      });
      //onFilters(values);
    },
  });
  const changeHandler = (e) => {
    console.log(e);
    //formik.handleSubmit();
  };

  return (
    <div className={styles.filters}>
      <Card bodyStyle={{ paddingLeft: '0', paddingRight: '0' }}>
        <form onSubmit={formik.handleSubmit}>
          <div style={{ padding: '0 1rem' }}>
            {options.fixed.map((option, index) => (
              <>
                {(option.type === 'single-select' ||
                  option.type === 'multi-select') && (
                  <SelectBox
                    id={option.name}
                    name={option.name}
                    placeholder={option.label}
                    label={option.label}
                    options={option.options}
                    value={formik.values[option.name]}
                    onChange={(r) => {
                      if (option.type === 'multi-select') {
                        formik.setFieldValue(
                          option.name,
                          r.map((r) => r.value)
                        );
                      } else {
                        formik.setFieldValue(option.name, r.value);
                      }
                      changeHandler(r);
                    }}
                  />
                )}

                {/* {option.type === 'multi-select' && (
                  <SelectBox
                    id={'test'}
                    name={'test'}
                    placeholder={'Test'}
                    label={'Test'}
                    isMulti
                    options={[
                      { label: 'A', value: 'a' },
                      { label: 'B', value: 'b' },
                    ]}
                    value={formik.values['test']}
                    onChange={(r) => {
                      formik.setFieldValue('test', r.value);
                      changeHandler(r);
                      console.log(r);
                    }}
                  />
                )} */}

                {option.type === 'min-max' && (
                  <>
                    {/* <label>{option.label}</label> */}
                    <Row>
                      <Col span={6}>
                        <Input
                          id={'min_' + option.name}
                          name={'min_' + option.name}
                          value={formik.values['min_' + option.name]}
                          type="tel"
                          //label={field.label}
                          placeholder="From"
                          onChange={formik.handleChange}
                          error={
                            formik.touched['min_' + option.name] &&
                            formik.errors['min_' + option.name]
                              ? formik.errors['min_' + option.name]
                              : null
                          }
                        />
                      </Col>
                      <Col span={6}>
                        <Input
                          id={'max_' + option.name}
                          name={'max_' + option.name}
                          value={formik.values['max_' + option.name]}
                          type="tel"
                          //label={field.label}
                          placeholder="To"
                          onChange={formik.handleChange}
                          error={
                            formik.touched['max_' + option.name] &&
                            formik.errors['max_' + option.name]
                              ? formik.errors['max_' + option.name]
                              : null
                          }
                        />
                      </Col>
                    </Row>
                  </>
                )}
              </>
            ))}
          </div>
          <ul className={styles['options-list']}>
            {options.others.map((option, index) => {
              return (
                <>
                  {option.type == 'single-check' && (
                    <FilterListItem title={option.label}>
                      {option.options.map((o) => (
                        <CheckInput
                          id={o.value}
                          name={option.name}
                          value={o.value}
                          checked={
                            Array.isArray(formik.values[option.name])
                              ? formik.values[option.name].length > 0 &&
                                formik.values[option.name].includes(o.value)
                              : formik.values[option.name]
                          }
                          label={o.label}
                          onChange={formik.handleChange}
                          error={
                            formik.touched[option.name] &&
                            formik.errors[option.name]
                              ? formik.errors[option.name]
                              : null
                          }
                        />
                      ))}
                    </FilterListItem>
                  )}
                  {option.type === 'min-max' && (
                    <>
                      <FilterListItem title={option.label}>
                        {/* <label>{option.label}</label> */}
                        <Row>
                          <Col span={6}>
                            <Input
                              id={'min_' + option.name}
                              name={'min_' + option.name}
                              value={formik.values['min_' + option.name]}
                              type="tel"
                              //label={field.label}
                              placeholder="From"
                              onChange={formik.handleChange}
                              error={
                                formik.touched['min_' + option.name] &&
                                formik.errors['min_' + option.name]
                                  ? formik.errors['min_' + option.name]
                                  : null
                              }
                            />
                          </Col>
                          <Col span={6}>
                            <Input
                              id={'max_' + option.name}
                              name={'max_' + option.name}
                              value={formik.values['max_' + option.name]}
                              type="tel"
                              //label={field.label}
                              placeholder="To"
                              onChange={formik.handleChange}
                              error={
                                formik.touched['max_' + option.name] &&
                                formik.errors['max_' + option.name]
                                  ? formik.errors['max_' + option.name]
                                  : null
                              }
                            />
                          </Col>
                        </Row>
                      </FilterListItem>
                    </>
                  )}
                  {(option.type === 'single-select' ||
                    option.type === 'multi-select') && (
                    <FilterListItem
                      title={option.label}
                      overflow={
                        overflow.find((o) => o.index == index)
                          ? overflow.find((o) => o.index == index).value
                          : 'hidden'
                      }
                    >
                      <SelectBox
                        id={option.name}
                        name={option.name}
                        placeholder={option.label}
                        label={option.label}
                        options={option.options}
                        value={formik.values[option.name]}
                        isMulti={option.type === 'multi-select'}
                        onFocus={() => {
                          setOverflow((prev) => {
                            const ov = prev.indexOf((p) => p.index == index);
                            if (ov > -1) {
                              return (prev[ov].value = 'visible');
                            } else {
                              return [
                                ...prev,
                                { index: index, value: 'visible' },
                              ];
                            }
                          });
                        }}
                        onBlur={() =>
                          setOverflow((prev) => {
                            const i = prev.findIndex((p) => p.index == index);
                            if (i > -1) {
                              prev[i].value = 'hidden';
                              return prev;
                            }
                          })
                        }
                        onChange={(r) => {
                          if (option.type === 'multi-select') {
                            formik.setFieldValue(
                              option.name,
                              r.map((r) => r.value)
                            );
                          } else {
                            formik.setFieldValue(option.name, r.value);
                          }
                          changeHandler(r);
                        }}
                      />
                    </FilterListItem>
                  )}
                </>
              );
            })}
          </ul>
          <button type="submit">Apply</button>
        </form>
      </Card>
    </div>
  );
};

export default Filters;
