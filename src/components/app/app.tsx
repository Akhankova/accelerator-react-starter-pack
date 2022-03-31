import { Switch, Route, BrowserRouter } from 'react-router-dom';
import WelcomeScreen from '../welcome-screen/welcome-screen';
import NotFound from '../not-found/not-found';
import { AppRoute } from '../../const';
import CardInformation from '../card-information/card-information';

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={AppRoute.Main}>
          <WelcomeScreen />
        </Route>
        <Route exact path={AppRoute.Guitar}>
          <CardInformation />
        </Route>
        <Route exact path={AppRoute.Catalog}>
          <WelcomeScreen />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;

