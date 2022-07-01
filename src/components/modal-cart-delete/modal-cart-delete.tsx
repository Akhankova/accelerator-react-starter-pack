import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCardsCart } from '../../store/action';
import { getCardsCart } from '../../store/cards-data/selectors';

type Props = {
  name: string;
  isOpen: ()=> void;
  previewImg: string;
  vendorCode: string;
  type: string;
  stringCount: number;
  price: number;
}

export function ModalCardDelete(props: Props): JSX.Element {
  const { name, previewImg, vendorCode, type, price, isOpen, stringCount} = props;

  const cardsCart = useSelector(getCardsCart);
  const dispatchAction = useDispatch();

  const handleCardDelete = () => {
    const guitarsNew = cardsCart.filter((item) => item.name !== name);
    dispatchAction(setCardsCart(guitarsNew));
    isOpen();
  };

  const handleOnKeyDown = (evt: KeyboardEvent) => {
    if (evt.key === 'Escape') {
      isOpen();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleOnKeyDown);
    return () => document.removeEventListener('keydown', handleOnKeyDown);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const imgePr = previewImg[4] !== 'g' ?  `/img/content/${previewImg.slice(12)}` : `/img/content/${previewImg.slice(4)}`;

  return (
    <div>
      <div className="modal is-active modal-for-ui-kit">
        <div className="modal__wrapper">
          <div className="modal__overlay" data-close-modal></div>
          <div className="modal__content">
            <h2 className="modal__header title title--medium title--red">Удалить этот товар?</h2>
            <div className="modal__info"><img className="modal__img" src={imgePr} width="67" height="137" alt="Честер bass" />
              <div className="modal__info-wrapper">
                <h3 className="modal__product-name title title--little title--uppercase">{name}</h3>
                <p className="modal__product-params modal__product-params--margin-11">Артикул: {vendorCode}</p>
                <p className="modal__product-params">{type}, {stringCount} струнная</p>
                <p className="modal__price-wrapper"><span className="modal__price">Цена:</span><span className="modal__price">{price} ₽</span></p>
              </div>
            </div>
            <div className="modal__button-container">
              <button className="button button--small modal__button" onClick={handleCardDelete}>Удалить товар</button>
              <button className="button button--black-border button--small modal__button modal__button--right" onClick={isOpen}>Продолжить покупки</button>
            </div>
            <button className="modal__close-btn button-cross" type="button" aria-label="Закрыть"><span className="button-cross__icon"></span>
              <span className="modal__close-btn-interactive-area" onClick={isOpen}></span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ModalCardDelete;
