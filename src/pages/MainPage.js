import SearchForm from '../components/SearchForm';
import ResultList from '../components/ResultList';
import { useCallback, useState } from 'react';

export default function MainPage() {
  const [values, setState] = useState({
    km: '',
    min: '',
  });

  const onChange = useCallback((e) => {
    const { name, value } = e.target;
    setState({
      ...values,
      [name]: Number(value),
    });
  }, [values]);

  return (
    <>
      <SearchForm values={values} onChange={onChange} />
      {values.km && values.min ? (
        <ResultList km={values.km} min={values.min} />
      ) : null}
    </>
  );
}

