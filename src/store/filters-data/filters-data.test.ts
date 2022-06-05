import { filtersData } from './filters-data';
import { makeFakeCardList } from '../../mock/mock';
import { setFilterTypeGuitarElectric, setFilterTypeGuitarUkulele, setFilterTypeOfGuitar, setFiltredCards, setMaxPrice, setMinPrice } from '../action';
import { PriceGuitar } from '../../const';

const filtredCards = makeFakeCardList(10);
const state = {
  filterTypeGuitar: '',
  filterTypeGuitarElectric: '',
  filterTypeGuitarUkulele: '',
  filtredCards:  [],
  minPrice: PriceGuitar.MinPrice,
  maxPrice: PriceGuitar.MaxPrice,
  stringsCount: [false, false, false, false],
};

describe('Reducer: filtersData', () => {
  it('without additional parameters should return initial state', () => {
    expect(filtersData(void 0, { type: 'UNKNOWN_ACTION' })).toEqual({
      filterTypeGuitar: '',
      filterTypeGuitarElectric: '',
      filterTypeGuitarUkulele: '',
      filtredCards: [],
      minPrice: PriceGuitar.MinPrice,
      maxPrice: PriceGuitar.MaxPrice,
      stringsCount: [false, false, false, false],
    });
  });

  it('should update filtredCards by load filtredCards', () => {
    expect(filtersData(state, setFiltredCards(filtredCards))).toEqual({
      filterTypeGuitar: '',
      filterTypeGuitarElectric: '',
      filterTypeGuitarUkulele: '',
      filtredCards,
      minPrice: PriceGuitar.MinPrice,
      maxPrice: PriceGuitar.MaxPrice,
      stringsCount: [false, false, false, false],
    });
  });


  it('should update filterTypeGuitar by load filterTypeGuitar', () => {
    const filterTypeGuitar = 'acoustic';
    expect(filtersData(state, setFilterTypeOfGuitar(filterTypeGuitar))).toEqual({
      filterTypeGuitar,
      filterTypeGuitarElectric: '',
      filterTypeGuitarUkulele: '',
      filtredCards: [],
      minPrice: PriceGuitar.MinPrice,
      maxPrice: PriceGuitar.MaxPrice,
      stringsCount: [false, false, false, false],
    });
  });

  it('should update filterTypeGuitarElectric by load filterTypeGuitarElectric', () => {
    const filterTypeGuitarElectric = 'electric';
    expect(filtersData(state, setFilterTypeGuitarElectric(filterTypeGuitarElectric))).toEqual({
      filterTypeGuitar: '',
      filterTypeGuitarElectric,
      filterTypeGuitarUkulele: '',
      filtredCards: [],
      minPrice: PriceGuitar.MinPrice,
      maxPrice: PriceGuitar.MaxPrice,
      stringsCount: [false, false, false, false],
    });
  });

  it('should update filterTypeGuitarUkulele by load filterTypeGuitarUkulele', () => {
    const filterTypeGuitarUkulele = 'ukulele';
    expect(filtersData(state, setFilterTypeGuitarUkulele(filterTypeGuitarUkulele))).toEqual({
      filterTypeGuitar: '',
      filterTypeGuitarElectric: '',
      filterTypeGuitarUkulele,
      filtredCards: [],
      minPrice: PriceGuitar.MinPrice,
      maxPrice: PriceGuitar.MaxPrice,
      stringsCount: [false, false, false, false],
    });
  });

  it('should update minPrice by load cards', () => {
    const minPrice = PriceGuitar.MinPrice;
    expect(filtersData(state, setMinPrice(minPrice))).toEqual({
      filterTypeGuitar: '',
      filterTypeGuitarElectric: '',
      filterTypeGuitarUkulele: '',
      filtredCards: [],
      minPrice,
      maxPrice: PriceGuitar.MaxPrice,
      stringsCount: [false, false, false, false],
    });
  });

  it('should update maxPrice by load cards', () => {
    const maxPrice = PriceGuitar.MaxPrice;
    expect(filtersData(state, setMaxPrice(maxPrice))).toEqual({
      filterTypeGuitar: '',
      filterTypeGuitarElectric: '',
      filterTypeGuitarUkulele: '',
      filtredCards: [],
      minPrice: PriceGuitar.MinPrice,
      maxPrice,
      stringsCount: [false, false, false, false],
    });
  });
});
