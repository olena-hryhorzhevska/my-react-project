import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import { useId } from 'react';
import css from './OrderFormFormik.module.css';
import * as Yup from 'yup';

interface OrderFormValues {
  username: string;
  email: string;
  deliveryTime: string;
  delivery: string;
  restrictions: string[];
}

const initialValues: OrderFormValues = {
  username: '',
  email: '',
  deliveryTime: '',
  delivery: 'pickup',
  restrictions: [],
};

const OrderFormSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, 'Name must be at least 2 characters')
    .max(30, 'Name is too long')
    .required('Name is required'),
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  delivery: Yup.string()
    .oneOf(['pickup', 'courier', 'drone'], 'Invalid delivery method')
    .required('Delivery method is required'),
  restrictions: Yup.array().of(Yup.string()),
  deliveryTime: Yup.string().required('Select delivery time'),
  message: Yup.string().min(5, 'Message to short').max(200, 'Message too long'),
});

export default function OrderFormFormik() {
  const fieldId = useId();

  const handleSubmit = (
    values: OrderFormValues,
    actions: FormikHelpers<OrderFormValues>
  ) => {
    console.log('Order data:', values);
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={OrderFormSchema}
      onSubmit={handleSubmit}
    >
      <Form className={css.form}>
        <fieldset className={css.fieldset}>
          <legend className={css.legend}>Client Info</legend>
          <label className={css.label} htmlFor={`${fieldId}-username`}>
            Name
          </label>
          <Field
            className={css.field}
            type="text"
            name="username"
            id={`${fieldId}-username`}
          />
          <ErrorMessage
            name="username"
            component="span"
            className={css.error}
          />
          <label className={css.label} htmlFor={`${fieldId}-email`}>
            Email
          </label>
          <Field
            className={css.field}
            type="email"
            name="email"
            id={`${fieldId}-email`}
          />
          <ErrorMessage name="email" component="span" className={css.error} />
        </fieldset>

        <fieldset
          style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
        >
          <label htmlFor={`${fieldId}-deliveryTime`}>
            Preferred delivery time
          </label>
          <Field as="select" name="deliveryTime" id={`${fieldId}-deliveryTime`}>
            <option value="">-- Choose delivery time --</option>
            <option value="morning">Morning (8:00–12:00)</option>
            <option value="afternoon">Afternoon (12:00–16:00)</option>
            <option value="evening">Evening (16:00–20:00)</option>
          </Field>
          <ErrorMessage
            name="deliveryTime"
            component="span"
            className={css.error}
          />
        </fieldset>

        <fieldset
          style={{
            display: 'flex',
            padding: '5px 20px',
            justifyContent: 'space-between',
          }}
        >
          <legend>Delivery method</legend>
          <label>
            <Field type="radio" name="delivery" value="pickup" />
            Pickup
          </label>
          <label>
            <Field type="radio" name="delivery" value="courier" />
            Courier
          </label>
          <label>
            <Field type="radio" name="delivery" value="drone" />
            Drone delivery
          </label>
          <ErrorMessage
            name="delivery"
            component="span"
            className={css.error}
          />
        </fieldset>

        <fieldset
          style={{
            display: 'flex',
            padding: '5px 20px',
            justifyContent: 'space-between',
          }}
        >
          <legend>Dietary restrictions</legend>
          <label>
            <Field type="checkbox" name="restrictions" value="vegan" />
            Vegan
          </label>
          <label>
            <Field type="checkbox" name="restrictions" value="gluten-free" />
            Gluten-free
          </label>
          <label>
            <Field type="checkbox" name="restrictions" value="nut-free" />
            Nut-free
          </label>
          <ErrorMessage
            name="restrictions"
            component="span"
            className={css.error}
          />
        </fieldset>

        <fieldset style={{display: 'flex', flexDirection: 'column'}}>
          <label htmlFor={`${fieldId}-textarea`}>Comment or instructions</label>
          <Field
            as="textarea"
            name="message"
            id={`${fieldId}-textarea`}
            rows={5}
          />
          <ErrorMessage name="message" component="span" className={css.error} />
        </fieldset>

        <button className={css.btn} type="submit">
          Place order
        </button>
      </Form>
    </Formik>
  );
}
