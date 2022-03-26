import { CardsDataState } from '../../types/state';
import { setCards, setType, setOrder, setComments, setFilterTypeOfGuitar, setFilterTypeGuitarElectric, setFilterTypeGuitarUkulele, setMinPrice, setMaxPrice, setStringsCount, setPaginationSite, setCardTotalCount, setFiltredCards } from '../action';
import { createReducer } from '@reduxjs/toolkit';

export const initialState: CardsDataState= {
  cards: [],
  currentSortingType: 'по цене',
  currentSortingOrder: 'По возрастанию',
  comments: [],
  filterTypeGuitar: '',
  filterTypeGuitarElectric: '',
  filterTypeGuitarUkulele: '',
  minPrice: 0,
  maxPrice: 0,
  stringsCount: [false, false, false, false],
  paginationSite: 1,
  cardsTotalCount: ' ',
  filtredCards: [],
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
    })
    .addCase(setFilterTypeOfGuitar, (state, action) => {
      state.filterTypeGuitar = action.payload.typeFilterOfGuitar;
    })
    .addCase(setFilterTypeGuitarElectric, (state, action) => {
      state.filterTypeGuitarElectric = action.payload.typeGuitarElectric;
    })
    .addCase(setFilterTypeGuitarUkulele, (state, action) => {
      state.filterTypeGuitarUkulele = action.payload.typeGuitarUkulele;
    })
    .addCase(setMinPrice, (state, action) => {
      state.minPrice = action.payload.minPrice;
    })
    .addCase(setMaxPrice, (state, action) => {
      state.maxPrice = action.payload.maxPrice;
    })
    .addCase(setStringsCount, (state, action) => {
      state.stringsCount = action.payload.stringsCount;
    })
    .addCase(setPaginationSite, (state, action) => {
      state.paginationSite = action.payload.paginationSite;
    })
    .addCase(setCardTotalCount, (state, action) => {
      state.cardsTotalCount = action.payload.cardTotalCount;
    })
    .addCase(setFiltredCards, (state, action) => {
      state.filtredCards= action.payload.filtredCards;
    });
});
