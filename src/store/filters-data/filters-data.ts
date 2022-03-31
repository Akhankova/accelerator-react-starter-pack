import { FiltersDataState } from '../../types/state';
import { setFilterTypeOfGuitar, setFilterTypeGuitarElectric, setFilterTypeGuitarUkulele, setFiltredCards, setMinPrice, setMaxPrice, setStringsCount } from '../action';
import { createReducer } from '@reduxjs/toolkit';

export const initialState: FiltersDataState= {
  filterTypeGuitar: '',
  filterTypeGuitarElectric: '',
  filterTypeGuitarUkulele: '',
  filtredCards: [],
  minPrice: 0,
  maxPrice: 0,
  stringsCount: [false, false, false, false],
};

export const filtersData = createReducer(initialState, (builder) => {
  builder
    .addCase(setFilterTypeOfGuitar, (state, action) => {
      state.filterTypeGuitar = action.payload.typeFilterOfGuitar;
    })
    .addCase(setFilterTypeGuitarElectric, (state, action) => {
      state.filterTypeGuitarElectric = action.payload.typeGuitarElectric;
    })
    .addCase(setFilterTypeGuitarUkulele, (state, action) => {
      state.filterTypeGuitarUkulele = action.payload.typeGuitarUkulele;
    })
    .addCase(setFiltredCards, (state, action) => {
      state.filtredCards= action.payload.filtredCards;
    })
    .addCase(setMinPrice, (state, action) => {
      state.minPrice = action.payload.minPrice;
    })
    .addCase(setMaxPrice, (state, action) => {
      state.maxPrice = action.payload.maxPrice;
    })
    .addCase(setStringsCount, (state, action) => {
      state.stringsCount = action.payload.stringsCount;
    });
});
