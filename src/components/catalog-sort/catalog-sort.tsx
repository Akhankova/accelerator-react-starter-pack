import {setType, setOrder} from '../../store/action';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { getSortType, getSortOrder } from '../../store/sort-data/selectors';

function CatalogSort(): JSX.Element {
  const isSort = useSelector(getSortType);
  const isSortOrder = useSelector(getSortOrder);
  const dispatchAction = useDispatch();

  return (
    <div className="catalog-sort">
      <h2 className="catalog-sort__title">Сортировать:</h2>
      <div className="catalog-sort__type">
        <button className={`catalog-sort__type-button ${isSort === 'по цене' ? 'catalog-sort__type-button--active' : ''}`} tabIndex={isSort === 'по цене' ? -1 : 0} aria-label="по цене" onClick={(event) => dispatchAction(setType(event.currentTarget.innerHTML))}>по цене</button>
        <button className={`catalog-sort__type-button ${isSort === 'по популярности' ? 'catalog-sort__type-button--active' : ''}`} tabIndex={isSort === 'по популярности' ? -1 : 0} aria-label="по популярности" onClick={(event) => dispatchAction(setType(event.currentTarget.innerHTML))}>по популярности</button>
      </div>
      <div className="catalog-sort__order">
        <button className={`catalog-sort__order-button catalog-sort__order-button--up ${isSortOrder === 'По возрастанию' ? 'catalog-sort__order-button--active' : ''}`} aria-label="По возрастанию" tabIndex={isSortOrder === 'По возрастанию' ? -1 : 0} onClick={(event) => dispatchAction(setOrder(event.currentTarget.value))} value='По возрастанию'></button>
        <button style={{borderBottomColor: '#585757'}} className={`catalog-sort__order-button catalog-sort__order-button--down ${isSortOrder === 'По убыванию' ? 'catalog-sort__order-button--active' : ''}`} aria-label="По убыванию" onClick={(event) => dispatchAction(setOrder(event.currentTarget.value))} tabIndex={isSortOrder === 'По убыванию' ? -1 : 0} value='По убыванию'></button>
      </div>
    </div>
  );
}
export default CatalogSort;
