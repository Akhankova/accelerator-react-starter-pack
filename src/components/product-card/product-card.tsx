import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { generatePath } from 'react-router-dom';
import { AppRoute } from '../../const';
import { setDataLoading } from '../../store/action';
import { Comments } from '../../types/cards';

type Props = {
  name: string;
  previewImg: string,
  rating: number,
  price: number,
  id: number,
  comments: Comments,
}
export enum Rating {
  FIRST = 1,
  SECOND = 2,
  THIRD = 3,
  FOUR = 4,
  FIVE = 5,
}

function ProductCard(props: Props): JSX.Element {
  const {name, rating, previewImg, price, id, comments} = props;
  const dispatchAction = useDispatch();

  const handleCardClick = () => {
    dispatchAction(setDataLoading(false));
  };

  return (
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
            <use xlinkHref={rating >= Rating.FOUR? '#icon-full-star' : '#icon-star'}></use>
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
        <Link className="button button--mini" onClick={handleCardClick} to={generatePath(AppRoute.Guitar, {id: id})}> Подробнее</Link>
        <Link className="button button--red button--mini button--add-to-cart"to='/' >Купить</Link>
      </div>
    </div>
  );
}
export default ProductCard;
