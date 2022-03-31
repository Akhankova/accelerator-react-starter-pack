import { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { generatePath } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getCards } from '../../store/cards-data/selectors';
import {KeyboardEvent} from 'react';
import {Key} from '../../const';

function Header(): JSX.Element {

  const cards = useSelector(getCards);
  const guitarsNamesList = cards.map((guitar) => guitar.name);
  const [searchString, setSearchString] = useState('');
  const [searchResult, setSearchResult] = useState(['']);
  const [ isFocus, setIsFocus ] = useState(false);
  const history = useHistory();
  const ref = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const results = guitarsNamesList.filter((guitarName) =>
      guitarName.toLowerCase().includes(searchString.toLowerCase()));
    setSearchResult(results);
  }, [searchString]);

  const handleFocusOut = (evt: MouseEvent) => {
    if (evt.target !== ref.current) {
      setIsFocus(false);
    }
  };

  const handleFocusIn = () => setIsFocus(true);

  useEffect(() => {
    document.addEventListener('click', handleFocusOut);
    return () => document.removeEventListener('click', handleFocusOut);
  }, []);

  const handleKeyDown = (evt: KeyboardEvent<HTMLLIElement>, resultItem: string) => {
    if(evt.key === Key.Enter) {
      let idCard;
      cards.forEach((card) => card.name === resultItem ? idCard = card.id : '');
      history.push(generatePath(`/guitars/${idCard}`));
      setSearchString('');
    }
  };

  const handleCardClick = (resultItem:string) => {
    let idCard;
    cards.forEach((card) => card.name === resultItem ? idCard = card.id : '');
    history.push(generatePath(`/guitars/${idCard}`));
  };

  const headerClickHandler = () => {
    setSearchString('');
  };

  return (
    <header className="header" id="header" onClick={headerClickHandler}>
      <div className="container header__wrapper">
        <a className="header__logo logo" href='/'>
          <img className="logo__img" width="70" height="70" src="../img/svg/logo.svg" alt="Логотип" />
        </a>
        <nav className="main-nav">
          <ul className="main-nav__list">
            <li><a className="link main-nav__link link--current" href="/">Каталог</a>
            </li>
            <li><a className="link main-nav__link" href="/">Где купить?</a>
            </li>
            <li><a className="link main-nav__link" href="/">О компании</a>
            </li>
          </ul>
        </nav>
        <div className="form-search">
          <form className="form-search__form">
            <button className="form-search__submit" type="submit">
              <svg className="form-search__icon" width="14" height="15" aria-hidden="true">
                <use xlinkHref="#icon-search"></use>
              </svg><span className="visually-hidden">Начать поиск</span>
            </button>
            <input className="form-search__input" id="search" type="text" autoComplete="off" placeholder="что вы ищите?" onChange={(event) => {setSearchString(event.target.value);}} onFocus={handleFocusIn} ref={ref}/>
            <label className="visually-hidden" htmlFor="search">Поиск</label>
          </form>
          <ul style={{ zIndex: 1 }} className={`form-search__select-list ${!isFocus ? 'hidden' : ''}`}>
            {searchResult.map((resultItem) => (
              <li className="form-search__select-item" tabIndex={0} key={resultItem} onKeyDown={(evt) => handleKeyDown(evt, resultItem)} onClick={() => {handleCardClick(resultItem);} }>{resultItem}</li>
            ))}
          </ul>

        </div>
        <a className="header__cart-link" href="/" aria-label="Корзина">
          <svg className="header__cart-icon" width="14" height="14" aria-hidden="true">
            <use xlinkHref="#icon-basket"></use>
          </svg><span className="visually-hidden">Перейти в корзину</span><span className="header__cart-count">2</span>
        </a>
      </div>
    </header>
  );
}

export default Header;
