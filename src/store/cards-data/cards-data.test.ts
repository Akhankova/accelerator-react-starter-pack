import { cardsData } from './cards-data';
import { makeFakeCardList } from '../../mock/mock';
import { setCards } from '../action';

const cards = makeFakeCardList(10);

describe('Reducer: cardsData', () => {
  it('without additional parameters should return initial state', () => {
    expect(cardsData(void 0, { type: 'UNKNOWN_ACTION' })).toEqual({
      cards: [],
      paginationSite: 1,
      cardsTotalCount: ' ',
    });
  });

  it('should update cards by load cards', () => {
    const state = {
      cards: [],
      paginationSite: 1,
      cardsTotalCount: ' '};
    expect(cardsData(state, setCards(cards))).toEqual({
      cards,
      paginationSite: 1,
      cardsTotalCount: ' ',
    });
  });
});
