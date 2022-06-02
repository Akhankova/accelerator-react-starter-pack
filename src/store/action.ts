import {SmallCards, Comments, SmallCard} from '../types/cards';
import { createAction } from '@reduxjs/toolkit';
import { ActionType } from '../types/action';

export const setCards = createAction(
  ActionType.SetCards,
  (cards: SmallCards) => ({
    payload: {cards},
  }),
);

export const setFiltredCards = createAction(
  ActionType.SetFiltredCards,
  (filtredCards: SmallCards) => ({
    payload: {filtredCards},
  }),
);

export const setType = createAction(
  ActionType.SetType,
  (type: string) => ({
    payload: {type},
  }),
);

export const setFilterTypeOfGuitar = createAction(
  ActionType.SetFilterTypeOfGuitar,
  (typeFilterOfGuitar: string) => ({
    payload: {typeFilterOfGuitar},
  }),
);

export const setFilterTypeGuitarElectric = createAction(
  ActionType.SetFilterTypeGuitarElectric,
  (typeGuitarElectric: string) => ({
    payload: {typeGuitarElectric},
  }),
);
export const setFilterTypeGuitarUkulele = createAction(
  ActionType.SetFilterTypeGuitarUkulele,
  (typeGuitarUkulele: string) => ({
    payload: {typeGuitarUkulele},
  }),
);

export const setOrder = createAction(
  ActionType.SetOrder,
  (order: string) => ({
    payload: {order},
  }),
);

export const setComments = createAction(
  ActionType.SetComments,
  (comments: Comments) => ({
    payload: {comments},
  }),
);

export const setMinPrice = createAction(
  ActionType.SetMinPrice,
  (minPrice: number) => ({
    payload: {minPrice},
  }),
);

export const setMaxPrice = createAction(
  ActionType.SetMaxPrice,
  (maxPrice: number) => ({
    payload: {maxPrice},
  }),
);

export const setStringsCount = createAction(
  ActionType.SetStringsCount,
  (stringsCount: [boolean, boolean, boolean, boolean]) => ({
    payload: {stringsCount},
  }),
);

export const setPaginationSite = createAction(
  ActionType.SetPaginationSite,
  (paginationSite: number) => ({
    payload: {paginationSite},
  }),
);

export const setCardTotalCount = createAction(
  ActionType.SetCardTotalCount,
  (cardTotalCount: string) => ({
    payload: {cardTotalCount},
  }),
);

export const setDataLoading = createAction(
  ActionType.SetDataLoading,
  (dataLoading: boolean) => ({
    payload: {dataLoading},
  }),
);

export const setCardsForSerch = createAction(
  ActionType.SetCardsForSerch,
  (cardsForSerch: SmallCards) => ({
    payload: {cardsForSerch},
  }),
);

export const setDataLoadingForSerch = createAction(
  ActionType.SetDataLoadingForSerch,
  (isdataLoadingForSerch: boolean) => ({
    payload: {isdataLoadingForSerch},
  }),
);

export const setCard = createAction(
  ActionType.SetCard,
  (cardInfo: SmallCard) => ({
    payload: {cardInfo},
  }),
);

export const setCardLoading = createAction(
  ActionType.SetCardLoading,
  (cardLoading: boolean) => ({
    payload: {cardLoading},
  }),
);

export const setCommentsLoading = createAction(
  ActionType.SetCommentsLoading,
  (commentsLoading: boolean) => ({
    payload: {commentsLoading},
  }),
);

export const setNotFound = createAction(
  ActionType.SetNotFound,
  (notFound: number) => ({
    payload: {notFound},
  }),
);


