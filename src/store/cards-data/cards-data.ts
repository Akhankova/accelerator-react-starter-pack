import { CardsDataState } from '../../types/state';
import { setCards, setPaginationSite, setCardTotalCount, setDataLoading, setCardsForSerch, setDataLoadingForSerch, setCard, setCardLoading, setComments, setCommentsLoading, setNotFound } from '../action';
import { createReducer } from '@reduxjs/toolkit';
import { SmallCard } from '../../types/cards';

export const initialState: CardsDataState= {
  cards: [],
  cardInfo: {} as SmallCard || null,
  cardInfoLoading: false,
  paginationSite: 1,
  cardsTotalCount: ' ',
  isdataLoading: true,
  cardsForSerch: [],
  isdataLoadingForSerch: false,
  comments: [],
  commentsLoading: false,
  notFound: 0,
};

export const cardsData = createReducer(initialState, (builder) => {
  builder
    .addCase(setCards, (state, action) => {
      state.cards = action.payload.cards.length ? action.payload.cards : state.cards;
    })
    .addCase(setPaginationSite, (state, action) => {
      state.paginationSite = action.payload.paginationSite;
    })
    .addCase(setCardTotalCount, (state, action) => {
      state.cardsTotalCount = action.payload.cardTotalCount;
    })
    .addCase(setDataLoading, (state, action) => {
      state.isdataLoading = action.payload.dataLoading;
    })
    .addCase(setCardsForSerch, (state, action) => {
      state.cardsForSerch = action.payload.cardsForSerch;
    })
    .addCase(setDataLoadingForSerch, (state, action) => {
      state.isdataLoadingForSerch = action.payload.isdataLoadingForSerch;
    })
    .addCase(setCard, (state, action) => {
      state.cardInfo = action.payload.cardInfo;
    })
    .addCase(setCardLoading, (state, action) => {
      state.cardInfoLoading = action.payload.cardLoading;
    })
    .addCase(setComments, (state, action) => {
      state.comments = action.payload.comments;
    })
    .addCase(setCommentsLoading, (state, action) => {
      state.commentsLoading = action.payload.commentsLoading;
    })
    .addCase(setNotFound, (state, action) => {
      state.notFound = action.payload.notFound;
    });
});
