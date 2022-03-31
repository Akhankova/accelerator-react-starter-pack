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
    cardsTotalCount: ' ',
  },
  DATA_CARD_TOTAL_COUNT: {
    cardsTotalCount: 25,
  },
  DATA_PAGINATION_SITE: {
    paginationSite: getPaginationSite(),
  },
  DATA_SORT_TYPE: {
    currentSortingType: Sort.Price,
  },
  DATA_SORT_ORDER: {
    currentSortingOrder: Sort.Asc,
  },
  DATA_SET_STRINGS_COUNT: {
    stringsCount: [false, false, false, false],
  },
  DATA_SET_FILTER_TYPE_OF_GUITAR: {
    filterTypeGuitar: '',
  },
  DATA_FILTER_TYPE_GUTAR_ELECTRIC: {
    filterTypeGuitarElectric: '',
  },
  DATA_FILTER_TYPE_GUTAR_UKULELE: {
    filterTypeGuitarUkulele: '',
  },
  DATA_MIN_PRICE: {
    minPrice: 0,
  },
  DATA_MAX_PRICE: {
    minPrice: 0,
  },
  DATA_FILTRED_CARD: {
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

    expect(screen.getByText(/Каталог гитар/i)).toBeInTheDocument();
  });

  it('should render "NotFound" when user navigate to non-existent route', () => {
    history.push('/404');

    render(fakeApp);

    expect(screen.getByText('404. Page not found')).toBeInTheDocument();
    expect(screen.getByText('Вернуться на главную')).toBeInTheDocument();
  });
});
