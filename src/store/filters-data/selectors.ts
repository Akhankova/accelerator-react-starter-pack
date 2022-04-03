import { NameSpace } from '../root-reducer';
import { State } from '../../types/state';
import { SmallCard, SmallCards } from '../../types/cards';

export const getFilterTypeOfGuitar = (state: State): string => state[NameSpace.DataFilter].filterTypeGuitar;
export const getFilterTypeOfGuitarElectric = (state: State): string => state[NameSpace.DataFilter].filterTypeGuitarElectric;
export const getFilterTypeOfGuitarUkulele = (state: State): string => state[NameSpace.DataFilter].filterTypeGuitarUkulele;
export const getFiltredCards = (state: State): SmallCards => state[NameSpace.DataFilter].filtredCards;
export const getStringsCount = (state: State): boolean [] => state[NameSpace.DataFilter].stringsCount;
export const getMinPrice = (state: State): number => state[NameSpace.DataFilter].minPrice;
export const getMaxPrice = (state: State): number => state[NameSpace.DataFilter].maxPrice;

export const getGuitarMinPrice = (state: State): number => {
  if (state[NameSpace.DataFilter].filtredCards.length === 0) {
    return 1700;
  }
  const prices = state[NameSpace.DataFilter].filtredCards.map((item) => item.price);
  const minPrice = Math.min(...prices);
  return minPrice;
};

export const getGuitarMaxPrice = (state: State): number => {
  if (state[NameSpace.DataFilter].filtredCards.length === 0) {
    return 35000;
  }
  const prices = state[NameSpace.DataFilter].filtredCards.map((item) => item.price);
  const maxPrice = Math.max(...prices);
  return maxPrice;
};

export const getGuitarsNamesList = (state: State): string[] => {
  const guitarsNamesList = state[NameSpace.DataFilter].filtredCards.map((guitar:SmallCard) => guitar.name);
  return guitarsNamesList;
};

