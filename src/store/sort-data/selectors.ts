import { NameSpace } from '../root-reducer';
import { State } from '../../types/state';

export const getSortType = (state: State): string => state[NameSpace.DataSort].currentSortingType;
export const getSortOrder = (state: State): string => state[NameSpace.DataSort].currentSortingOrder;
