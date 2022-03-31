import { NameSpace } from '../root-reducer';
import { State } from '../../types/state';
import { SmallCards } from '../../types/cards';

export const getCards = (state: State): SmallCards => state[NameSpace.DataCards].cards;
export const getPaginationSite = (state: State): number => state[NameSpace.DataPaginationSite].paginationSite;
export const getCardTotalCount = (state: State): string => state[NameSpace.DataCardTotalCount].cardsTotalCount;

