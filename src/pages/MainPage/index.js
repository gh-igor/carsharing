import { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import Alert from '@material-ui/lab/Alert';
import SearchForm from '../../components/SearchForm';
import ResultList from '../../components/ResultList';
import { getList } from '../../storage/localStorage';
import styles from './MainPage.module.css';

export default function MainPage() {
  const planList = getList();

  const [values, setState] = useState({
    km: '',
    min: '',
  });

  const onChange = useCallback((e) => {
    const { name, value } = e.target;
    setState({
      ...values,
      [name]: value === "" ? "" : Number(value),
    });
  }, [values]);

  return (
    <>
      {planList.length === 0 && (
        <Alert className={styles.alert} severity="warning">
          Внимание! Тарифы не загружены. Для загрузки необходимо перейти в <Link to='/settings'>настройки</Link>
        </Alert>
      )}
      <SearchForm values={values} onChange={onChange} />
      {values.km && values.min ? (
        <ResultList km={values.km} min={values.min} />
      ) : null}
    </>
  );
}

