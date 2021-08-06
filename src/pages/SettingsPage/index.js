import { Button } from '@material-ui/core';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import SyncIcon from '@material-ui/icons/Sync';
import { getList, updateList } from '../../storage/localStorage';
import fixtures from '../../fixtures/planList.json';
import styles from './SettingsPage.module.css';
import { saveAs } from 'save-as';

export default function SettingsPage() {
  const onFixturesLoad = () => {
    if (window.confirm('удалятся ваши текущие тарифы. Продолжить?')) {
      updateList(fixtures);
    }
  };

  const onImport = () => {
    if (window.confirm('удалятся ваши текущие тарифы. Продолжить?')) {

      updateList(fixtures);
    }
  };

  const onExport = () => {
    const planList = getList();
    const blob = new Blob([JSON.stringify(planList)], { type: 'application/json'});
    saveAs(blob, 'planList.json');
  };

  return (
    <div className={styles.root}>
      <Button
        className={styles.btn}
        color='primary'
        variant='outlined'
        onClick={onImport}
        startIcon={<CloudUploadIcon />}
      >
        Импорт из файла
      </Button>
      <Button
        className={styles.btn}
        color='primary'
        variant='outlined'
        onClick={onExport}
        startIcon={<CloudDownloadIcon />}
      >
        Экспорт в файл
      </Button>
      <Button
        className={styles.btn}
        color='secondary'
        variant='outlined'
        onClick={onFixturesLoad}
        startIcon={<SyncIcon />}
      >
        Загрузить имеющиеся на сайте тарифы
      </Button>
    </div>
  );
}

