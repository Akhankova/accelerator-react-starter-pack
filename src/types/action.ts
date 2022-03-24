import {AxiosInstance} from 'axios';
import {State} from './state';
import {ThunkAction} from 'redux-thunk';
import {Action} from 'redux';


export enum ActionType {
  SetCards = 'dataCards/setCards',
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
}

export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Action>;
