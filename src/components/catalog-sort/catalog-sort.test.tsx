import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import CatalogSort from './catalog-sort';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { getPaginationSite } from '../../mock/mock';
import { Provider } from 'react-redux';
import { Sort } from '../../const';

const history = createMemoryHistory();
const mockStore = configureMockStore();


const store = mockStore({
  DATA_SORT: {
    currentSortingType: Sort.Price,
    currentSortingOrder: Sort.Asc,
  },
  DATA_CARDS: {
    paginationSite: getPaginationSite(),
  },
});

describe('Component: CatalogSort', () => {
  it('should render CatalogSort correctly', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <CatalogSort />
        </Router>
      </Provider>);

    expect(screen.getByText(/Сортировать:/)).toBeInTheDocument();
  });
});
