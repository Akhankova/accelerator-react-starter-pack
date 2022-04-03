import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import Pagination from './pagination';
import {createMemoryHistory} from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { getPaginationSite, makeFakeCardList } from '../../mock/mock';
import { Provider } from 'react-redux';

const history = createMemoryHistory();
const mockStore = configureMockStore();

const store = mockStore({
  DATA_CARDS: {
    cards: makeFakeCardList(10),
    cardsTotalCount: 25,
    paginationSite: getPaginationSite(),
  },
});

describe('Component: Pagination', () => {
  it('should render Pagination component', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <Pagination />
        </Router>
      </Provider>);

    expect(screen.getByText('Далее')).toBeInTheDocument();
  });
} );


