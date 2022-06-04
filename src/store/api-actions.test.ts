import {Action} from 'redux';
import thunk, {ThunkDispatch} from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createAPI} from '../services/api';
import {loadCardInfo, loadCardsSerch, loadComments} from './api-actions';
import {State} from '../types/state';
import { makeFakeCard, makeFakeCardList, makeFakeCommentList } from '../mock/mock';
import { setCard, setCardsForSerch, setComments, setCommentsLoading, setDataLoadingForSerch} from './action';
import { Sort } from '../const';

describe('Async actions', () => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
      State,
      Action,
      ThunkDispatch<State, typeof api, Action>
    >(middlewares);

  it('should dispatch loadCardInfo when GET /guitars/:id', async () => {
    const cardInfo = makeFakeCard();
    mockAPI
      .onGet('guitars/3')
      .reply(200, cardInfo);

    const store = mockStore();
    await store.dispatch(loadCardInfo('3'));

    const actions = store.getActions().map(({type}) => type);
    expect(actions).toContain(setCard.toString());
  });


  it('should dispatch Load_Current_Guitar_Comments when GET /guitars/:guitarId/comments', async () => {
    const mockGuitar = makeFakeCard();
    const currentGuitarComments = makeFakeCommentList(3);

    mockAPI
      .onGet(`guitars/${mockGuitar.id}/comments`)
      .reply(200, currentGuitarComments);

    const store = mockStore();
    await store.dispatch(loadComments(String(mockGuitar.id)));

    expect(store.getActions()).toEqual([
      setComments(currentGuitarComments),
      setCommentsLoading(true),
    ]);
  });

  it('should dispatch loadCardsSerch when GET /guitars?_embed=comments&_sort=price&_order=asc', async () => {
    const mockGuitars = makeFakeCardList(5);

    mockAPI
      .onGet(`/guitars?_embed=comments&_sort=${Sort.PriceSort}&_order=${Sort.Asc}`)
      .reply(200, mockGuitars);

    const store = mockStore();
    await store.dispatch(loadCardsSerch());

    expect(store.getActions()).toEqual([
      setCardsForSerch(mockGuitars),
      setDataLoadingForSerch(true),
    ]);
  });
  //(`guitars?_embed=comments&_sort=${Sort.PriceSort}&_order=${Sort.Desc}&type=${GuitarType.Acoustic}&type=${GuitarType.Ukulele}&stringCount=${StringCount.FourStrings}`)
  /*it('should dispatch loadCardsWithoutPagination when GET /guitars?_embed=comments&_sort=rating&_order=desc&type=acoustic&type=ukulele&stringCount=6', async () => {
    const mockGuitars = makeFakeCardList(5);
    const cardsStateSortType = Sort.Favorite;
    const cardsStateSortOrder = Sort.Descending;
    const filterTypeOfGuitar = '';
    const filterTypeOfGuitarElectric = '';
    const filterTypeOfGuitarUkulele = '';
    const stringsCount = [false, true, false, true];

    mockAPI
      .onGet(`/guitars?_embed=comments&_sort=${cardsStateSortType === `${Sort.Favorite}` ? `${Sort.Rating}` : `${Sort.PriceSort}`}&_order=${cardsStateSortOrder === `${Sort.Descending}` ? `${Sort.Desc}` : `${Sort.Asc}`}${filterTypeOfGuitar !== '' ? `&type=${GuitarType.Acoustic}` : ''}${filterTypeOfGuitarElectric !== '' ? `&type=${GuitarType.Electric}` : ''}${filterTypeOfGuitarUkulele !== '' ? `&type=${GuitarType.Ukulele}` : ''}${stringsCount[StringIndex.FourStringsIndex] ? `&stringCount=${StringCount.FourStrings}` : ''}${stringsCount[StringIndex.SixStringsIndex] ? `&stringCount=${StringCount.SixStrings}` : ''}${stringsCount[StringIndex.SevenStringsIndex] ? `&stringCount=${StringCount.SevenStrings}` : ''}${stringsCount[StringIndex.TwelveStringsIndex] ? `&stringCount=${StringCount.TwelveStrings}` : ''}`)
      .reply(200, mockGuitars);

    const store = mockStore();
    await store.dispatch(loadCardsWithoutPagination(
      cardsStateSortType,
      cardsStateSortOrder,
      filterTypeOfGuitar,
      filterTypeOfGuitarElectric,
      '',
      [false, false, false, false],
    ));

    expect(store.getActions()).toEqual([
      setFiltredCards(mockGuitars),
    ]);
  });

  it('should dispatch Load_Current_Guitar_Comments when POST /comments and GET /guitars/:guitarId/comments', async () => {
    const currentGuitarCommentPost = makeFakeCurrentGuitarCommentPost();
    const onClose = () => false;
    const setFormDisabled = (boolean:boolean) => false;
    const addedCommentModal = (boolean:boolean) => true;

    mockAPI
      .onPost(`${BASE_URL}comments`, currentGuitarCommentPost)
      .reply(200, []);

    const store = mockStore();
    await store.dispatch(postComment(currentGuitarCommentPost, setFormDisabled, onClose, addedCommentModal));

    expect(store.getActions()).toEqual([
      setFormDisabled(false),
      onClose(),
      addedCommentModal(true),
    ]);
  });*/

});
