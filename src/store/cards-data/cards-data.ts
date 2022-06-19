import { CardsDataState } from '../../types/state';
import { setCards, setPaginationSite, setCardTotalCount, setDataLoading, setCardsForSerch, setDataLoadingForSerch, setCard, setCardLoading, setComments, setCommentsLoading, setNotFound, setCardsCart } from '../action';
import { createReducer } from '@reduxjs/toolkit';
import { SmallCard } from '../../types/cards';
import { NOT_FOUND_STARUS, PAGE_NUMBER_FIRST } from '../../const';

export const initialState: CardsDataState= {
  cards: [],
  cardInfo: {} as SmallCard || null,
  cardInfoLoading: false,
  paginationSite: PAGE_NUMBER_FIRST,
  cardsTotalCount: ' ',
  isdataLoading: false,
  cardsForSerch: [],
  isdataLoadingForSerch: false,
  comments: [],
  commentsLoading: false,
  notFound: NOT_FOUND_STARUS,
  cardsCart: [],
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
    })
    .addCase(setCardsCart, (state, action) => {
      state.cardsCart = action.payload.cardsCart;
    });
});
