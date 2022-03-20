import {combineReducers} from 'redux';
import {cardsData} from './cards-data/cards-data';

export enum NameSpace {
   DataCards = 'DATA_CARDS',
   DataSortType = 'DATA_SORT_TYPE',
   DataSortOrder = 'DATA_SORT_ORDER',
   DataSetComments = 'DATA_SET_COMMENTS',
 }

export const rootReducer = combineReducers({
  [NameSpace.DataCards]: cardsData,
  [NameSpace.DataSortType]: cardsData,
  [NameSpace.DataSortOrder]: cardsData,
  [NameSpace.DataSetComments]: cardsData,
});

export type RootState = ReturnType<typeof rootReducer>;
