import { CardsDataState } from '../../types/state';
import { setCards, setType, setOrder, setComments } from '../action';
import { createReducer } from '@reduxjs/toolkit';

export const initialState: CardsDataState= {
  cards: [],
  currentSortingType: 'по цене',
  currentSortingOrder: 'По возрастанию',
  comments: [],
};

export const cardsData = createReducer(initialState, (builder) => {
  builder
    .addCase(setCards, (state, action) => {
      state.cards = action.payload.cards.length ? action.payload.cards : state.cards;
    })
    .addCase(setType, (state, action) => {
      state.currentSortingType = action.payload.type;
    })
    .addCase(setOrder, (state, action) => {
      state.currentSortingOrder = action.payload.order;
    })
    .addCase(setComments, (state, action) => {
      state.comments = action.payload.comments;
    });
});
