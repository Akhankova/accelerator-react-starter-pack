import { SmallCards, Comments } from './cards';
import { RootState } from '../store/root-reducer';

export type CardsDataState = {
  cards: SmallCards,
  currentSortingType: string,
  currentSortingOrder: string,
  comments: Comments,
};

export type State = RootState;
