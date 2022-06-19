import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { generatePath } from 'react-router-dom';
import { AppRoute } from '../../const';
import { setDataLoading } from '../../store/action';
import { getCardsCart } from '../../store/cards-data/selectors';
import { Comments, SmallCard } from '../../types/cards';
import ModalCart from '../modal-cart/modal-cart';
import ModalSuccessAdd from '../modal-success-add/modal-success-add';

type Props = {
  name: string;
  previewImg: string,
  rating: number,
  price: number,
  id: number,
  comments: Comments,
  vendorCode: string,
  stringCount: number,
  type: string,
}
export enum Rating {
  FIRST = 1,
  SECOND = 2,
  THIRD = 3,
  FOUR = 4,
  FIVE = 5,
}

function ProductCard(props: Props): JSX.Element {
  const { name, rating, previewImg, price, id, comments, vendorCode, stringCount, type } = props;
  const dispatchAction = useDispatch();
  const [isBookingModalOpened, setIsBookingModalOpened] = useState(false);
  const [isModalSuccessAddOpened, setIsModalSuccessAddOpened] = useState(false);
  const cardsCart = useSelector(getCardsCart);
  const [inCart, setInCart] = useState(false);

  const handleCardClick = () => {
    dispatchAction(setDataLoading(false));
  };

  const onBookingBtnClick = () => {
    setIsBookingModalOpened(true);
  };

  useEffect(()=> {
    const card = cardsCart.filter((item)=> item.name === name);
    if (card.length !== 0){setInCart(true);}
  }, [cardsCart, name]);

  return (
    <>
      {!isBookingModalOpened ? null : <ModalCart onOpen={() => setIsModalSuccessAddOpened(true)} onClose={() => setIsBookingModalOpened(false)} card={{ name, rating, previewImg, price, id, comments, vendorCode, stringCount, type } as SmallCard} />}
      {!isModalSuccessAddOpened ? null : <ModalSuccessAdd onClose={() => {setIsModalSuccessAddOpened(false); setInCart(true);}} />}
      <div className="product-card">
        <img src={previewImg} width="75" height="190" alt={name} />
        <div className="product-card__info">
          <div className="rate product-card__rate" aria-hidden="true"><span className="visually-hidden">Рейтинг:</span>
            <svg width="12" height="11" aria-hidden="true">
              <use xlinkHref={rating >= Rating.FIRST ? '#icon-full-star' : '#icon-star'}></use>
            </svg>
            <svg width="12" height="11" aria-hidden="true">
              <use xlinkHref={rating >= Rating.SECOND ? '#icon-full-star' : '#icon-star'}></use>
            </svg>
            <svg width="12" height="11" aria-hidden="true">
              <use xlinkHref={rating >= Rating.THIRD ? '#icon-full-star' : '#icon-star'}></use>
            </svg>
            <svg width="12" height="11" aria-hidden="true">
              <use xlinkHref={rating >= Rating.FOUR ? '#icon-full-star' : '#icon-star'}></use>
            </svg>
            <svg width="12" height="11" aria-hidden="true">
              <use xlinkHref={rating >= Rating.FIVE ? '#icon-full-star' : '#icon-star'} ></use>
            </svg><span className="rate__count">{comments?.length}</span><span className="rate__message"></span>
          </div>
          <p className="product-card__title">{name}</p>
          <p className="product-card__price"><span className="visually-hidden">Цена:</span>{price} ₽
          </p>
        </div>
        <div className="product-card__buttons">
          <Link className="button button--mini" onClick={handleCardClick} to={generatePath(AppRoute.Guitar, { id: id })}> Подробнее</Link>
          {!inCart ? <Link className="button button--red button--mini button--add-to-cart" to='/' onClick={(evt) => { evt.preventDefault(); onBookingBtnClick(); }}>Купить</Link> : ''}
          {inCart ? <Link className="button button--red-border button--mini button--in-cart" to='/'>В Корзине</Link> : ''}
        </div>
      </div>
    </>
  );
}
export default ProductCard;
