import {Action} from 'redux';
import thunk, {ThunkDispatch} from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createAPI} from '../services/api';
import {loadCardInfo, loadCards, loadCardsSerch, loadCardsWithoutPagination, loadComments, postComment} from './api-actions';
import {State} from '../types/state';
import { makeFakeCard, makeFakeCardList, makeFakeCommentList, makeFakeCurrentGuitarCommentPost } from '../mock/mock';
import { setCard, setCards, setCardsForSerch, setCardTotalCount, setComments, setCommentsLoading, setDataLoading, setDataLoadingForSerch, setFiltredCards} from './action';
import { BASE_URL, GuitarType, Interval, PaginationSite, PriceGuitar, Sort, StringCount, StringIndex } from '../const';

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

  it('should dispatch loadCardsWithoutPagination when GET /guitars?_embed=comments&_sort=rating&_order=desc&type=acoustic&type=ukulele&stringCount=6', async () => {
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
      filterTypeOfGuitarUkulele,
      stringsCount,
    ));

    expect(store.getActions()).toEqual([
      setFiltredCards(mockGuitars),
    ]);
  });

  it('should dispatch postComment when POST /comments', async () => {
    const currentGuitarCommentPost = makeFakeCurrentGuitarCommentPost();
    const onClose = jest.fn();
    const setFormDisabled = jest.fn();
    setFormDisabled.mockReturnValue(false);
    const addedCommentModal = jest.fn();
    addedCommentModal.mockReturnValue(true);


    mockAPI
      .onPost(`${BASE_URL}comments`, currentGuitarCommentPost)
      .reply(201, []);

    const store = mockStore();
    await store.dispatch(postComment(currentGuitarCommentPost, setFormDisabled, onClose,addedCommentModal));

    expect(store.getActions()).toEqual([]);
  });

  it('should dispatch loadCards', async () => {
    const cardTotalCount = 27;
    const mockGuitars = makeFakeCardList(5);

    const myMock = jest.fn();
    myMock.mockReturnValueOnce(cardTotalCount);
    const cardsStateSortType = Sort.Favorite;
    const cardsStateSortOrder = Sort.Descending;
    const filterTypeOfGuitar = '';
    const filterTypeOfGuitarElectric = '';
    const filterTypeOfGuitarUkulele = '';
    const stringsCount = [false, true, false, true];
    const minPrice = PriceGuitar.MinPrice;
    const maxPrice = PriceGuitar.MaxPrice;
    const paginationSiteState = 1;

    mockAPI
      .onGet(`/guitars?_embed=comments&_sort=${cardsStateSortType === `${Sort.Favorite}` ? `${Sort.Rating}` : `${Sort.PriceSort}`}&_order=${cardsStateSortOrder === `${Sort.Descending}` ? `${Sort.Desc}` : `${Sort.Asc}`}${filterTypeOfGuitar !== '' ? `&type=${GuitarType.Acoustic}`: ''}${filterTypeOfGuitarElectric !== '' ? `&type=${GuitarType.Electric}`: ''}${filterTypeOfGuitarUkulele !== '' ? `&type=${GuitarType.Ukulele}`: ''}&${Sort.PriceSort}_gte=${minPrice}&${Sort.PriceSort}_lte=${maxPrice}${stringsCount[StringIndex.FourStringsIndex] ? `&stringCount=${StringCount.FourStrings}`: ''}${stringsCount[StringIndex.SixStringsIndex] ? `&stringCount=${StringCount.SixStrings}` : ''}${stringsCount[StringIndex.SevenStringsIndex] ? `&stringCount=${StringCount.SevenStrings
      }` : ''}${stringsCount[StringIndex.TwelveStringsIndex] ? `&stringCount=${StringCount.TwelveStrings}` : ''}${Number(paginationSiteState) === PaginationSite.First ? `&_start=${Interval.First}` : ''}${Number(paginationSiteState) === PaginationSite.Second ? `&_start=${Interval.Second}` : ''}${Number(paginationSiteState) === PaginationSite.Third ? `&_start=${Interval.Third}` : ''}`)
      .reply(200, mockGuitars, {'x-total-count': `${cardTotalCount}`});

    const store = mockStore();
    await store.dispatch(loadCards(
      cardsStateSortType,
      cardsStateSortOrder,
      filterTypeOfGuitar,
      filterTypeOfGuitarElectric,
      filterTypeOfGuitarUkulele,
      stringsCount,
      minPrice,
      maxPrice,
      paginationSiteState,
    ));

    expect(store.getActions()).toEqual([
      setCardTotalCount(String(cardTotalCount)),
      setCards(mockGuitars),
      setDataLoading(true),
    ]);
  });

});


