import { DataGrid } from '@material-ui/data-grid';
import { useMemo } from 'react';
import styles from './ResultList.module.css';
import { getList } from '../../storage/localStorage';


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
  },
  {
    field: 'tariff',
    headerName: 'Тариф',
    width: 130,
  },
  {
    field: 'car',
    headerName: 'Авто',
    width: 110,
  },
  {
    field: 'prepay',
    headerName: 'предоплата',
    type: 'number',
    width: 140,
  },
  {
    field: 'kmInc',
    headerName: 'km inc.',
    type: 'number',
    width: 125,
  },
  {
    field: 'timeInc',
    headerName: 'time inc.',
    type: 'number',
    width: 130,
  },
  {
    field: 'kmOver',
    headerName: 'km extra',
    type: 'number',
    width: 135,
  },
  {
    field: 'timeOver',
    headerName: 'time extra',
    type: 'number',
    width: 140,
  },
  {
    field: 'summary',
    headerName: 'summary',
    type: 'number',
    width: 135,
  },
];

export default function ResultList({ km, min }) {
  const planList = useMemo(() => getList());

  const rows = useMemo(() => {
    return planList.map((plan) => {
      const kmRest = km - plan.kmInc;
      const kmResult = kmRest > 0 ? kmRest * Number(plan.kmOver) : 0;

      const timeRest = min - plan.timeInc;
      const timeResult = timeRest > 0 ? timeRest * Number(plan.timeOver) : 0;

      return { ...plan, summary: Number(plan.prepay) + kmResult + timeResult };
    }).filter(plan => plan.timeInc >= min || !plan.timeInc).sort((a, b) => a.summary - b.summary);
  }, [km, min, planList]);

  return (
    <div className={styles.root}>
      <DataGrid
        rows={rows}
        columns={columns}
        autoPageSize
      />
    </div>
  );
}