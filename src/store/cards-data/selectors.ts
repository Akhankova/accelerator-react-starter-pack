import { NameSpace } from '../root-reducer';
import { State } from '../../types/state';
import { Comments, SmallCard, SmallCardCart, SmallCards } from '../../types/cards';

export const getCards = (state: State): SmallCards => state[NameSpace.DataCards].cards;
export const getPromo = (state: State): { coupon: string; } => state[NameSpace.DataCards].promo;
export const getCoupon = (state: State): number => state[NameSpace.DataCards].coupon;
export const getCardsCart = (state: State): SmallCardCart[] => state[NameSpace.DataCards].cardsCart;
export const getNotFound = (state: State): number => state[NameSpace.DataCards].notFound;
export const getComments = (state: State): Comments => state[NameSpace.DataCards].comments;
export const getCommentsLoading = (state: State): boolean => state[NameSpace.DataCards].commentsLoading;
export const getCard = (state: State): SmallCardCart => state[NameSpace.DataCards].cardInfo;
export const getPaginationSite = (state: State): number => state[NameSpace.DataCards].paginationSite;
export const getCardTotalCount = (state: State): string => state[NameSpace.DataCards].cardsTotalCount;
export const getIsDataLoading = (state: State): boolean => state[NameSpace.DataCards].isdataLoading;
export const getIsCardInfoLoading = (state: State): boolean => state[NameSpace.DataCards].cardInfoLoading;
export const getCardsForSerch = (state: State): SmallCards => state[NameSpace.DataCards].cardsForSerch;
export const getIsDataLoadingForSerch = (state: State): boolean => state[NameSpace.DataCards].isdataLoadingForSerch;


export const getGuitarsNamesList = (state: State): string[] => {
  const guitarsNamesList = state[NameSpace.DataCards].cardsForSerch.map((guitar:SmallCard) => guitar.name);
  return guitarsNamesList;
};

export const getGuitarsIdList = (state: State): number[] => {
  const guitarsIdList = state[NameSpace.DataCards].cardsForSerch.map((guitar:SmallCard) => guitar.id);
  return guitarsIdList;
};
