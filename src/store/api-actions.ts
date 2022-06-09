import {ThunkActionResult} from '../types/action';
import {setCard, setCardLoading, setCards, setCardsForSerch, setCardTotalCount, setComments, setCommentsLoading, setDataLoading, setDataLoadingForSerch, setFiltredCards, setNotFound} from './action';
import {APIRoute} from '../types/apis';
import { Comments, CommentServer, SmallCard } from '../types/cards';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BASE_URL, ERROR_TEXT, ERROR_TEXT_COMMENT, GuitarType, Interval, MIN_VALUE, NOT_FOUND_STARUS, PaginationSite, Sort, StringCount, StringIndex } from '../const';

const ERR_STATUS = 404;

export const loadCards = (cardsStateSortType:string, cardsStateSortOrder:string, filterTypeOfGuitar:string, filterTypeOfGuitarElectric:string, filterTypeOfGuitarUkulele:string, stringsCount:boolean[], minPrice:number, maxPrice:number, paginationSiteState:number): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const response = await api.get<SmallCard[]>(`${APIRoute.Cards}&_sort=${cardsStateSortType === `${Sort.Favorite}` ? `${Sort.Rating}` : `${Sort.PriceSort}`}&_order=${cardsStateSortOrder === `${Sort.Descending}` ? `${Sort.Desc}` : `${Sort.Asc}`}${filterTypeOfGuitar !== '' ? `&type=${GuitarType.Acoustic}`: ''}${filterTypeOfGuitarElectric !== '' ? `&type=${GuitarType.Electric}`: ''}${filterTypeOfGuitarUkulele !== '' ? `&type=${GuitarType.Ukulele}`: ''}${minPrice !== MIN_VALUE ? `&${Sort.PriceSort}_gte=${minPrice}`: ''}${maxPrice !== MIN_VALUE ? `&${Sort.PriceSort}_lte=${maxPrice}`: ''}${stringsCount[StringIndex.FourStringsIndex] ? `&stringCount=${StringCount.FourStrings}`: ''}${stringsCount[StringIndex.SixStringsIndex] ? `&stringCount=${StringCount.SixStrings}` : ''}${stringsCount[StringIndex.SevenStringsIndex] ? `&stringCount=${StringCount.SevenStrings
      }` : ''}${stringsCount[StringIndex.TwelveStringsIndex] ? `&stringCount=${StringCount.TwelveStrings}` : ''}${Number(paginationSiteState) === PaginationSite.First ? `&_start=${Interval.First}` : ''}${Number(paginationSiteState) === PaginationSite.Second ? `&_start=${Interval.Second}` : ''}${Number(paginationSiteState) === PaginationSite.Third ? `&_start=${Interval.Third}` : ''}`);
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
      const response = await api.get<SmallCard[]>(`${APIRoute.Cards}&_sort=${cardsStateSortType === `${Sort.Favorite}` ? `${Sort.Rating}` : `${Sort.PriceSort}`}&_order=${cardsStateSortOrder === `${Sort.Descending}` ? `${Sort.Desc}` : `${Sort.Asc}`}${filterTypeOfGuitar !== '' ? `&type=${GuitarType.Acoustic}` : ''}${filterTypeOfGuitarElectric !== '' ? `&type=${GuitarType.Electric}` : ''}${filterTypeOfGuitarUkulele !== '' ? `&type=${GuitarType.Ukulele}` : ''}${stringsCount[StringIndex.FourStringsIndex] ? `&stringCount=${StringCount.FourStrings}` : ''}${stringsCount[StringIndex.SixStringsIndex] ? `&stringCount=${StringCount.SixStrings}` : ''}${stringsCount[StringIndex.SevenStringsIndex] ? `&stringCount=${StringCount.SevenStrings}` : ''}${stringsCount[StringIndex.TwelveStringsIndex] ? `&stringCount=${StringCount.TwelveStrings}` : ''}`);
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

export const loadCardInfo = (cardId:string | undefined): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const response = await api.get<SmallCard>(`guitars/${cardId}`);
      dispatch(setCard(response.data));
      dispatch(setCardLoading(true));
      dispatch(setNotFound(NOT_FOUND_STARUS));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch(err:any) {
      if (err.response?.status === ERR_STATUS)
      {dispatch(setNotFound(ERR_STATUS));}
      else{toast.info(ERROR_TEXT);}
    }
  };

export const loadComments = (cardId:string | undefined): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const response = await api.get<Comments>(`guitars/${cardId}/comments`);
      const commentsNew = response.data.sort((d1, d2) => new Date(d2.createAt).getTime() - new Date(d1.createAt).getTime());
      dispatch(setComments(commentsNew));
      dispatch(setCommentsLoading(true));
    } catch {
      toast.info(ERROR_TEXT);
    }
  };

export const postComment = (comment: CommentServer, onClose: ()=> void, addedCommentModal: (arg0: boolean) => void): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      await api.post<Comment[]>(`${BASE_URL}comments`, comment);
      onClose();
      addedCommentModal(true);
    } catch {
      toast.info(ERROR_TEXT_COMMENT);
    }
  };

