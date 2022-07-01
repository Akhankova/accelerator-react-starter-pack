import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import ModalCart from './modal-cart';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { makeFakeCardList } from '../../mock/mock';
import { Provider } from 'react-redux';
import { makeFakeCard } from '../../mock/mock';

const card = makeFakeCard();
const history = createMemoryHistory();
const mockStore = configureMockStore();
const onCloseFake = () => 'void';
const onOpenFake = () => 'void';

const store = mockStore({
  DATA_CARDS: {
    cards: makeFakeCardList(10),
  },
});

describe('Component: ModalCart', () => {
  it('should render ModalCart correctly', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <ModalCart
            onOpen={onOpenFake}
            onClose={onCloseFake}
            card={card}
          />
        </Router>
      </Provider>);

    expect(screen.getByText('Цена:')).toBeInTheDocument();
  });
});
