import { NameSpace } from '../root-reducer';
import { State } from '../../types/state';
import { SmallCard, SmallCards } from '../../types/cards';

export const getCards = (state: State): SmallCards => state[NameSpace.DataCards].cards;
export const getPaginationSite = (state: State): number => state[NameSpace.DataCards].paginationSite;
export const getCardTotalCount = (state: State): string => state[NameSpace.DataCards].cardsTotalCount;
export const getIsDataLoading = (state: State): boolean => state[NameSpace.DataCards].isdataLoading;
export const getCardsForSerch = (state: State): SmallCards => state[NameSpace.DataCards].cardsForSerch;


export const getGuitarsNamesList = (state: State): string[] => {
  const guitarsNamesList = state[NameSpace.DataCards].cardsForSerch.map((guitar:SmallCard) => guitar.name);
  return guitarsNamesList;
};
