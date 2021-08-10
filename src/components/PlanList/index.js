import { DataGrid } from '@material-ui/data-grid';
import { useCallback, useContext, useState } from 'react';
import { Button } from '@material-ui/core';
import { AlertContext } from '../Alert/context';
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
    headerName: 'Предоплата',
    headerAlign: 'left',
    align: 'center',
    type: 'number',
    width: 160,
    editable: true,
  },
  {
    field: 'kmInc',
    headerName: 'Км вкл',
    headerAlign: 'left',
    align: 'center',
    type: 'number',
    width: 125,
    editable: true,
  },
  {
    field: 'timeInc',
    headerName: 'Время вкл',
    headerAlign: 'left',
    align: 'center',
    type: 'number',
    width: 150,
    editable: true,
  },
  {
    field: 'kmOver',
    headerName: 'Км овер',
    headerAlign: 'left',
    align: 'center',
    type: 'number',
    width: 140,
    editable: true,
  },
  {
    field: 'timeOver',
    headerName: 'Время овер',
    headerAlign: 'left',
    align: 'center',
    type: 'number',
    width: 155,
    editable: true,
  },
];

export default function PlanList({ planList, onUpdateItem, onDeleteItems }) {
  const [selectedIds, setIds] = useState([]);
  const { setOpen, setSeverity, setMessage } = useContext(AlertContext);

  const onCommit = useCallback(({ row, field, value }) => {
    if (!row) {
      setSeverity('error');
      setMessage('Ошибка сохранения. Перезагружаем страницу');
      setOpen(true);
      window.location.reload();
    }
    onUpdateItem({ ...row, [field]: value }, row.id);
  }, [setSeverity, setMessage, setOpen, onUpdateItem]);

  const onDelete = useCallback(() => {
    if (window.confirm("agree?")) onDeleteItems(selectedIds);
  }, [selectedIds, onDeleteItems]);

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