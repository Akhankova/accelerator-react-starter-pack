import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import ProductCard from './product-card';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { getPaginationSite, makeFakeCard, makeFakeCardList } from '../../mock/mock';
import { Provider } from 'react-redux';

const history = createMemoryHistory();
const mockStore = configureMockStore();
const card = makeFakeCard();

const store = mockStore({
  DATA_CARDS: {
    cards: makeFakeCardList(10),
    cardsTotalCount: 25,
    paginationSite: getPaginationSite(),
  },
});


describe('Component: ProductCard', () => {
  it('should render ProductCard component', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <ProductCard
            key={card.id}
            name={card.name}
            rating={card.rating}
            previewImg={card.previewImg}
            price={card.price}
            id={card.id}
            comments={card.comments}
            vendorCode= {card.vendorCode}
            type={card.type}
            stringCount={card.stringCount}
          />
        </Router>
      </Provider>);

    expect(screen.getByText('Цена:')).toBeInTheDocument();
  });
});
