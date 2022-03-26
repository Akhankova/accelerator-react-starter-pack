import { SmallCards, Comments } from './cards';
import { RootState } from '../store/root-reducer';

export type CardsDataState = {
  cards: SmallCards,
  currentSortingType: string,
  currentSortingOrder: string,
  comments: Comments,
  filterTypeGuitar: string,
  filterTypeGuitarElectric: string,
  filterTypeGuitarUkulele: string,
  minPrice: number,
  maxPrice: number,
  stringsCount: [boolean, boolean, boolean, boolean],
  paginationSite: number,
  cardsTotalCount: string,
  filtredCards: SmallCards,
};

export type State = RootState;
