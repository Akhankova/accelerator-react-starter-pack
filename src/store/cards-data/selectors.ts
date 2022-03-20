import { NameSpace } from '../root-reducer';
import { State } from '../../types/state';
import { SmallCards, Comments } from '../../types/cards';

export const getCards = (state: State): SmallCards => state[NameSpace.DataCards].cards;
export const getSortType = (state: State): string => state[NameSpace.DataSortType].currentSortingType;
export const getSortOrder = (state: State): string => state[NameSpace.DataSortOrder].currentSortingOrder;
export const getComments = (state: State): Comments => state[NameSpace.DataSetComments].comments;
