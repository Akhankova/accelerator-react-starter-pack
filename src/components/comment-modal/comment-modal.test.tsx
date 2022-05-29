import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import CommentModal from './comment-modal';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { makeFakeCardList } from '../../mock/mock';
import { Provider } from 'react-redux';
import { makeFakeCard } from '../../mock/mock';

const card = makeFakeCard();
const history = createMemoryHistory();
const mockStore = configureMockStore();
const onCloseFake = () => 'void';

const store = mockStore({
  DATA_CARDS: {
    cards: makeFakeCardList(10),
  },
});

describe('Component: CommentModal', () => {
  it('should render CommentModal correctly', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <CommentModal
            addedCommentModal={onCloseFake}
            onClose={onCloseFake}
            card={card}
          />
        </Router>
      </Provider>);

    expect(screen.getByText('Достоинства')).toBeInTheDocument();
  });
});
