import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import ModalSuccessAdd from './modal-success-add';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { makeFakeCardList } from '../../mock/mock';
import { Provider } from 'react-redux';

const history = createMemoryHistory();
const mockStore = configureMockStore();
const onCloseFake = () => 'void';

const store = mockStore({
  DATA_CARDS: {
    cards: makeFakeCardList(10),
  },
});

describe('Component: ModalSuccessAdd', () => {
  it('should render ModalSuccessAdd correctly', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <ModalSuccessAdd
            onClose={onCloseFake}
          />
        </Router>
      </Provider>);

    expect(screen.getByText('Продолжить покупки')).toBeInTheDocument();
  });
});
