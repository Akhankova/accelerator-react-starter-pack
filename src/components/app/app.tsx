import { Switch, Route } from 'react-router-dom';
import WelcomeScreen from '../welcome-screen/welcome-screen';
import NotFound from '../not-found/not-found';
import { AppRoute } from '../../const';
import CardInformation from '../card-information/card-information';
import { useSelector } from 'react-redux';
import { getIsDataLoading } from '../../store/cards-data/selectors';
import Loading from '../loading/loading';

function App(): JSX.Element {
  const isDataLoaded = useSelector(getIsDataLoading);

  if (!isDataLoaded) {
    return (
      <Loading />
    );
  }
  return (
    <Switch>
      <Route exact path={[AppRoute.Main, AppRoute.Catalog]}>
        <WelcomeScreen />
      </Route>
      <Route exact path={AppRoute.Guitar}>
        <CardInformation />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default App;


