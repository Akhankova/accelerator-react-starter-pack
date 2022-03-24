import { NameSpace } from '../root-reducer';
import { State } from '../../types/state';
import { SmallCards, Comments } from '../../types/cards';

export const getCards = (state: State): SmallCards => state[NameSpace.DataCards].cards;
export const getSortType = (state: State): string => state[NameSpace.DataSortType].currentSortingType;
export const getSortOrder = (state: State): string => state[NameSpace.DataSortOrder].currentSortingOrder;
export const getComments = (state: State): Comments => state[NameSpace.DataSetComments].comments;
export const getFilterTypeOfGuitar = (state: State): string => state[NameSpace.DataSetFilterTypeOfGuitar].filterTypeGuitar;
export const getFilterTypeOfGuitarElectric = (state: State): string => state[NameSpace.DataFilterTypeGuitarElectric].filterTypeGuitarElectric;
export const getFilterTypeOfGuitarUkulele = (state: State): string => state[NameSpace.DataFilterTypeGuitarUkulele].filterTypeGuitarUkulele;
export const getMinPrice = (state: State): number => state[NameSpace.DataMinPrice].minPrice;
export const getMaxPrice = (state: State): number => state[NameSpace.DataMaxPrice].maxPrice;
export const getStringsCount = (state: State): [boolean, boolean, boolean, boolean] => state[NameSpace.DataSetStringsCount].stringsCount;
export const getPaginationSite = (state: State): number => state[NameSpace.DataPaginationSite].paginationSite;
export const getCardTotalCount = (state: State): string => state[NameSpace.DataCardTotalCount].cardsTotalCount;

