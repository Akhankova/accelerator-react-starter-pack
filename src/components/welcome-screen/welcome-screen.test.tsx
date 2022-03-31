import { Router } from 'react-router-dom';
import { screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import WelcomeScreen from './welcome-screen';
import { getPaginationSite, makeFakeCardList } from '../../mock/mock';
import { Sort } from '../../const';
import ReactDOM from 'react-dom';
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
});

describe('Component: WelcomeScreen', () => {
  store.dispatch = jest.fn();
  it('should render correctly', () => {
    const div = document.createElement('div');
    const content = (
      <Provider store={store}>
        <Router history={history}>
          <WelcomeScreen />
        </Router>
      </Provider>);
    ReactDOM.render(
      content,
      div,
    );

    expect(screen.getByTestId('catalog-cards')).toBeInTheDocument();
  });
});
