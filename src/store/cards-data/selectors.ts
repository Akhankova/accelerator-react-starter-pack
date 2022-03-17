import { NameSpace } from '../root-reducer';
import { State } from '../../types/state';
import { SmallCards } from '../../types/cards';


export const getCards = (state: State): SmallCards => state[NameSpace.DataCards].cards;

