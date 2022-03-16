import { Switch, Route, BrowserRouter } from 'react-router-dom';
import WelcomeScreen from '../welcome-screen/welcome-screen';
import { AppRoute } from '../../const';
import {SmallCards} from '../../types/cards';

type AppProps = {
  cards: SmallCards;
}

function App({cards}: AppProps): JSX.Element {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={AppRoute.Main}>
          <WelcomeScreen cards={cards}/>
        </Route>
        <Route>

        </Route>
      </Switch>
    </BrowserRouter>

  );
}

export default App;

