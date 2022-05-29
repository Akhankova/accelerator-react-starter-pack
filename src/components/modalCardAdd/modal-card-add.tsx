import { SmallCard } from '../../types/cards';
import { useHistory } from 'react-router-dom';
import { generatePath } from 'react-router-dom';
import React, { useEffect } from 'react';

type Props = {
  onClose: () => void,
  card: SmallCard | undefined,
}

export function ModalCardAdd(props: Props): JSX.Element {
  const { onClose, card } = props;
  const history = useHistory();

  const handleExitClick = () => {
    onClose();
    history.push(generatePath(`/guitars/${card?.id}`));
  };

  const handleOnKeyDown = (evt: KeyboardEvent) => {
    if(evt.key === 'Escape') {
      handleExitClick();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleOnKeyDown);
    return () => document.removeEventListener('keydown', handleOnKeyDown);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (

    <div style={{ position: 'relative', width: '550px', height: '440px', marginBottom: '50px' }}>
      <div className="modal is-active modal-for-ui-kit">
        <div className="modal__wrapper">
          <div className="modal__overlay" data-close-modal onClick={handleExitClick}></div>
          <div className="modal__content">
            <h2 className="modal__header title title--medium">Добавить товар в корзину</h2>
            <div className="modal__info">
              <img className="modal__img" src={`/img/content/${card?.previewImg.slice(4)}`} width="67" height="137" alt="Честер bass" />
              <div className="modal__info-wrapper">
                <h3 className="modal__product-name title title--little title--uppercase">{card?.name}</h3>
                <p className="modal__product-params modal__product-params--margin-11">Артикул: {card?.vendorCode}</p>
                <p className="modal__product-params">{card?.type}, {card?.stringCount} струнная</p>
                <p className="modal__price-wrapper"><span className="modal__price">Цена:</span><span className="modal__price">{card?.price} ₽</span></p>
              </div>
            </div>
            <div className="modal__button-container">
              <button className="button button--red button--big modal__button modal__button--add" autoFocus>Добавить в корзину</button>
            </div>
            <button className="modal__close-btn button-cross" type="button" aria-label="Закрыть" onClick={handleExitClick}><span className="button-cross__icon"></span><span className="modal__close-btn-interactive-area"></span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ModalCardAdd;

