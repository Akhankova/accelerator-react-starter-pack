import { SmallCards } from './cards';
import { RootState } from '../store/root-reducer';

export type CardsDataState = {
  cards: SmallCards,
  paginationSite: number,
  cardsTotalCount: string,
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
