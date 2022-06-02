import { SmallCard } from '../../types/cards';
import { useHistory } from 'react-router-dom';
import { generatePath } from 'react-router-dom';
import { useEffect } from 'react';
import { loadComments } from '../../store/api-actions';
import { useDispatch } from 'react-redux';

type Props = {
  card: SmallCard | undefined,
  addedCommentModal: () => void,
  id: number,
}

export function CommentAddSuccessfully(props: Props): JSX.Element {
  const { card, addedCommentModal, id } = props;
  const history = useHistory();
  const dispatchAction = useDispatch();

  const handleExitClick = () => {
    addedCommentModal();
    dispatchAction(loadComments(String(id)));
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
            <p className="modal__message">Спасибо за ваш отзыв!</p>
            <div className="modal__button-container modal__button-container--review">
              <button className="button button--small modal__button modal__button--review" onClick={handleExitClick} autoFocus>К покупкам!</button>
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
