import { sortData } from './sort-data';
import { setOrder, setType } from '../action';


describe('Reducer: sortData', () => {
  it('without additional parameters should return initial state', () => {
    expect(sortData(void 0, { type: 'UNKNOWN_ACTION' })).toEqual({
      currentSortingType: 'по цене',
      currentSortingOrder: 'По возрастанию',
    });
  });

  it('should update currentSortingOrder by load cards', () => {
    const currentSortingOrder = 'По возрастанию';
    const state = {
      currentSortingType: 'по цене',
      currentSortingOrder: 'По возрастанию'};
    expect(sortData(state, setOrder(currentSortingOrder))).toEqual({
      currentSortingType: 'по цене',
      currentSortingOrder,
    });
  });

  it('should update currentSortingType by load cards', () => {
    const currentSortingType = 'по цене';
    const state = {
      currentSortingType: 'по цене',
      currentSortingOrder: 'По возрастанию'};
    expect(sortData(state, setType(currentSortingType))).toEqual({
      currentSortingType,
      currentSortingOrder: 'По возрастанию',
    });
  });
});
