import { useCallback, useContext, useState } from 'react';
import { getList, updateList } from '../storage/localStorage';
import PlanForm from '../components/PlanForm';
import PlanList from '../components/PlanList';
import { AlertContext } from '../components/Alert/context';

export default function PlansPage() {
  const [planList, setPlanList] = useState(getList());
  const { setOpen, setSeverity, setMessage } = useContext(AlertContext);

  const addItem = useCallback((item) => {
    const planListUpdated = [ ...planList, item];
    setPlanList(planListUpdated);
    updateList(planListUpdated);

    setSeverity('success');
    setMessage('Тариф добавлен!');
    setOpen(true);
  }, [planList, setSeverity, setMessage, setOpen]);

  const updateItem = useCallback((row, id) => {
    const planListUpdated = planList.map(item => item.id === id ? row : item);
    setPlanList(planListUpdated);
    updateList(planListUpdated);

    setSeverity('success');
    setMessage('Сохранено');
    setOpen(true);
  }, [planList, setSeverity, setMessage, setOpen]);

  const deleteItems = useCallback((ids) => {
    const filteredList = planList.filter(item => !ids.includes(item.id));
    setPlanList(filteredList);
    updateList(filteredList);

    setSeverity('success');
    setMessage('Удалено успешно');
    setOpen(true);
  }, [planList, setSeverity, setMessage, setOpen]);

  return (
    <>
      <PlanForm onAddItem={addItem} />
      <PlanList planList={planList} onUpdateItem={updateItem} onDeleteItems={deleteItems} />
    </>
  );
}

