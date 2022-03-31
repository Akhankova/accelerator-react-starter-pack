import { name, lorem, datatype, image } from 'faker';
import { SmallCard, Comment } from '../types/cards';
//import { Sort } from '../const';

export const makeFakeCard = (): SmallCard => ({
  id: datatype.number(),
  name: name.title(),
  previewImg: image.imageUrl(),
  price: datatype.number(),
  rating: datatype.number(),
  stringCount: datatype.number(),
  vendorCode: datatype.string(),
  type: datatype.string(),
  description: lorem.paragraph(),
  comments: makeFakeCommentList(5),
});


export const makeFakeComment = (): Comment => ({
  id: datatype.string(),
  comment: lorem.paragraph(),
  rating: datatype.number(),
  guitarId: datatype.number(),
  userName: name.firstName(),
  advantage: datatype.string(),
  disadvantage: datatype.string(),
  createAt: datatype.string(),
});

export const makeFakeCommentList = (count: number): Array<Comment> =>
  new Array(count).fill(null).map(() => makeFakeComment());

export const makeFakeCardList = (count: number): Array<SmallCard> =>
  new Array(count).fill(null).map(() => makeFakeCard());


/*const createMockGuitarType = (): string => 'acoustic';
const createMockStringCount = (): number => datatype.number();
const createMockSortingType = (): string => Sort.Price;
const createMockSortingOrder = (): string => Sort.Descending;
const createMockUrlFilter = (): string => '&_sort=price&';
const createMockStartPrice = (): number => datatype.number();*/
const getPaginationSite = (): number =>  datatype.number();

export {
  getPaginationSite
};
