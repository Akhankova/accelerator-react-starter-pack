import { CardsDataState } from '../../types/state';
import { setCards, setPaginationSite, setCardTotalCount, setDataLoading } from '../action';
import { createReducer } from '@reduxjs/toolkit';

export const initialState: CardsDataState= {
  cards: [],
  paginationSite: 1,
  cardsTotalCount: ' ',
  isdataLoading: true,
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
    });
});
