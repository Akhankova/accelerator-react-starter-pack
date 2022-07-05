import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GuitarType, GuitarTypeRus, IMAGE_INDEX, IMAGE_SLICE, Key, MIN_VALUE, QuantatyGuitarsInCart } from '../../const';
import { setCardsCart } from '../../store/action';
import { getCardsCart } from '../../store/cards-data/selectors';
import ModalCardDelete from '../modal-cart-delete/modal-cart-delete';

type Props = {
  name: string;
  price: number,
  vendorCode: string,
  stringCount: number,
  type: string,
  previewImg: string,
  count: number,
}

function CartItem(props: Props): JSX.Element {
  const { name, price, vendorCode, stringCount, type, previewImg, count } = props;

  const [isOpenModal, setIsOpenModal] = useState(false);
  const cardsCart = useSelector(getCardsCart);
  const inputQuantityRef = useRef<HTMLInputElement>(null);

  const dispatchAction = useDispatch();

  const handleDeleteClick = () => {
    setIsOpenModal(true);
  };

  const handlePlusClick = () => {
    if (count < QuantatyGuitarsInCart.MaxValue) {
      const countCards = count === undefined ? QuantatyGuitarsInCart.MinValue : count;
      const newCardsCart = cardsCart.map((item) => (item.name === name ? { ...item, count: countCards + QuantatyGuitarsInCart.MinValue } : item));
      dispatchAction(setCardsCart(newCardsCart));
    }

  };

  const handleMinusClick = () => {
    if (count === QuantatyGuitarsInCart.MinValue) {
      handleDeleteClick();
      return;
    }
    if (count > MIN_VALUE) {
      const countCards = count === undefined ? QuantatyGuitarsInCart.MinValue : count;
      const newCardsCart = cardsCart.map((item) => (item.name === name ? { ...item, count: countCards - QuantatyGuitarsInCart.MinValue } : item));
      dispatchAction(setCardsCart(newCardsCart));
    }
  };

  const handleQuantatyKeyDown = (evt: React.KeyboardEvent<HTMLInputElement>) => {
    if (evt.key === Key.Enter) {
      if (Number(evt.currentTarget.value) < QuantatyGuitarsInCart.MoreThanMax && Number(evt.currentTarget.value) > MIN_VALUE) {
        const newCardsCart = cardsCart.map((item) => (item.name === name ? { ...item, count: Number(evt.currentTarget.value) } : item));
        dispatchAction(setCardsCart(newCardsCart));
      }
    }
  };

  const onChangeQuantatyHandler = (evt: React.FocusEvent<HTMLInputElement, Element>) => {
    if(Number(evt.currentTarget.value) > QuantatyGuitarsInCart.MaxValue){
      evt.currentTarget.value = String(QuantatyGuitarsInCart.MaxValue);
      const newCardsCart = cardsCart.map((item) => (item.name === name ? { ...item, count: Number(evt.currentTarget.value)} : item));
      dispatchAction(setCardsCart(newCardsCart));
    }
    if(Number(evt.currentTarget.value) < QuantatyGuitarsInCart.MinValue){
      evt.currentTarget.value = String(QuantatyGuitarsInCart.MinValue);
      const newCardsCart = cardsCart.map((item) => (item.name === name ? { ...item, count: Number(evt.currentTarget.value)} : item));
      dispatchAction(setCardsCart(newCardsCart));
    }
    if (Number(evt.currentTarget.value) < QuantatyGuitarsInCart.MoreThanMax && Number(evt.currentTarget.value) > MIN_VALUE) {
      const newCardsCart = cardsCart.map((item) => (item.name === name ? { ...item, count: Number(evt.currentTarget.value) } : item));
      dispatchAction(setCardsCart(newCardsCart));
    }
  };

  useEffect(() => {
    if (inputQuantityRef.current) {
      inputQuantityRef.current.value = String(count);
    }
  }, [count]);

  useEffect(() => {
    if (isOpenModal) {
      document.body.style.overflow = 'hidden';
    } else { document.body.style.overflow = 'scroll'; }
  }, [isOpenModal]);

  let guitarType = ' ';
  if (type === GuitarType.Acoustic){
    guitarType = GuitarTypeRus.Acoustic;
  } else if (type === GuitarType.Electric) {
    guitarType = GuitarTypeRus.Electric;
  } else { guitarType = GuitarTypeRus.Ukulele;}

  return (
    <>
      {isOpenModal ? <ModalCardDelete price={price} stringCount={stringCount} type={type} vendorCode={vendorCode} name={name} previewImg={previewImg} isOpen={() => setIsOpenModal(false)} /> : ''}
      <div className="cart-item" data-testid="cart-item-test">
        <button className="cart-item__close-button button-cross" type="button" aria-label="Удалить" onClick={handleDeleteClick}><span className="button-cross__icon"></span><span className="cart-item__close-button-interactive-area"></span>
        </button>
        <div className="cart-item__image"><img src={previewImg[IMAGE_INDEX] === 'c' ? `${previewImg}` : `/img/content/${previewImg.slice(IMAGE_SLICE)}`} width="55" height="130" alt="СURT Z30 Plus" />
        </div>
        <div className="product-info cart-item__info">
          <p className="product-info__title">{name}</p>
          <p className="product-info__info">Артикул: {vendorCode}</p>
          <p className="product-info__info">{guitarType}, {stringCount} струнная</p>
        </div>
        <div className="cart-item__price">{`${price}`.split('').reverse().map((el, index) => index % 3 !== 2 ? el : ` ${el}`).reverse().join('')} ₽</div>
        <div className="quantity cart-item__quantity">
          <button className="quantity__button" aria-label="Уменьшить количество" onClick={handleMinusClick}>
            <svg width="8" height="8" aria-hidden="true">
              <use xlinkHref="#icon-minus"></use>
            </svg>
          </button>
          <input className="quantity__input" type="number" ref={inputQuantityRef} defaultValue={String(count)} id="4-count" name="4-count" onBlur={(event) => onChangeQuantatyHandler(event)} onKeyDown={(evt) => handleQuantatyKeyDown(evt)} />
          <button className="quantity__button" aria-label="Увеличить количество" onClick={handlePlusClick}>
            <svg width="8" height="8" aria-hidden="true">
              <use xlinkHref="#icon-plus"></use>
            </svg>
          </button>
        </div>
        <div className="cart-item__price-total">{`${price * (count)}`.split('').reverse().map((el, index) => index % 3 !== 2 ? el : ` ${el}`).reverse().join('')} ₽</div>
      </div>
    </>

  );
}
export default CartItem;
