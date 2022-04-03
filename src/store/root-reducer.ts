import {combineReducers} from 'redux';
import {cardsData} from './cards-data/cards-data';
import { filtersData } from './filters-data/filters-data';
import { sortData } from './sort-data/sort-data';

export enum NameSpace {
   DataCards = 'DATA_CARDS',
   DataSort = 'DATA_SORT',
   DataFilter = 'DATA_FILTER',
 }

export const rootReducer = combineReducers({
  [NameSpace.DataCards]: cardsData,
  [NameSpace.DataSort]: sortData,
  [NameSpace.DataFilter]: filtersData,
});

export type RootState = ReturnType<typeof rootReducer>;
