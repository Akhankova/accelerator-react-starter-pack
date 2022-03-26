import {combineReducers} from 'redux';
import {cardsData} from './cards-data/cards-data';

export enum NameSpace {
   DataCards = 'DATA_CARDS',
   DataSortType = 'DATA_SORT_TYPE',
   DataSortOrder = 'DATA_SORT_ORDER',
   DataSetComments = 'DATA_SET_COMMENTS',
   DataSetFilterTypeOfGuitar = 'DATA_SET_FILTER_TYPE_OF_GUITAR',
   DataFilterTypeGuitarElectric = 'DATA_FILTER_TYPE_GUTAR_ELECTRIC',
   DataFilterTypeGuitarUkulele = 'DATA_FILTER_TYPE_GUTAR_UKULELE',
   DataMinPrice = 'DATA_MIN_PRICE',
   DataMaxPrice = 'DATA_MAX_PRICE',
   DataSetStringsCount = 'DATA_SET_STRINGS_COUNT',
   DataPaginationSite = 'DATA_PAGINATION_SITE',
   DataCardTotalCount = 'DATA_CARD_TOTAL_COUNT',
   DataFiltredCard = 'DATA_FILTRED_CARD',
 }

export const rootReducer = combineReducers({
  [NameSpace.DataCards]: cardsData,
  [NameSpace.DataSortType]: cardsData,
  [NameSpace.DataSortOrder]: cardsData,
  [NameSpace.DataSetComments]: cardsData,
  [NameSpace.DataSetFilterTypeOfGuitar]: cardsData,
  [NameSpace.DataFilterTypeGuitarElectric]: cardsData,
  [NameSpace.DataFilterTypeGuitarUkulele]: cardsData,
  [NameSpace.DataMinPrice]: cardsData,
  [NameSpace.DataMaxPrice]: cardsData,
  [NameSpace.DataSetStringsCount]: cardsData,
  [NameSpace.DataPaginationSite]: cardsData,
  [NameSpace.DataCardTotalCount]: cardsData,
  [NameSpace.DataFiltredCard]: cardsData,
});

export type RootState = ReturnType<typeof rootReducer>;
