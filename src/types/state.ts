import { SmallCards } from './cards';
import { RootState } from '../store/root-reducer';

export type CardsDataState = {
  cards: SmallCards,
};

export type State = RootState;
