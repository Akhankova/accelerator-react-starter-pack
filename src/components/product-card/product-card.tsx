import { useHistory } from 'react-router-dom';
import { generatePath } from 'react-router-dom';
import { AppRoute } from '../../const';
import { Comments } from '../../types/cards';

type Props = {
  name: string;
  previewImg: string,
  rating: number,
  price: number,
  id: number,
  comments: Comments,
}

function ProductCard(props: Props): JSX.Element {
  const {name, rating, previewImg, price, id, comments} = props;
  const history = useHistory();

  const handleCardClick = () => {
    history.push(generatePath(AppRoute.Guitar, {id: id}));
  };

  return (
    <div className="product-card">
      <img src={previewImg} width="75" height="190" alt={name} />
      <div className="product-card__info">
        <div className="rate product-card__rate" aria-hidden="true"><span className="visually-hidden">Рейтинг:</span>
          <svg width="12" height="11" aria-hidden="true">
            <use xlinkHref={rating >= 1 ? '#icon-full-star' : '#icon-star'}></use>
          </svg>
          <svg width="12" height="11" aria-hidden="true">
            <use xlinkHref={rating >= 2 ? '#icon-full-star' : '#icon-star'}></use>
          </svg>
          <svg width="12" height="11" aria-hidden="true">
            <use xlinkHref={rating >= 3 ? '#icon-full-star' : '#icon-star'}></use>
          </svg>
          <svg width="12" height="11" aria-hidden="true">
            <use xlinkHref={rating >= 4 ? '#icon-full-star' : '#icon-star'}></use>
          </svg>
          <svg width="12" height="11" aria-hidden="true">
            <use xlinkHref={rating >= 5 ? '#icon-full-star' : '#icon-star'}></use>
          </svg><span className="rate__count">{comments?.length}</span><span className="rate__message"></span>
        </div>
        <p className="product-card__title">{name}</p>
        <p className="product-card__price"><span className="visually-hidden">Цена:</span>{price} ₽
        </p>
      </div>
      <div className="product-card__buttons">
        <a className="button button--mini" onClick={handleCardClick}>Подробнее</a>
        <a className="button button--red button--mini button--add-to-cart" >Купить</a>
      </div>
    </div>
  );
}
export default ProductCard;
