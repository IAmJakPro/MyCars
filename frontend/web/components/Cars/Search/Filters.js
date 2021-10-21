import { useFormik } from 'formik';
import { useEffect, useRef, useState } from 'react';
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
import FilterListItems from './FilterListItems';
import RangeInput from '../../UIElements/FormElements/RangeInput';

const Filters = ({ onFilters, cities, brands, categories }) => {
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;
  }, [router.isReady]);

  //
  /**
   * single-check
   * multi-check
   * min-max-input
   * min-max-select
   * single-select
   * multi-select
   */

  const options = {
    general: {
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
      ],
      pricing: [
        {
          type: 'min-max-input',
          label: 'Price',
          name: 'price',
          default: '',
          min: 0,
          max: 1000000,
        },
        {
          type: 'single-check',
          label: 'Is negociable',
          name: 'is_negociable',
          default: '',
        },
        {
          type: 'single-check',
          label: 'Garanty',
          name: 'garanty',
          default: false,
          options: [{ label: 'Garanty', value: true }],
        },
      ],
      car_history: [
        {
          type: 'min-max-select',
          label: 'Previous owners',
          name: 'previous_owners',
          default: '',
          min: 1,
          max: 10,
        },
        {
          type: 'single-check',
          label: 'Crashed',
          name: 'crashed',
          default: false,
          options: [{ label: 'Crashed', value: true }],
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
      ],
    },

    others: {
      engine: [
        // Engine
        {
          type: 'min-max-input',
          label: 'Mileage',
          name: 'mileage',
          default: '',
          min: 0,
          max: 1000000,
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
          type: 'min-max-select',
          label: 'Size',
          name: 'size',
          default: '',
          min: 1,
          max: 10,
        },
        {
          type: 'min-max-select',
          label: 'Power',
          name: 'power',
          default: '',
          min: 2,
          max: 100,
        },
        {
          type: 'min-max-select',
          label: 'Consumption',
          name: 'consumption',
          default: '',
          min: 2,
          max: 20,
        },
      ],
      body: [
        // Body
        {
          type: 'single-check',
          label: 'Extern color',
          name: 'extern_color',
          options: [
            { value: 'ocean', label: 'Ocean', color: '#00B8D9', isFixed: true },
            {
              value: 'blue',
              label: 'Blue',
              color: '#0052CC',
              isDisabled: true,
            },
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
            {
              value: 'blue',
              label: 'Blue',
              color: '#0052CC',
              isDisabled: true,
            },
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
          type: 'min-max-select',
          label: 'Doors',
          name: 'doors',
          default: '',
          min: 2,
          max: 10,
        },
        {
          type: 'min-max-select',
          label: 'Seats',
          name: 'seats',
          default: '',
          min: 2,
          max: 10,
        },
        {
          type: 'single-check',
          label: 'Interior type',
          name: 'interior_type',
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
    },
  };

  const ivs = {
    condition: '',
    category: '',
    brand: '',
    model: '',
    min_year: '',
    max_year: '',
    crashed: '',
    previous_owners: '',
    garanty: '',
    origin: '',

    min_mileage: '',
    max_mileage: '',
    transmission: [],
    fuel_type: [],
    min_power: '',
    max_power: '',
    drive_type: [],
    min_size: '',
    max_size: '',
    min_consumption: '',
    max_consumption: '',

    extern_color: [],
    intern_color: [],
    min_doors: '',
    max_doors: '',
    min_seats: '',
    max_seats: '',
    interior_type: [],
    extras: [],
    min_price: '',
    max_price: '',
    is_negociable: false,
    city: '',
  };

  for (const q in router.query) {
    if (ivs.hasOwnProperty(q)) {
      ivs[q] = router.query[q];
    }
  }

  const formik = useFormik({
    initialValues: ivs,
    //validationSchema: offerValidationSchema,
    onSubmit: (values) => {
      console.log(values);
      onFilters(values);
    },
  });

  console.log(ivs);
  console.log();

  const changeHandler = (e) => {
    console.log(e);
    //formik.handleSubmit();
  };

  return (
    <div className={styles.filters}>
      <form onSubmit={formik.handleSubmit}>
        {/* Fixed Top */}
        <Card bodyStyle={{ paddingLeft: '0', paddingRight: '0' }}>
          <FilterListItems
            options={options.general.fixed}
            formik={formik}
            //title="General"
          />
          {/* Fixed Top Ends */}
          <hr className={styles.separator} />
          {/* Fixed Pricing */}
          <FilterListItems
            options={options.general.pricing}
            formik={formik}
            title="Pricing"
          />
          {/* Fixed Pricing Ends */}
          <hr className={styles.separator} />
          {/* Fixed Car History */}
          <FilterListItems
            options={options.general.car_history}
            formik={formik}
            title="Car history"
          />
        </Card>
        {/* Fixed Car History Ends */}

        <ul className={styles['options-list']}>
          <Card
            bodyStyle={{ paddingLeft: '0', paddingRight: '0' }}
            extraClasses="mt-1"
            title="Engine"
            titleStyle={{ paddingLeft: '1rem', marginBottom: '.6rem' }}
          >
            <FilterListItems
              options={options.others.engine}
              formik={formik}
              //title=""
              type="options-list"
            />
          </Card>
          <Card
            bodyStyle={{ paddingLeft: '0', paddingRight: '0' }}
            extraClasses="mt-1"
            title="Body"
            titleStyle={{ paddingLeft: '1rem', marginBottom: '.6rem' }}
          >
            <FilterListItems
              options={options.others.body}
              formik={formik}
              //title="Body"
              type="options-list"
            />
          </Card>
        </ul>
        <button type="submit">Apply</button>
      </form>
    </div>
  );
};

export default Filters;
