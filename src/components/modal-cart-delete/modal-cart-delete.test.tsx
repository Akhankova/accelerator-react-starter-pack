import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import ModalCardDelete from './modal-cart-delete';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { makeFakeCardList } from '../../mock/mock';
import { Provider } from 'react-redux';
import { makeFakeCard } from '../../mock/mock';

const card = makeFakeCard();
const history = createMemoryHistory();
const mockStore = configureMockStore();
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
          <ModalCardDelete
            isOpen={onOpenFake}
            name={card.name}
            previewImg={card.previewImg}
            vendorCode={card.vendorCode}
            type={card.type}
            stringCount={card.stringCount}
            price={card.price}
          />
        </Router>
      </Provider>);

    expect(screen.getByText('Цена:')).toBeInTheDocument();
  });
});
