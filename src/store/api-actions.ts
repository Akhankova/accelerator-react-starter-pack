import {ThunkActionResult} from '../types/action';
import {setCards} from './action';
import {APIRoute} from '../types/apis';
import { SmallCard } from '../types/cards';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ERROR_TEXT } from '../const';

export const loadCards = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const {data} = await api.get<SmallCard[]>(APIRoute.Cards);
      dispatch(setCards(data));
    } catch {
      toast.info(ERROR_TEXT);
    }
  };
