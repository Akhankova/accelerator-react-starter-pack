import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import Cart from './cart';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { getPaginationSite, makeFakeCardList } from '../../mock/mock';
import { Provider } from 'react-redux';
import { Sort } from '../../const';

const history = createMemoryHistory();
const mockStore = configureMockStore();

const store = mockStore({
  DATA_CARDS: {
    cards: makeFakeCardList(10),
    cardsCart: makeFakeCardList(10),
    cardsTotalCount: 25,
    paginationSite: getPaginationSite(),
    cardsForSerch: makeFakeCardList(10),
    coupon: 0,
    promo: {'coupon': ''},
  },
  DATA_SORT: {
    currentSortingType: Sort.Price,
    currentSortingOrder: Sort.Asc,
  },
  DATA_FILTER: {
    minPrice: 0,
    maxPrice: 0,
    stringsCount: [false, false, false, false],
    filterTypeGuitar: '',
    filterTypeGuitarElectric: '',
    filterTypeGuitarUkulele: '',
    filtredCards: makeFakeCardList(10),
  },
});

describe('Component: Cart', () => {
  store.dispatch = jest.fn();
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <Cart />
        </Router>
      </Provider>);

    expect(screen.getByTestId('cart-test')).toBeInTheDocument();
  });
});
