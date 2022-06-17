import { useEffect } from 'react';
import { generatePath, Link } from 'react-router-dom';
import { AppRoute } from '../../const';

type Props = {
  onClose: () => void,
}

export function ModalSuccessAdd(props: Props): JSX.Element {
  const { onClose } = props;

  const handleContinueClick = () => {
    onClose();
  };

  const handleExitClick = () => {
    onClose();
  };

  const handleOnKeyDown = (evt: KeyboardEvent) => {
    if (evt.key === 'Escape') {
      handleExitClick();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleOnKeyDown);
    return () => document.removeEventListener('keydown', handleOnKeyDown);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={{ position: 'relative', width: '550px', height: '410px', marginBottom: '50px' }}>
      <div className="modal is-active modal--success modal-for-ui-kit">
        <div className="modal__wrapper">
          <div className="modal__overlay" data-close-modal></div>
          <div className="modal__content">
            <svg className="modal__icon" width="26" height="20" aria-hidden="true">
              <use xlinkHref="#icon-success"></use>
            </svg>
            <p className="modal__message">Товар успешно добавлен в корзину</p>
            <div className="modal__button-container modal__button-container--add">
              <Link to={generatePath(AppRoute.Cart)}><button className="button button--small modal__button">Перейти в корзину</button></Link>
              <button className="button button--black-border button--small modal__button modal__button--right" onClick={()=> handleContinueClick()}>Продолжить покупки</button>
            </div>
            <button className="modal__close-btn button-cross" type="button" aria-label="Закрыть"><span className="button-cross__icon"></span><span className="modal__close-btn-interactive-area" onClick={handleExitClick}></span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ModalSuccessAdd;
