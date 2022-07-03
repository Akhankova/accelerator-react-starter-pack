import { useState, useEffect, useRef } from 'react';
import { Link, useHistory, useRouteMatch } from 'react-router-dom';
import { generatePath } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCardsCart, getCardsForSerch, getIsDataLoadingForSerch } from '../../store/cards-data/selectors';
import { KeyboardEvent } from 'react';
import { AppRoute, Key } from '../../const';
import { getGuitarsNamesList } from '../../store/cards-data/selectors';
import { setCardLoading, setDataLoading, setFilterTypeGuitarElectric, setFilterTypeGuitarUkulele, setFilterTypeOfGuitar, setStringsCount } from '../../store/action';

function Header(): JSX.Element {

  const guitarsNamesList = useSelector(getGuitarsNamesList);
  const getDataForSerch = useSelector(getCardsForSerch);
  const [searchString, setSearchString] = useState('');
  const [isFocus, setIsFocus] = useState(false);
  const history = useHistory();
  const ref = useRef<HTMLInputElement | null>(null);
  const isDataLoadedForEach = useSelector(getIsDataLoadingForSerch);
  const dispatchAction = useDispatch();
  const cardsCart = useSelector(getCardsCart);
  const [cardsGuitar, setCardsGuitar] = useState<number[]>([]);
  const match = useRouteMatch();
  const mathPath = match.path;

  const results = guitarsNamesList.filter((guitarName) =>
    guitarName.toLowerCase().includes(searchString.toLowerCase()));

  const handleFocusOut = (evt: MouseEvent) => {
    if (evt.target !== ref.current) {
      setIsFocus(false);
      setSearchString('');
    }
  };

  const handleSchowCatalog = () => {
    dispatchAction(setCardLoading(false));
    dispatchAction(setFilterTypeGuitarElectric(''));
    dispatchAction(setFilterTypeGuitarUkulele(''));
    dispatchAction(setFilterTypeOfGuitar(''));
    dispatchAction(setStringsCount([false, false, false, false]));
  };

  const handleFocusIn = () => setIsFocus(true);

  useEffect(() => {
    document.addEventListener('click', handleFocusOut);
    return () => document.removeEventListener('click', handleFocusOut);
  }, []);

  const handleKeyDown = (evt: KeyboardEvent<HTMLLIElement>, resultItem: string) => {
    if (evt.key === Key.Enter) {
      let idCard;
      getDataForSerch.forEach((card) => card.name === resultItem ? idCard = card.id : '');
      history.push(generatePath(`/guitars/${idCard}`));
      setSearchString('');
    }
  };

  const handleCardClick = (resultItem: string) => {
    dispatchAction(setCardLoading(false));
    dispatchAction(setDataLoading(false));
    let idCard;
    getDataForSerch.forEach((card) => card.name === resultItem ? idCard = card.id : '');
    setSearchString('');
    history.push(generatePath(`/guitars/${idCard}`));
  };

  const headerClickHandler = () => {
    setSearchString('');
  };

  const countGuitars: number[] = [];

  useEffect(() => {
    cardsCart.filter((item)=> countGuitars.push(item.count));
    setCardsGuitar(countGuitars);
  }, [cardsCart, cardsGuitar.length]);

  return (
    <header className="header" id="header" onClick={headerClickHandler}>
      <div className="container header__wrapper">
        <a className="header__logo logo" href='/'>
          <img className="logo__img" width="70" height="70" src="../img/svg/logo.svg" alt="Логотип" />
        </a>
        <nav className="main-nav">
          <ul className="main-nav__list">
            <li><Link className={`link main-nav__link ${mathPath === '/cart' ||  mathPath === '/guitars/:id'? '' :  'link--current'}`} to={generatePath(AppRoute.Main)} onClick={handleSchowCatalog}>Каталог</Link>
            </li>
            <li><Link className="link main-nav__link" to={generatePath(AppRoute.Main)} onClick={handleSchowCatalog}>Где купить?</Link>
            </li>
            <li><Link className="link main-nav__link" to={generatePath(AppRoute.Main)} onClick={handleSchowCatalog}>О компании</Link>
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
            <input className="form-search__input" id="search" type="text" autoComplete="off" placeholder="что вы ищите?" onChange={(event) => { setSearchString(event.target.value); }} onFocus={handleFocusIn} ref={ref} value={searchString}/>
            <label className="visually-hidden" htmlFor="search">Поиск</label>
          </form>
          {isDataLoadedForEach ?
            <ul style={{ zIndex: 1 }} className={`form-search__select-list ${(!isFocus) || searchString.length === 0 ? 'hidden' : ''}`}>
              {results.map((resultItem) => (<li className="form-search__select-item" tabIndex={0} key={resultItem} onKeyDown={(evt) => handleKeyDown(evt, resultItem)} onClick={() => { handleCardClick(resultItem); }}>{resultItem}</li>
              ))}
            </ul> : ''}

        </div>
        <Link className="header__cart-link" to={generatePath(AppRoute.Cart)} aria-label="Корзина">
          <svg className="header__cart-icon" width="14" height="14" aria-hidden="true">
            <use xlinkHref="#icon-basket"></use>
          </svg><span className="visually-hidden">Перейти в корзину</span>
          {cardsGuitar.length < 1 ? '' : <span className="header__cart-count">{(cardsGuitar?.reduce((a, b)=> a+b, 1))-1}</span>}
        </Link>
      </div>
    </header>
  );
}

export default Header;
