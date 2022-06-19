import {AxiosInstance} from 'axios';
import {State} from './state';
import {ThunkAction} from 'redux-thunk';
import {Action} from 'redux';


export enum ActionType {
  SetCards = 'dataCards/setCards',
  SetCardsCart = 'dataCards/setCardsCart',
  SetCard = 'dataCards/setCard',
  SetCardLoading = 'dataCards/setCardLoading',
  SetCommentsLoading = 'dataCards/setCommentsLoading',
  SetNotFound = 'dataCards/setNotFound',
  SetType = 'dataCards/setType',
  SetOrder = 'dataCards/setOrder',
  SetComments = 'dataCards/setComments',
  SetFilterTypeOfGuitar = 'dataCards/setFilterTypeOfGuitar',
  SetFilterTypeGuitarElectric = 'dataCards/setFilterTypeGuitarElectric',
  SetFilterTypeGuitarUkulele = 'dataCards/setFilterTypeGuitarUkulele',
  SetMinPrice = 'dataCards/setMinPrice',
  SetMaxPrice = 'dataCards/setMaxPrice',
  SetStringsCount = 'dataCards/setStringsCount',
  SetPaginationSite = 'dataCards/setPaginationSite',
  SetCardTotalCount = 'dataCards/setCardTotalCount',
  SetFiltredCards = 'dataCards/setFiltredCards',
  SetDataLoading = 'dataCards/setDataLoading',
  SetCardsForSerch = 'dataCards/setCardsForSerch',
  SetDataLoadingForSerch = 'dataCards/setDataLoadingForSerch',
}

export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Action>;
