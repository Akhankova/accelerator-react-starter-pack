import { Switch, Route } from 'react-router-dom';
import WelcomeScreen from '../welcome-screen/welcome-screen';
import NotFound from '../not-found/not-found';
import { AppRoute } from '../../const';
import CardInformation from '../card-information/card-information';
import Cart from '../cart/cart';

function App(): JSX.Element {
  return (
    <Switch>
      <Route exact path={[AppRoute.Main, AppRoute.Catalog]}>
        <WelcomeScreen />
      </Route>
      <Route exact path={AppRoute.Guitar}>
        <CardInformation />
      </Route>
      <Route exact path={AppRoute.Cart}>
        <Cart />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default App;


