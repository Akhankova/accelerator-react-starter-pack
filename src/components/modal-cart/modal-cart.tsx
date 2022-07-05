import { SmallCardCart } from '../../types/cards';
import { useHistory } from 'react-router-dom';
import { generatePath } from 'react-router-dom';
import { useEffect } from 'react';
import { AppRoute, GuitarType, GuitarTypeRus, QuantatyGuitarsInCart } from '../../const';
import { setCardsCart } from '../../store/action';
import { useDispatch, useSelector } from 'react-redux';
import { getCardsCart } from '../../store/cards-data/selectors';

type Props = {
  onClose: () => void,
  onOpen: () => void,
  card: SmallCardCart | undefined,
}

export function ModalCart(props: Props): JSX.Element {
  const { onClose, card, onOpen } = props;
  const history = useHistory();
  const cardsCart = useSelector(getCardsCart);
  const dispatchAction = useDispatch();

  const handleAddCardinCartClick = () => {
    onClose();
    onOpen();
    if (card) {
      dispatchAction(setCardsCart([...cardsCart, {...card, count: QuantatyGuitarsInCart.MinValue}]));
    }

  };

  const handleExitClick = () => {
    onClose();
    history.push(generatePath(AppRoute.Main));
  };

  const handleOnKeyDown = (evt: KeyboardEvent) => {
    if (evt.key === 'ArrowRight') {
      handleExitClick();
    }
    if (evt.key === 'ArrowLeft') {
      handleExitClick();
    }
    if (evt.key === 'Escape') {
      handleExitClick();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleOnKeyDown);
    return () => document.removeEventListener('keydown', handleOnKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let guitarType = ' ';
  if (card?.type === GuitarType.Acoustic){
    guitarType = GuitarTypeRus.Acoustic;
  } else if (card?.type === GuitarType.Electric) {
    guitarType = GuitarTypeRus.Electric;
  } else { guitarType = GuitarTypeRus.Ukulele;}

  return (
    <div>
      <div className="modal is-active modal-for-ui-kit">
        <div className="modal__wrapper">
          <div className="modal__overlay" data-close-modal onClick={handleExitClick}></div>
          <div className="modal__content">
            <h2 className="modal__header title title--medium">Добавить товар в корзину</h2>
            <div className="modal__info">
              <img className="modal__img" src={`/img/${card?.previewImg.slice(4)}`} style={{width: '67px', height: '137px', margin: 0}} alt="Честер bass" />
              <div className="modal__info-wrapper">
                <h3 className="modal__product-name title title--little title--uppercase">{card?.name}</h3>
                <p className="modal__product-params modal__product-params--margin-11">Артикул: {card?.vendorCode}</p>
                <p className="modal__product-params">{guitarType}, {card?.stringCount} струнная</p>
                <p className="modal__price-wrapper"><span className="modal__price">Цена:</span><span className="modal__price">{card?.price} ₽</span></p>
              </div>
            </div>
            <div className="modal__button-container">
              <button className="button button--red button--big modal__button modal__button--add" onClick={handleAddCardinCartClick} autoFocus>Добавить в корзину</button>
            </div>
            <button className="modal__close-btn button-cross" type="button" aria-label="Закрыть" onClick={handleExitClick}><span className="button-cross__icon"></span><span className="modal__close-btn-interactive-area"></span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ModalCart;
