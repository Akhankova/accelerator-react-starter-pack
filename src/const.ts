export const MIN_LENGTH = 1;
export const MAX_LENGTH = 9;
export const PAGE_NUMBER_FIRST = 1;
export const COUNT_CARDS_MAX = 9;
export const MIN_VALUE = 0;
export const FOR_PREV_IMG = 4;
export const ERROR_TEXT = 'Произошла ошибка при загрузке. Повторите попытку';
export const ERROR_TEXT_COMMENT = 'Произошла ошибка при загрузке. Повторите попытку';
export const FIRST_SITE = 1;
export const PAGINATION_VALUE_MIN = 1;
export const STEP_PAGINATION = 1;

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
  FOUR_STRINGS_INDEX = 0,
  SIX_STRINGS_INDEX = 1,
  SEVEN_STRINGS_INDEX = 2,
  TWELVE_STRINGS_INDEX = 3,
}

export enum StringCount {
  FOUR_STRINGS = 4,
  SIX_STRINGS = 6,
  SEVEN_STRINGS = 7,
  TWELVE_STRINGS = 12,
}

export enum PaginationSite {
  FIRST = 1,
  SECOND = 2,
  THIRD = 3,
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

export enum Interval {
  First = '0&_end=9',
  Second = '10&_end=19',
  Third = '18&_end=27',
}

