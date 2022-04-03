import { NameSpace } from '../root-reducer';
import { State } from '../../types/state';
import { SmallCards } from '../../types/cards';

export const getCards = (state: State): SmallCards => state[NameSpace.DataCards].cards;
export const getPaginationSite = (state: State): number => state[NameSpace.DataCards].paginationSite;
export const getCardTotalCount = (state: State): string => state[NameSpace.DataCards].cardsTotalCount;
export const getIsDataLoading = (state: State): boolean => state[NameSpace.DataCards].isdataLoading;


