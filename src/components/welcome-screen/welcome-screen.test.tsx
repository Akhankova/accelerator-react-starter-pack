import { Router } from 'react-router-dom';
import { screen, render } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import WelcomeScreen from './welcome-screen';
import { getPaginationSite, makeFakeCardList } from '../../mock/mock';
import { Sort } from '../../const';
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

describe('Component: WelcomeScreen', () => {
  store.dispatch = jest.fn();
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <WelcomeScreen />
        </Router>
      </Provider>);
    expect(screen.getByTestId('catalog-cards')).toBeInTheDocument();
  });
});

