import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import Header from './header';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { makeFakeCardList } from '../../mock/mock';
import { Provider } from 'react-redux';

const history = createMemoryHistory();
const mockStore = configureMockStore();

const store = mockStore({
  DATA_CARDS: {
    cards: makeFakeCardList(10),
  },
  DATA_FILTER: {
    filtredCards: makeFakeCardList(10),
  },
});

describe('Component: Header', () => {
  it('should render Header correctly', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <Header />
        </Router>
      </Provider>);

    expect(screen.getByText(/Поиск/)).toBeInTheDocument();
  });
});

