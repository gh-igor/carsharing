import { Button } from '@material-ui/core';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import SyncIcon from '@material-ui/icons/Sync';
import { Alert } from '@material-ui/lab';
import { getList, updateList } from '../../storage/localStorage';
import { saveAs } from 'save-as';
import { useContext, useEffect, useState } from 'react';
import { AlertContext } from '../../components/Alert/context';
import fixtures from '../../fixtures/planList.json';
import styles from './SettingsPage.module.css';

export default function SettingsPage() {
  const [fileError, setFileError] = useState('');
  const { setOpen, setMessage, setSeverity } = useContext(AlertContext);

  const onFixturesLoad = () => {
    if (window.confirm('удалятся ваши текущие тарифы. Продолжить?')) {
      updateList(fixtures);

      setSeverity('success');
      setMessage('Тарифы загружены!');
      setOpen(true);
    }
  };

  const onChangeInputFile = (e) => {
    const { files } = e.target;

    if (!files[0]) {
      setFileError('Файл не выбран');
      return;
    }

    if (files[0].size > 5 * 1024 * 1024) {
      setFileError('Файл должен быть менее 5Мб');
      return;
    }

    if (files[0].type !== 'application/json') {
      setFileError('Выберите файл json');
      return;
    }

    if (window.confirm('удалятся ваши текущие тарифы. Продолжить?')) {
      const fileReader = new FileReader();
      fileReader.onload = (e) => {
        try {
          const planList = JSON.parse(e.target.result);
          updateList(planList);

          setFileError('');
          setSeverity('success');
          setMessage('Данные импортированы успешно!');
          setOpen(true);
        } catch (e) {
          setFileError('Входе импорта возникла ошибка');
          console.error(e);
        }
      };
      fileReader.readAsText(files[0]);
    }
  };

  const onExport = () => {
    const planList = getList();
    const blob = new Blob([JSON.stringify(planList)], { type: 'application/json'});
    saveAs(blob, 'planList.json');
  };

  useEffect(() => {
    if (!fileError) return;
    setSeverity('error');
    setMessage(fileError);
    setOpen(true);
  }, [fileError, setSeverity, setMessage, setOpen]);

  return (
    <div className={styles.root}>
      <Alert className={styles.alert} severity='info'>
        Разработчиком добавлены большинство известных тарифов трех каршеринговых служб
      </Alert>
      <Button
        className={styles.btn}
        color='secondary'
        variant='outlined'
        onClick={onFixturesLoad}
        startIcon={<SyncIcon />}
      >
        Загрузить имеющиеся на сайте тарифы
      </Button>
      <Alert className={styles.alert} severity='success'>
        Есть возможность импорта/экспорта ваших персональных тарифных планов
      </Alert>
      <Button
        className={styles.btn}
        color='primary'
        variant='outlined'
        startIcon={<CloudUploadIcon />}
      >
        {/* fixme: label clickable only */}
        <label>
          Импорт из файла
          <input className={styles.inputFile} type='file' onChange={onChangeInputFile}/>
        </label>
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
    </div>
  );
}

