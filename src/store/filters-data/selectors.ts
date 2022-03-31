import { NameSpace } from '../root-reducer';
import { State } from '../../types/state';
import { SmallCards } from '../../types/cards';

export const getFilterTypeOfGuitar = (state: State): string => state[NameSpace.DataSetFilterTypeOfGuitar].filterTypeGuitar;
export const getFilterTypeOfGuitarElectric = (state: State): string => state[NameSpace.DataFilterTypeGuitarElectric].filterTypeGuitarElectric;
export const getFilterTypeOfGuitarUkulele = (state: State): string => state[NameSpace.DataFilterTypeGuitarUkulele].filterTypeGuitarUkulele;
export const getFiltredCards = (state: State): SmallCards => state[NameSpace.DataFiltredCard].filtredCards;
export const getMinPrice = (state: State): number => state[NameSpace.DataMinPrice].minPrice;
export const getMaxPrice = (state: State): number => state[NameSpace.DataMaxPrice].maxPrice;
export const getStringsCount = (state: State): boolean [] => state[NameSpace.DataSetStringsCount].stringsCount;
