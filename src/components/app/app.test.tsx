import { Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import App from './app';
import { AppRoute, Sort } from '../../const';
import { getPaginationSite, makeFakeCardList } from '../../mock/mock';

const mockStore = configureMockStore();
const history = createMemoryHistory();

const store = mockStore({
  DATA_CARDS: {
    cards: makeFakeCardList(10),
    cardsTotalCount: 25,
    paginationSite: getPaginationSite(),
  },
  DATA_SORT: {
    currentSortingType: Sort.Price,
    currentSortingOrder: Sort.Asc,
  },
  DATA_FILTER: {
    stringsCount: [false, false, false, false],
    filterTypeGuitar: '',
    filterTypeGuitarElectric: '',
    filterTypeGuitarUkulele: '',
    minPrice: 0,
    maxPrice: 0,
    filtredCards: makeFakeCardList(10),
  },
});

const fakeApp = (
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>
);

describe('App', () => {
  store.dispatch = jest.fn();
  it('should render "WelcomeScreen" when user navigate to "/"', () => {
    history.push(AppRoute.Main);

    render(fakeApp);

    expect(screen.getByTestId('loading')).toBeInTheDocument();
  });

  it('should render "NotFound" when user navigate to non-existent route', () => {
    history.push('/404');

    render(fakeApp);

    expect(screen.getByTestId('not')).toBeInTheDocument();
  });
});
