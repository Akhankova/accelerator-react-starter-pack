import {SmallCards, Comments} from '../types/cards';
import { createAction } from '@reduxjs/toolkit';
import { ActionType } from '../types/action';

export const setCards = createAction(
  ActionType.SetCards,
  (cards: SmallCards) => ({
    payload: {cards},
  }),
);

export const setType = createAction(
  ActionType.SetType,
  (type: string) => ({
    payload: {type},
  }),
);

export const setOrder = createAction(
  ActionType.SetOrder,
  (order: string) => ({
    payload: {order},
  }),
);

export const setComments = createAction(
  ActionType.SetComments,
  (comments: Comments) => ({
    payload: {comments},
  }),
);
