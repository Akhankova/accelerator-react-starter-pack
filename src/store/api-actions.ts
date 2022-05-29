import {ThunkActionResult} from '../types/action';
import {setCards, setCardsForSerch, setCardTotalCount, setDataLoading, setDataLoadingForSerch, setFiltredCards} from './action';
import {APIRoute} from '../types/apis';
import { SmallCard } from '../types/cards';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ERROR_TEXT, GuitarType, Interval, MIN_VALUE, PaginationSite, Sort, StringCount, StringIndex } from '../const';

export const loadCards = (cardsStateSortType:string, cardsStateSortOrder:string, filterTypeOfGuitar:string, filterTypeOfGuitarElectric:string, filterTypeOfGuitarUkulele:string, stringsCount:boolean[], minPrice:number, maxPrice:number, paginationSiteState:number): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const response = await api.get<SmallCard[]>(`${APIRoute.Cards}&_sort=${cardsStateSortType === `${Sort.Favorite}` ? `${Sort.Rating}` : `${Sort.PriceSort}`}&_order=${cardsStateSortOrder === `${Sort.Descending}` ? `${Sort.Desc}` : `${Sort.Asc}`}${filterTypeOfGuitar !== '' ? `&type=${GuitarType.Acoustic}`: ''}${filterTypeOfGuitarElectric !== '' ? `&type=${GuitarType.Electric}`: ''}${filterTypeOfGuitarUkulele !== '' ? `&type=${GuitarType.Ukulele}`: ''}${minPrice !== MIN_VALUE ? `&${Sort.PriceSort}_gte=${minPrice}`: ''}${maxPrice !== MIN_VALUE ? `&${Sort.PriceSort}_lte=${maxPrice}`: ''}${stringsCount[StringIndex.FOUR_STRINGS_INDEX] ? `&stringCount=${StringCount.FOUR_STRINGS}`: ''}${stringsCount[StringIndex.SIX_STRINGS_INDEX] ? `&stringCount=${StringCount.SIX_STRINGS}` : ''}${stringsCount[StringIndex.SEVEN_STRINGS_INDEX] ? `&stringCount=${StringCount.SEVEN_STRINGS}` : ''}${stringsCount[StringIndex.TWELVE_STRINGS_INDEX] ? `&stringCount=${StringCount.TWELVE_STRINGS}` : ''}${Number(paginationSiteState) === PaginationSite.FIRST ? `&_start=${Interval.First}` : ''}${Number(paginationSiteState) === PaginationSite.SECOND ? `&_start=${Interval.Second}` : ''}${Number(paginationSiteState) === PaginationSite.THIRD ? `&_start=${Interval.Third}` : ''}`);
      dispatch(setCardTotalCount(response.headers['x-total-count']));
      dispatch(setCards(response.data));
      dispatch(setDataLoading(true));
    } catch {
      toast.info(ERROR_TEXT);
    }
  };

export const loadCardsWithoutPagination = (cardsStateSortType:string, cardsStateSortOrder:string, filterTypeOfGuitar:string, filterTypeOfGuitarElectric:string, filterTypeOfGuitarUkulele:string, stringsCount:boolean[]): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const response = await api.get<SmallCard[]>(`${APIRoute.Cards}&_sort=${cardsStateSortType === `${Sort.Favorite}` ? `${Sort.Rating}` : `${Sort.PriceSort}`}&_order=${cardsStateSortOrder === `${Sort.Descending}` ? `${Sort.Desc}` : `${Sort.Asc}`}${filterTypeOfGuitar !== '' ? `&type=${GuitarType.Acoustic}` : ''}${filterTypeOfGuitarElectric !== '' ? `&type=${GuitarType.Electric}` : ''}${filterTypeOfGuitarUkulele !== '' ? `&type=${GuitarType.Ukulele}` : ''}${stringsCount[StringIndex.FOUR_STRINGS_INDEX] ? `&stringCount=${StringCount.FOUR_STRINGS}` : ''}${stringsCount[StringIndex.SIX_STRINGS_INDEX] ? `&stringCount=${StringCount.SIX_STRINGS}` : ''}${stringsCount[StringIndex.SEVEN_STRINGS_INDEX] ? `&stringCount=${StringCount.SEVEN_STRINGS}` : ''}${stringsCount[StringIndex.TWELVE_STRINGS_INDEX] ? `&stringCount=${StringCount.TWELVE_STRINGS}` : ''}`);
      dispatch(setFiltredCards(response.data));
    } catch {
      toast.info(ERROR_TEXT);
    }
  };

export const loadCardsSerch = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const response = await api.get<SmallCard[]>(`${APIRoute.Cards}&_sort=${Sort.PriceSort}&_order=${Sort.Asc}`);
      dispatch(setCardsForSerch(response.data));
      dispatch(setDataLoadingForSerch(true));
    } catch {
      toast.info(ERROR_TEXT);
    }
  };


