export type SmallCard = {
  id: number;
  name: string;
  vendorCode: string;
  type: string,
  previewImg: string,
  stringCount: number,
  rating: number,
  description: string,
  price: number,
  comments: Comments,
};

export type SmallCards = SmallCard[];

export type Comment = {
    id: string,
    userName: string,
    advantage: string,
    disadvantage: string,
    comment: string,
    rating: number,
    createAt: string,
    guitarId: number
};

export type Coupon = {
  'coupon': string,
}
export type Comments = Comment[];

export type CommentServer = {
  rating: number,
  comment: string,
  advantage: string,
  disadvantage: string,
  userName: string,
  guitarId: number | undefined,
};

export type GuitarAndCommentsType = SmallCard & {
  comments: Comments,
}
