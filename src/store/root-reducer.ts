import {combineReducers} from 'redux';
import {cardsData} from './cards-data/cards-data';

export enum NameSpace {
   DataCards = 'DATA_CARDS',
 }

export const rootReducer = combineReducers({
  [NameSpace.DataCards]: cardsData,
});

export type RootState = ReturnType<typeof rootReducer>;
