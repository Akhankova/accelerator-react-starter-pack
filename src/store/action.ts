import {SmallCards} from '../types/cards';
import { createAction } from '@reduxjs/toolkit';
import { ActionType } from '../types/action';

export const setCards = createAction(
  ActionType.SetCards,
  (cards: SmallCards) => ({
    payload: {cards},
  }),
);
