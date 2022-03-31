import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import CatalogFilter from './catalog-filter';
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
});

describe('Component: CatalogFilter', () => {
  store.dispatch = jest.fn();
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <CatalogFilter />
        </Router>
      </Provider>);

    expect(screen.getByTestId('checkbox-electric')).toBeInTheDocument();
    expect(screen.getByText('Фильтр')).toBeInTheDocument();
  });
});
