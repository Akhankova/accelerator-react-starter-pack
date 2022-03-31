import { NameSpace } from '../root-reducer';
import { State } from '../../types/state';

export const getSortType = (state: State): string => state[NameSpace.DataSortType].currentSortingType;
export const getSortOrder = (state: State): string => state[NameSpace.DataSortOrder].currentSortingOrder;
