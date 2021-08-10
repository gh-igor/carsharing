import { DataGrid } from '@material-ui/data-grid';
import { useMemo } from 'react';
import { getList } from '../../storage/localStorage';
import AdaptiveBlock from '../AdaptiveBlock';
import MobileTable from './MobileTable';
import styles from './ResultList.module.css';


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
    field: 'summary',
    headerName: 'Цена',
    headerAlign: 'left',
    align: 'center',
    type: 'number',
    width: 135,
  },
  {
    field: 'car',
    headerName: 'Авто',
    width: 110,
  },
  {
    field: 'prepay',
    headerName: 'Предоплата',
    headerAlign: 'left',
    align: 'center',
    type: 'number',
    width: 160,
  },
  {
    field: 'kmInc',
    headerName: 'Км вкл',
    headerAlign: 'left',
    align: 'center',
    type: 'number',
    width: 125,
  },
  {
    field: 'timeInc',
    headerName: 'Время вкл',
    headerAlign: 'left',
    align: 'center',
    type: 'number',
    width: 150,
  },
  {
    field: 'kmOver',
    headerName: 'Км овер',
    headerAlign: 'left',
    align: 'center',
    type: 'number',
    width: 135,
  },
  {
    field: 'timeOver',
    headerName: 'Время овер',
    headerAlign: 'left',
    align: 'center',
    type: 'number',
    width: 155,
  },
];

export default function ResultList({ km, min }) {
  const planList = getList();

  const rows = useMemo(() => {
    return planList.map((plan) => {
      const kmRest = km - plan.kmInc;
      const kmResult = kmRest > 0 ? kmRest * Number(plan.kmOver) : 0;

      const timeRest = min - plan.timeInc;
      const timeResult = timeRest > 0 ? timeRest * Number(plan.timeOver) : 0;

      return { ...plan, summary: Number(plan.prepay) + kmResult + timeResult };
    }).filter(plan => {
      if (plan.timeInc < min && plan.timeOver) {
        return true;
      }
      return plan.timeInc >= min || !plan.timeInc;
    }).sort((a, b) => a.summary - b.summary);
  }, [km, min, planList]);

  return (
    <div className={styles.root}>
      <AdaptiveBlock devices={['desktop', 'tablet']}>
        <DataGrid
          rows={rows}
          columns={columns}
          autoPageSize
        />
      </AdaptiveBlock>
      <AdaptiveBlock devices={['mobile']}>
        <MobileTable rows={rows} />
      </AdaptiveBlock>
    </div>
  );
}