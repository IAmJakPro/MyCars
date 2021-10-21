import { useFormik } from 'formik';
import * as Yup from 'yup';

const offerValidationSchema = Yup.object().shape({});

import Card from '../UIElements/Card/Card';
import StepsProgress from '../UIElements/StepsProgress/StepsProgress';
import { useState } from 'react';
import VehicleDetails from './Steps/VehicleDetails';
import AdDetails from './Steps/AdDetails';
import ContactDetails from './Steps/ContactDetails';
import axios from 'axios';

const NewCar = () => {
  const [step, setStep] = useState(1);
  const STEPS_COUNT = 3;

  const protoType = {
    vehicle_details: {
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
          options: [],
        },
        {
          type: 'select',
          name: 'brand',
          label: 'Brand',
          default: '',
          options: [],
        },
        {
          type: 'select',
          name: 'model',
          label: 'Model',
          default: '',
          options: [],
        },
        {
          type: 'number',
          name: 'release[year]',
          label: 'Release year',
          default: '',
          min: 1941,
          max: 2021,
        },
        {
          type: 'number',
          name: 'release[month]',
          label: 'Release month',
          default: '',
          min: 1,
          max: 12,
        },
        {
          type: 'checkbox',
          name: 'crashed',
          label: 'Crashed',
          default: false,
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
          type: 'checkbox',
          name: 'garanty',
          label: 'Garanty',
          default: false,
        },
        {
          type: 'select',
          name: 'origin',
          label: 'Origin',
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
      engine: [
        // Engine
        {
          type: 'number',
          name: 'mileage',
          name: 'mileage',
          default: '',
        },
      ],
    },

    /* {
      engine: {
        //engine: { type: String },
        transmission: '',
        fuel_type: '',
        power: '',
        drive_type: '',
        size: '',
        consumption: '',
      },

      body: {
        // Body
        extern_color: '',
        intern_color: '',
        doors: '',
        seats: '',
        interior_type: '',
      },

      extras: [],
    },

    // Ad details
    ad_details: {
      title: '',
      description: '',
      ad_duration: 7,
      price: '',
      is_negociable: false,
      images: [],
    },

    // Contact details
    contact_details: {
      name: '',
      email: '',
      phone: '',
      city: '',
    }, */
  };

  /* const submitHandler = async ({ email, password }) => {
    console.log(email);
    console.log(password);
    const apiResponse = await post({ email, password }, '/api/login');
    if (apiResponse.status === 'success') {
      console.log('Success!');
    } else {
      console.log('Error');
    }
  }; */

  const stepBack = () =>
    setStep((prevStep) => (prevStep > 1 ? prevStep - 1 : prevStep));
  const stepNext = () =>
    setStep((prevStep) => (prevStep < STEPS_COUNT ? prevStep + 1 : prevStep));

  const formik = useFormik({
    initialValues: {
      // Vehicle details
      vehicle_details: {
        condition: 'used',
        category: '',
        brand: '',
        model: '',
        release: {
          year: '',
          month: '',
        }, // Re-Check
        crashed: false,
        previous_owners: '',
        garanty: false,
        origin: '',
        engine: {
          mileage: '',
          //engine: { type: String },
          transmission: '',
          fuel_type: '',
          power: '',
          drive_type: '',
          size: '',
          consumption: '',
        },

        body: {
          // Body
          extern_color: '',
          intern_color: '',
          doors: '',
          seats: '',
          interior_type: '',
        },

        extras: [],
      },

      // Ad details
      ad_details: {
        title: '',
        description: '',
        ad_duration: 7,
        price: '',
        is_negociable: false,
        images: [],
      },

      // Contact details
      contact_details: {
        name: '',
        email: '',
        phone: '',
        city: '',
      },
    },
    validationSchema: offerValidationSchema,
    onSubmit: (values) => {
      console.log(values);
      //submitHandler(values);
    },
  });

  const onNext = () => {
    if (step < STEPS_COUNT) {
      stepNext();
    }
    formik.validateForm();
  };

  return (
    <div>
      <StepsProgress
        steps={['Vehicle details', 'Ad details', 'Contact details']}
        currentStep={step}
      />
      <Card>
        <form onSubmit={formik.handleSubmit}>
          {step === 1 && (
            <VehicleDetails
              formik={formik}
              categories={[]}
              brands={[]}
              protoType={protoType.vehicle_details}
              onNext={onNext}
            />
          )}
          {step === 2 && <AdDetails formik={formik} onBack={stepBack} />}
          {step === 3 && (
            <ContactDetails formik={formik} onBack={stepBack} cities={cities} />
          )}
        </form>
      </Card>
    </div>
  );
};

export default NewCar;
