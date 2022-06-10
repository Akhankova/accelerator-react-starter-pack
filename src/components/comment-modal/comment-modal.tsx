import { CommentServer, SmallCard } from '../../types/cards';
import { useHistory } from 'react-router-dom';
import { generatePath } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { postComment } from '../../store/api-actions';
import { useDispatch } from 'react-redux';
import ReactFocusLock from 'react-focus-lock';

const LAST_RATE = 5;
const FIRST_RATE = 1;

type Props = {
  onClose: () => void,
  addedCommentModal: (arg: boolean) => void,
  card: SmallCard | undefined,
}

export function CommentModal(props: Props): JSX.Element {
  const { onClose, card, addedCommentModal } = props;
  const history = useHistory();
  const [nameValid, setNameValid] = useState(true);
  const [ratingValid, setRatingValid] = useState(true);
  const dispatchAction = useDispatch();

  const handleExitClick = () => {
    onClose();
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

  const getValidForRating = (rating: number) => {
    if (!rating) {
      setRatingValid(false);
    } else {
      setRatingValid(true);
    }
  };

  const getValidForName = (name: string) => {
    if (!name) {
      setNameValid(false);
    } else {
      setNameValid(true);
    }
  };

  const [commentNew, setCommentNew] = useState<CommentServer>({
    rating: 0,
    comment: ' ',
    advantage: ' ',
    disadvantage: ' ',
    userName: '',
    guitarId: card?.id,
  });

  const handleCommentTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCommentNew({
      ...commentNew,
      comment: event.target.value,
    });
  };

  const handleAdvantageTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCommentNew({
      ...commentNew,
      advantage: event.target.value,
    });
  };

  const handleDisanvantageTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCommentNew({
      ...commentNew,
      disadvantage: event.target.value,
    });
  };

  const handleNameTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCommentNew({
      ...commentNew,
      userName: event.target.value,
    });
  };

  const handleRatingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCommentNew({
      ...commentNew,
      rating: Number(event.target.value),
    });
  };

  const handleFormSubmit = (evt: { preventDefault: () => void; }) => {
    evt.preventDefault();
    getValidForRating(commentNew.rating);
    getValidForName(commentNew.userName);

    const { rating, comment, advantage, disadvantage, userName, guitarId } = commentNew;
    if (commentNew.rating !== 0 && commentNew.userName) {
      dispatchAction(postComment({ rating, comment, advantage, disadvantage, userName, guitarId }, onClose, addedCommentModal));
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleRateKeyDown = (evt:any) => {
    let currentValueRating = commentNew.rating;

    if (!currentValueRating) {
      currentValueRating = LAST_RATE;
    }

    if (evt.key === 'ArrowLeft' || evt.key === 'ArrowDown') {
      evt.preventDefault();

      if (currentValueRating === FIRST_RATE) {
        const element = document.querySelector(`#star-${LAST_RATE}`);
        if (element !== null){(element as HTMLElement).click();}
      }
      const element = document.querySelector(`#star-${currentValueRating - FIRST_RATE}`);
      if (element !== null){(element as HTMLElement).click();}
    }

    if (evt.key === 'ArrowRight' || evt.key === 'ArrowUp') {
      evt.preventDefault();

      if (currentValueRating === LAST_RATE) {
        const element = document.querySelector(`#star-${FIRST_RATE}`);
        if (element !== null){(element as HTMLElement).click();}
      }
      const element = document.querySelector(`#star-${currentValueRating + FIRST_RATE}`);
      if (element !== null){(element as HTMLElement).click();}
    }
  };

  useEffect(() => {
    if (commentNew.userName.length > 0) {
      getValidForName(commentNew.userName);
    }
  }, [commentNew.userName]);

  useEffect(() => {
    if (commentNew.rating !== 0) {
      getValidForRating(commentNew.rating);
    }
  }, [commentNew.rating]);

  return (
    <ReactFocusLock>
      <div style={{ position: 'relative', width: '550px', height: '610px', marginBottom: '50px' }}>
        <div className="modal is-active modal--review modal-for-ui-kit">
          <div className="modal__wrapper">
            <div className="modal__overlay" data-close-modal onClick={handleExitClick}></div>
            <div className="modal__content">
              <h2 className="modal__header modal__header--review title title--medium">Оставить отзыв</h2>
              <h3 className="modal__product-name title title--medium-20 title--uppercase">{card?.name}</h3>
              <form className="form-review" onSubmit={handleFormSubmit}>
                <div className="form-review__wrapper">
                  <div className="form-review__name-wrapper">
                    <label className="form-review__label form-review__label--required" htmlFor="user-name">Ваше Имя</label>
                    <input className="form-review__input form-review__input--name" id="user-name" type="text" autoComplete="off" onChange={handleNameTextChange} autoFocus/>
                    {!nameValid ? <span className="form-review__warning">Заполните поле</span> : <p></p>}
                  </div>
                  <div><span className="form-review__label form-review__label--required">Ваша Оценка</span>
                    <div className="rate rate--reverse" onKeyDown={handleRateKeyDown}>
                      <input className="visually-hidden" type="radio" id="star-5" name="rate" value="5" onChange={handleRatingChange} tabIndex={5}/>
                      <label className="rate__label" htmlFor="star-5" title="Отлично"></label>
                      <input className="visually-hidden" type="radio" id="star-4" name="rate" value="4" onChange={handleRatingChange}tabIndex={4}/>
                      <label className="rate__label" htmlFor="star-4" title="Хорошо"></label>
                      <input className="visually-hidden" type="radio" id="star-3" name="rate" value="3" onChange={handleRatingChange}tabIndex={3}/>
                      <label className="rate__label" htmlFor="star-3" title="Нормально"></label>
                      <input className="visually-hidden" type="radio" id="star-2" name="rate" value="2" onChange={handleRatingChange}tabIndex={2}/>
                      <label className="rate__label" htmlFor="star-2" title="Плохо"></label>
                      <input className="visually-hidden" type="radio" id="star-1" name="rate" value="1" onChange={handleRatingChange}/>
                      <label className="rate__label" htmlFor="star-1" title="Ужасно"></label><span className="rate__count"></span>
                      <span className="rate__message">{!ratingValid ? 'Поставьте оценку' : ' '}</span>
                    </div>
                  </div>
                </div>
                <label className="form-review__label" htmlFor="user-name">Достоинства</label>
                <input className="form-review__input" id="pros" type="text" autoComplete="off" onChange={handleAdvantageTextChange}></input>
                <label className="form-review__label" htmlFor="user-name">Недостатки</label>
                <input className="form-review__input" id="user-name" type="text" autoComplete="off" onChange={handleDisanvantageTextChange}></input>
                <label className="form-review__label" htmlFor="user-name">Комментарий</label>
                <textarea className="form-review__input form-review__input--textarea" id="user-name" rows={10} autoComplete="off" onChange={handleCommentTextChange}></textarea>
                <button className="button button--medium-20 form-review__button" type="submit">Отправить отзыв</button>
              </form>
              <button className="modal__close-btn button-cross" type="button" aria-label="Закрыть"><span className="button-cross__icon"></span><span className="modal__close-btn-interactive-area" onClick={handleExitClick} tabIndex={5}></span></button>
            </div>
          </div>
        </div>
      </div>
    </ReactFocusLock>
  );
}
export default CommentModal;
