import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import CardInformation from './card-information';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { getPaginationSite, makeFakeCardList } from '../../mock/mock';
import { Provider } from 'react-redux';

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
});

describe('Component: CardInformation', () => {
  it('should render CardInformation component', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <CardInformation />
        </Router>
      </Provider>);

    expect(screen.getByText(/The page is under development/)).toBeInTheDocument();
  });
});
