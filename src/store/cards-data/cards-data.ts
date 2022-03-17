import { CardsDataState } from '../../types/state';
import { setCards } from '../action';
import { createReducer } from '@reduxjs/toolkit';

export const initialState: CardsDataState= {
  cards: [],
};

export const cardsData = createReducer(initialState, (builder) => {
  builder
    .addCase(setCards, (state, action) => {
      state.cards = action.payload.cards.length ? action.payload.cards : state.cards;
    });
});
