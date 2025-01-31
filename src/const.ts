export const MIN_LENGTH = 1;
export const MAX_LENGTH = 9;
export const PAGE_NUMBER_FIRST = 1;
export const COUNT_CARDS_MAX = 9;
export const MIN_VALUE = 0;
export const FOR_PREV_IMG = 4;
export const IMAGE_SLICE_FOR_MODAL = 12;
export const ERROR_TEXT = 'Произошла ошибка при загрузке. Повторите попытку';
export const ERROR_TEXT_COMMENT = 'Произошла ошибка при загрузке. Повторите попытку';
export const FIRST_SITE = 1;
export const PAGINATION_VALUE_MIN = 1;
export const STEP_PAGINATION = 1;
export const BASE_URL = 'https://accelerator-guitar-shop-api-v1.glitch.me/';
export const PAGE_NOT_FOUND_ROUTER = '/404';
export const NOT_FOUND_STARUS = 0;
export const NO_INDEXOF = -1;
export const IMAGE_INDEX = 5;
export const IMAGE_SLICE = 4;

export enum PriceGuitar {
  MinPrice = 1700,
  MaxPrice = 35000,
}

export enum QuantatyGuitarsInCart {
  MinValue = 1,
  MaxValue = 99,
  MoreThanMax = 100,
}

export enum AppRoute {
  Main = '/',
  Catalog ='/catalog/page_:id',
  Guitar = '/guitars/:id',
  CurrentGuitar = '/guitars/',
  Cart = '/cart'
}

export enum Sort {
  Favorite = 'по популярности',
  Rating = 'rating',
  Price = 'по цене',
  Descending = 'По убыванию',
  Desc = 'desc',
  Asc = 'asc',
  PriceSort = 'price',
  Ascending = 'По возрастанию',
}

export enum StringIndex {
  FourStringsIndex = 0,
  SixStringsIndex = 1,
  SevenStringsIndex = 2,
  TwelveStringsIndex = 3,
}

export enum CommentsLength {
  CommentsLengthZero = 0,
  CommentsLengthOne = 1,
  CommentsLengthTwo = 2,
  CommentsLengthThree = 3,
}

export enum StringCount {
  FourStrings = 4,
  SixStrings = 6,
  SevenStrings = 7,
  TwelveStrings = 12,
}

export enum PaginationSite {
  First = 1,
  Second = 2,
  Third = 3,
}

export enum Key {
  Escape = 'Escape',
  Esc = 'Esc',
  Enter = 'Enter',
}

export enum GuitarType {
  Acoustic = 'acoustic',
  Electric = 'electric',
  Ukulele = 'ukulele',
}

export enum GuitarTypeRus {
  Acoustic = 'Акустическая',
  Electric = 'Электрогитара',
  Ukulele = 'Укулеле',
}

export enum Interval {
  First = '0&_end=9',
  Second = '10&_end=19',
  Third = '18&_end=27',
}

