import { useState } from 'react';
import ModalCardDelete from '../modal-cart-delete/modal-cart-delete';

type Props = {
  name: string;
  price: number,
  vendorCode: string,
  stringCount: number,
  type: string,
  previewImg: string,
}

function CartItem(props: Props): JSX.Element {
  const { name, price, vendorCode, stringCount, type, previewImg } = props;
  const [isOpenModal, setIsOpenModal] = useState(false);

  const handleDeleteClick = () => {
    setIsOpenModal(true);
  };

  return (
    <>
      {isOpenModal ? <ModalCardDelete price={price} stringCount={stringCount} type={type} vendorCode={vendorCode} name={name} previewImg={previewImg} isOpen={() => setIsOpenModal(false)}/> : ''}
      <div className="cart-item">
        <button className="cart-item__close-button button-cross" type="button" aria-label="Удалить" onClick={handleDeleteClick}><span className="button-cross__icon"></span><span className="cart-item__close-button-interactive-area"></span>
        </button>
        <div className="cart-item__image"><img src={previewImg[5] === 'c' ? `${previewImg}` : `/img/content/${previewImg.slice(4)}`} width="55" height="130" alt="СURT Z30 Plus" />
        </div>
        <div className="product-info cart-item__info">
          <p className="product-info__title">{name}</p>
          <p className="product-info__info">Артикул: {vendorCode}</p>
          <p className="product-info__info">{type}, {stringCount} струнная</p>
        </div>
        <div className="cart-item__price">{price} ₽</div>
        <div className="quantity cart-item__quantity">
          <button className="quantity__button" aria-label="Уменьшить количество">
            <svg width="8" height="8" aria-hidden="true">
              <use xlinkHref="#icon-minus"></use>
            </svg>
          </button>
          <input className="quantity__input" type="number" placeholder="1" id="4-count" name="4-count" max="99" />
          <button className="quantity__button" aria-label="Увеличить количество">
            <svg width="8" height="8" aria-hidden="true">
              <use xlinkHref="#icon-plus"></use>
            </svg>
          </button>
        </div>
        <div className="cart-item__price-total">{price} ₽</div>
      </div>
    </>

  );
}
export default CartItem;
