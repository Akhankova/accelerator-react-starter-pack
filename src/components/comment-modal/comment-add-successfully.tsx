import { SmallCard } from '../../types/cards';
import { useHistory } from 'react-router-dom';
import { generatePath } from 'react-router-dom';
import { useEffect } from 'react';

type Props = {
  //onClose: () => void,
  card: SmallCard | undefined,
  addedCommentModal: () => void,
}

export function CommentAddSuccessfully(props: Props): JSX.Element {
  const { card, addedCommentModal } = props;

  const history = useHistory();


  const handleExitClick = () => {
    addedCommentModal();
    history.push(generatePath(`/guitars/${card?.id}`));
  };

  const handleOnKeyDown = (evt: KeyboardEvent) => {
    if (evt.key === 'Escape') {
      handleExitClick();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleOnKeyDown);
    return () => document.removeEventListener('keydown', handleOnKeyDown);
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
              <button className="button button--small modal__button">Перейти в корзину</button>
              <button className="button button--black-border button--small modal__button modal__button--right">Продолжить покупки</button>
            </div>
            <button className="modal__close-btn button-cross" type="button" aria-label="Закрыть" onClick={handleExitClick}><span className="button-cross__icon"></span><span className="modal__close-btn-interactive-area"></span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default CommentAddSuccessfully;
