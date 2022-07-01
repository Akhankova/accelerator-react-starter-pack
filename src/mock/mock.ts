import { name, lorem, datatype, image } from 'faker';
import { SmallCard, Comment, CommentServer, SmallCardCart, Coupon } from '../types/cards';

export const makeFakeCard = (): SmallCardCart => ({
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
  count: 5,
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

export const makeFakeGuitarRating = (): number => Math.floor(Math.random() * 5);

export const makeFakeCurrentGuitarCommentPost = (): CommentServer => ({
  'guitarId': 12,
  'userName': name.title(),
  'advantage': lorem.text(),
  'disadvantage': lorem.text(),
  'comment': lorem.text(),
  'rating': makeFakeGuitarRating(),
});

export const makeCoupon = ():Coupon => ({'coupon': 'jnjn-111'});

export const makeFakeCommentList = (count: number): Array<Comment> =>
  new Array(count).fill(null).map(() => makeFakeComment());

export const makeFakeCardList = (count: number): Array<SmallCard> =>
  new Array(count).fill(null).map(() => makeFakeCard());

const getPaginationSite = (): number =>  datatype.number();

export {
  getPaginationSite
};
