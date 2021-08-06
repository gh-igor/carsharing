import { TextField } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import styles from './SearchForm.module.css'

export default function SearchForm({ values: { km, min }, onChange }) {
  return (
    <Grid container>
      <Grid item xs={12} sm={6} className={styles.left}>
        <TextField
          name='km'
          value={km}
          onChange={onChange}
          type='number'
          className={styles.field}
          label="Расстояние, км"
          variant="outlined"
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          name='min'
          value={min}
          onChange={onChange}
          type='number'
          className={styles.field}
          label="Время, мин"
          variant="outlined"
        />
      </Grid>
    </Grid>
  )
}
