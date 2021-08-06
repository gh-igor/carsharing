import { AppBar, Button, Toolbar } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import SettingsIcon from '@material-ui/icons/Settings';
import styles from './Navigation.module.css';

export default function Navigation() {
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
        <NavLink className={styles.navItem} to='/settings'><SettingsIcon htmlColor='white' /></NavLink>
      </Toolbar>
    </AppBar>
  );
}
