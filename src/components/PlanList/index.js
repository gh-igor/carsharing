import { DataGrid } from '@material-ui/data-grid';
import { useCallback, useState } from 'react';
import { Button } from '@material-ui/core';
import styles from './PlanList.module.css';

const columns = [
  {
    field: 'id',
    headerName: 'id',
    width: 88,
    hide: true,
  },
  {
    field: 'vendor',
    headerName: 'Служба',
    width: 130,
    editable: true,
  },
  {
    field: 'tariff',
    headerName: 'Тариф',
    width: 130,
    editable: true,
  },
  {
    field: 'car',
    headerName: 'Авто',
    width: 110,
    editable: true,
  },
  {
    field: 'prepay',
    headerName: 'предоплата',
    type: 'number',
    width: 160,
    editable: true,
  },
  {
    field: 'kmInc',
    headerName: 'km inc.',
    type: 'number',
    width: 125,
    editable: true,
  },
  {
    field: 'timeInc',
    headerName: 'time inc.',
    type: 'number',
    width: 130,
    editable: true,
  },
  {
    field: 'kmOver',
    headerName: 'km extra',
    type: 'number',
    width: 140,
    editable: true,
  },
  {
    field: 'timeOver',
    headerName: 'time extra',
    type: 'number',
    width: 140,
    editable: true,
  },
];

export default function PlanList({ planList, onUpdateItem, onDeleteItems }) {
  const [selectedIds, setIds] = useState([]);

  const onCommit = useCallback(({ row, field, value }) => {
    if (!row) {
      alert('Ошибка сохранения. Перезагрузим страницу?');
      window.location.reload();
    }
    onUpdateItem({ ...row, [field]: value }, row.id);
  }, [planList]);

  const onDelete = useCallback(() => {
    if (window.confirm("agree?")) onDeleteItems(selectedIds);
  }, [selectedIds]);

  return (
    <div className={styles.root}>
      <DataGrid
        rows={planList}
        columns={columns}
        checkboxSelection
        onCellEditCommit={onCommit}
        onSelectionModelChange={setIds}
        autoPageSize
      />
      {selectedIds.length > 0 && (
        <Button
          className={styles.btnDelete}
          variant='outlined'
          color='secondary'
          onClick={onDelete}
        >Удалить отмеченные</Button>
      )}
    </div>
  );
}