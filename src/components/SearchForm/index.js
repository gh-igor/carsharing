import { TextField } from '@material-ui/core';
import styles from './SearchForm.module.css'

export default function SearchForm({ values: { km, min }, onChange }) {
  return (
    <>
      <TextField
        name='km'
        value={km}
        onChange={onChange}
        type='number'
        className={styles.field}
        label="Расстояние, км"
        variant="outlined"
      />
      <TextField
        name='min'
        value={min}
        onChange={onChange}
        type='number'
        className={styles.field}
        label="Время, мин"
        variant="outlined"
      />
    </>
  )
}
