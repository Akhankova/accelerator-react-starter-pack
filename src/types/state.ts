import { Comments, SmallCardCart, SmallCards } from './cards';
import { RootState } from '../store/root-reducer';

export type CardsDataState = {
  cards: SmallCards,
  cardInfo: SmallCardCart,
  cardInfoLoading: boolean,
  paginationSite: number,
  cardsTotalCount: string,
  isdataLoading: boolean,
  cardsForSerch: SmallCards,
  isdataLoadingForSerch: boolean,
  comments: Comments,
  commentsLoading: boolean,
  notFound: number,
  cardsCart: SmallCardCart[],
  coupon: number,
  promo: {'coupon': string},
};

export type FiltersDataState= {
  filterTypeGuitar: string,
  filterTypeGuitarElectric: string,
  filterTypeGuitarUkulele: string,
  filtredCards: SmallCards,
  minPrice: number,
  maxPrice: number,
  stringsCount: boolean[],
};

export type SortDataState= {
  currentSortingType: string,
  currentSortingOrder: string,
};

export type State = RootState;
