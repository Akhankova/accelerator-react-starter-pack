import { SortDataState } from '../../types/state';
import { setType, setOrder } from '../action';
import { createReducer } from '@reduxjs/toolkit';
import { Sort } from '../../const';

export const initialState: SortDataState= {
  currentSortingType: Sort.Price,
  currentSortingOrder: Sort.Ascending,
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
