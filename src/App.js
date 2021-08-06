import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import { Container } from '@material-ui/core';
import { StylesProvider } from '@material-ui/core/styles';
import MainPage from './pages/MainPage';
import PlansPage from './pages/PlansPage';
import SettingsPage from './pages/SettingsPage';
import Navigation from './components/Navigation';
import styles from './App.module.css';

function App() {
  return (
    <StylesProvider injectFirst>
      <Container maxWidth='lg'>
        <Router>
          <Navigation />
          <div className={styles.root}>
            <Switch>
              <Route exact path='/' component={MainPage} />
              <Route path='/plans' component={PlansPage} />
              <Route path='/settings' component={SettingsPage} />
            </Switch>
          </div>
        </Router>
      </Container>
    </StylesProvider>
  );
}

export default App;
