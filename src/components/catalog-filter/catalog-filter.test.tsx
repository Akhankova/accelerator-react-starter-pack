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
    cardsTotalCount: 25,
    paginationSite: getPaginationSite(),
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
