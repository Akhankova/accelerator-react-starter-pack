import { cardsData } from './cards-data';
import { makeFakeCardList } from '../../mock/mock';
import { setCard, setCards, setCardsForSerch, setCardTotalCount, setDataLoading, setDataLoadingForSerch, setNotFound, setPaginationSite } from '../action';
import { SmallCard } from '../../types/cards';

const cards = makeFakeCardList(10);
const cardsForSerch = makeFakeCardList(10);
const state = {
  cards: [],
  cardInfo: {} as SmallCard || null,
  cardsForSerch: [],
  paginationSite: 1,
  cardsTotalCount: ' ',
  isdataLoading: false,
  isdataLoadingForSerch: false,
  cardInfoLoading: false,
  comments: [],
  commentsLoading: false,
  notFound: 0,
};

describe('Reducer: cardsData', () => {
  it('without additional parameters should return initial state', () => {
    expect(cardsData(void 0, { type: 'UNKNOWN_ACTION' })).toEqual({
      cards: [],
      cardInfo: {} as SmallCard || null,
      paginationSite: 1,
      cardsTotalCount: ' ',
      isdataLoading: false,
      cardsForSerch: [],
      isdataLoadingForSerch: false,
      cardInfoLoading: false,
      comments: [],
      commentsLoading: false,
      notFound: 0,
    });
  });

  it('should update cards by load cards', () => {
    expect(cardsData(state, setCards(cards))).toEqual({
      cards,
      cardInfo: {} as SmallCard || null,
      cardsForSerch: [],
      paginationSite: 1,
      cardsTotalCount: ' ',
      isdataLoading: false,
      isdataLoadingForSerch: false,
      cardInfoLoading: false,
      comments: [],
      commentsLoading: false,
      notFound: 0,
    });
  });

  it('should update cardsForSerch by load cardsForSerch', () => {
    expect(cardsData(state, setCardsForSerch(cardsForSerch))).toEqual({
      cards: [],
      cardInfo: {} as SmallCard || null,
      cardsForSerch,
      paginationSite: 1,
      cardsTotalCount: ' ',
      isdataLoading: false,
      isdataLoadingForSerch: false,
      cardInfoLoading: false,
      comments: [],
      commentsLoading: false,
      notFound: 0,
    });
  });

  it('should update paginationSite by load paginationSite', () => {
    const paginationSite = 1;
    expect(cardsData(state, setPaginationSite(paginationSite))).toEqual({
      cards: [],
      cardInfo: {} as SmallCard || null,
      cardsForSerch: [],
      paginationSite,
      cardsTotalCount: ' ',
      isdataLoading: false,
      isdataLoadingForSerch: false,
      cardInfoLoading: false,
      comments: [],
      commentsLoading: false,
      notFound: 0,
    });
  });

  it('should update cardsTotalCount by load cardsTotalCount', () => {
    const cardsTotalCount = ' ';
    expect(cardsData(state, setCardTotalCount(cardsTotalCount))).toEqual({
      cards: [],
      cardInfo: {} as SmallCard || null,
      cardsForSerch: [],
      paginationSite: 1,
      cardsTotalCount,
      isdataLoading: false,
      isdataLoadingForSerch: false,
      cardInfoLoading: false,
      comments: [],
      commentsLoading: false,
      notFound: 0,
    });
  });

  it('should update isdataLoading by load isdataLoading', () => {
    const isdataLoading = false;
    expect(cardsData(state, setDataLoading(isdataLoading))).toEqual({
      cards: [],
      cardInfo: {} as SmallCard || null,
      cardsForSerch: [],
      paginationSite: 1,
      cardsTotalCount: ' ',
      isdataLoading,
      isdataLoadingForSerch: false,
      cardInfoLoading: false,
      comments: [],
      commentsLoading: false,
      notFound: 0,
    });
  });

  it('should update isdataLoadingForSerch by load isdataLoadingForSerch', () => {
    const isdataLoadingForSerch = false;
    expect(cardsData(state, setDataLoadingForSerch(isdataLoadingForSerch))).toEqual({
      cards: [],
      cardInfo: {} as SmallCard || null,
      cardsForSerch: [],
      paginationSite: 1,
      cardsTotalCount: ' ',
      isdataLoading: false,
      isdataLoadingForSerch,
      cardInfoLoading: false,
      comments: [],
      commentsLoading: false,
      notFound: 0,
    });
  });

  it('should update card by load card', () => {

    const cardInfo = {
      id: 9,
      name: 'Виолана 300',
      previewImg: 'img/guitar-1.jpg',
      price: 1700,
      rating: 3,
      description: ' ',
      stringCount: 7,
      type: 'acoustic',
      vendorCode: 'VO154751',
      comments: [],
      cardInfoLoading: false,
      notFound: 0,
    };

    expect(cardsData(state, setCard(cardInfo))).toEqual({
      cards: [],
      cardInfo,
      cardsForSerch: [],
      paginationSite: 1,
      cardsTotalCount: ' ',
      isdataLoading: false,
      isdataLoadingForSerch: false,
      cardInfoLoading: false,
      comments: [],
      commentsLoading: false,
      notFound: 0,
    });
  });

  it('should update cardInfoLoading by load cardInfoLoading', () => {
    const cardInfoLoading = false;
    expect(cardsData(state, setDataLoadingForSerch(cardInfoLoading))).toEqual({
      cards: [],
      cardInfo: {} as SmallCard || null,
      cardsForSerch: [],
      paginationSite: 1,
      cardsTotalCount: ' ',
      isdataLoading: false,
      isdataLoadingForSerch: false,
      cardInfoLoading,
      comments: [],
      commentsLoading: false,
      notFound: 0,
    });
  });

  it('should update notFound by load notFound', () => {
    const notFound = 0;
    expect(cardsData(state, setNotFound(notFound))).toEqual({
      cards: [],
      cardInfo: {} as SmallCard || null,
      cardsForSerch: [],
      paginationSite: 1,
      cardsTotalCount: ' ',
      isdataLoading: false,
      isdataLoadingForSerch: false,
      cardInfoLoading: false,
      comments: [],
      commentsLoading: false,
      notFound,
    });
  });

});
