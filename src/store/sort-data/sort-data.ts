import { SortDataState } from '../../types/state';
import { setType, setOrder } from '../action';
import { createReducer } from '@reduxjs/toolkit';

export const initialState: SortDataState= {
  currentSortingType: 'по цене',
  currentSortingOrder: 'По возрастанию',
};

export const sortData = createReducer(initialState, (builder) => {
  builder
    .addCase(setType, (state, action) => {
      state.currentSortingType = action.payload.type;
    })
    .addCase(setOrder, (state, action) => {
      state.currentSortingOrder = action.payload.order;
    });
});
