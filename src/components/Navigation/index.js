import { AppBar, Button, Toolbar } from '@material-ui/core';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { NavLink } from 'react-router-dom';
import { updateList } from '../../storage/localStorage';
import fixtures from '../../fixtures/planList.json';
import styles from './Navigation.module.css';
import { useCallback } from 'react';

export default function Navigation() {
  const onFixturesLoad = useCallback(() => {
    if (window.confirm('it will reset all your data')) {
      updateList(fixtures);
    }
  }, []);

  return (
    <AppBar position='static'>
      <Toolbar className={styles.nav}>
        <div>
          <Button>
            <NavLink className={styles.navItem} to='/'>Поиск</NavLink>
          </Button>
          <Button>
            <NavLink className={styles.navItem} to='/plans'>Планы</NavLink>
          </Button>
        </div>
        <Button color='inherit' onClick={onFixturesLoad} startIcon={<CloudUploadIcon />}>
          Fixtures
        </Button>
      </Toolbar>
    </AppBar>
  );
}
