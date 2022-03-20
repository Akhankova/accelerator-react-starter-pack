import {AxiosInstance} from 'axios';
import {State} from './state';
import {ThunkAction} from 'redux-thunk';
import {Action} from 'redux';


export enum ActionType {
  SetCards = 'dataCards/setCards',
  SetType = 'dataCards/setType',
  SetOrder = 'dataCards/setOrder',
  SetComments = 'dataCards/setComments',
}

export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Action>;
