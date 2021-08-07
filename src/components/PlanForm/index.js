import { Button, TextField } from '@material-ui/core';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useCallback } from 'react';
import { v1 as uuid } from "uuid";
import styles from './PlanForm.module.css';

const validationSchema = Yup.object({
  vendor: Yup.string().required(),
  tariff: Yup.string().required(),
  car: Yup.string().required(),
  prepay: Yup.number(),
  kmInc: Yup.number(),
  timeInc: Yup.number(),
  kmOver: Yup.number(),
  timeOver: Yup.number(),
});

export default function PlanForm({ onAddItem }) {
  const { values, errors, touched, setFieldValue, setFieldTouched, handleSubmit, resetForm } = useFormik({
    initialValues: {
      vendor: '',
      tariff: '',
      car: '',
      prepay: '',
      kmInc: '',
      timeInc: '',
      kmOver: '',
      timeOver: '',
    },
    validationSchema,
    onSubmit: (values) => {
      onAddItem({ ...values, id: uuid() });
      resetForm();
    },
  });

  const onChange = useCallback((e) => {
    const { name, value, type } = e.target;
    const isString = Number.isNaN(Number(value)) || value === "" || type === "text";
    setFieldValue(name, isString ? value : Number(value));
  }, []);

  const onBlur = useCallback((e) => {
    const { name } = e.target;
    setFieldTouched(name);
  }, []);

  return (
    <form onSubmit={handleSubmit} className={styles.root}>
      <TextField
        className={styles.field}
        label='Служба'
        variant='outlined'
        onChange={onChange}
        onBlur={onBlur}
        name="vendor"
        value={values.vendor}
        error={Boolean(touched.vendor && errors.vendor)}
        helperText={touched.vendor && errors.vendor}
      />
      <TextField
        className={styles.field}
        label='Название тарифа'
        variant='outlined'
        onChange={onChange}
        onBlur={onBlur}
        name="tariff"
        value={values.tariff}
        error={Boolean(touched.tariff && errors.tariff)}
        helperText={touched.tariff && errors.tariff}
      />
      <TextField
        className={styles.field}
        label='Авто'
        variant='outlined'
        onChange={onChange}
        onBlur={onBlur}
        name='car'
        value={values.car}
        error={Boolean(touched.car && errors.car)}
        helperText={touched.car && errors.car}
      />
      <TextField
        className={styles.field}
        type='number'
        label='Предоплата, руб.'
        variant='outlined'
        onChange={onChange}
        onBlur={onBlur}
        name='prepay'
        value={values.prepay}
        error={Boolean(touched.prepay && errors.prepay)}
        helperText={touched.prepay && errors.prepay}
      />
      <TextField
        className={styles.field}
        type='number'
        label='Включено км'
        variant='outlined'
        onChange={onChange}
        onBlur={onBlur}
        name="kmInc"
        value={values.kmInc}
        error={Boolean(touched.kmInc && errors.kmInc)}
        helperText={touched.kmInc && errors.kmInc}
      />
      <TextField
        className={styles.field}
        type='number'
        label='Включено время, мин'
        variant='outlined'
        onChange={onChange}
        onBlur={onBlur}
        name="timeInc"
        value={values.timeInc}
        error={Boolean(touched.timeInc && errors.timeInc)}
        helperText={errors.timeInc}
      />
      <TextField
        className={styles.field}
        type='number'
        label='Перепробег, руб./км'
        variant='outlined'
        onChange={onChange}
        onBlur={onBlur}
        name="kmOver"
        value={values.kmOver}
        error={Boolean(touched.kmOver && errors.kmOver)}
        helperText={touched.kmOver && errors.kmOver}
      />
      <TextField
        className={styles.field}
        type='number'
        label='Перепробег время, руб./мин'
        variant='outlined'
        onChange={onChange}
        onBlur={onBlur}
        name="timeOver"
        value={values.timeOver}
        error={Boolean(touched.timeOver && errors.timeOver)}
        helperText={touched.timeOver && errors.timeOver}
      />
      <Button className={styles.btn} type="submit" color='primary' variant='outlined'>Добавить</Button>
    </form>
  );
}