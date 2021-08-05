import { useCallback, useState } from 'react';
import { getList, updateList } from '../storage/localStorage';
import PlanForm from '../components/PlanForm';
import PlanList from '../components/PlanList';

export default function PlansPage() {
  const [planList, setPlanList] = useState(getList());
  const addItem = useCallback((item) => {
    const planListUpdated = [ ...planList, item];
    setPlanList(planListUpdated);
    updateList(planListUpdated);
  }, [planList]);

  const updateItem = useCallback((row, id) => {
    const planListUpdated = planList.map(item => item.id === id ? row : item);
    setPlanList(planListUpdated);
    updateList(planListUpdated);
  }, [planList]);

  const deleteItems = useCallback((ids) => {
    const filteredList = planList.filter(item => !ids.includes(item.id));
    setPlanList(filteredList);
    updateList(filteredList);
  }, [planList]);

  return (
    <>
      <PlanForm onAddItem={addItem} />
      <PlanList planList={planList} onUpdateItem={updateItem} onDeleteItems={deleteItems} />
    </>
  );
}

