import {ThunkActionResult} from '../types/action';
import {setCards} from './action';
import {APIRoute} from '../types/apis';
import { SmallCard } from '../types/cards';
//import 'react-toastify/dist/ReactToastify.css';

export const loadCards = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const {data} = await api.get<SmallCard[]>(APIRoute.Cards);
      dispatch(setCards(data));
    } catch {
      // eslint-disable-next-line no-console
      console.log('');
    }
  };
