import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import CommentAddSuccessfully from './comment-add-successfully';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { makeFakeCardList } from '../../mock/mock';
import { Provider } from 'react-redux';
import { makeFakeCard } from '../../mock/mock';

const ID = 1;
const card = makeFakeCard();
const history = createMemoryHistory();
const mockStore = configureMockStore();
const onCloseFake = () => 'void';

const store = mockStore({
  DATA_CARDS: {
    cards: makeFakeCardList(10),
  },
});

describe('Component: CommentAddSuccessfully', () => {
  it('should render CommentAddSuccessfully correctly', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <CommentAddSuccessfully
            addedCommentModal={onCloseFake}
            card={card}
            id={ID}
          />
        </Router>
      </Provider>);

    expect(screen.getByText(/К покупкам!/)).toBeInTheDocument();
  });
});
