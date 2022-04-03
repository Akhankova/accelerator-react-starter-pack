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

