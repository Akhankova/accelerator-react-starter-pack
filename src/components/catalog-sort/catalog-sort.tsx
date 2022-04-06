import {setType, setOrder} from '../../store/action';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { getSortType, getSortOrder } from '../../store/sort-data/selectors';
import { Sort } from '../../const';

function CatalogSort(): JSX.Element {
  const isSort = useSelector(getSortType);
  const isSortOrder = useSelector(getSortOrder);
  const dispatchAction = useDispatch();

  const styleButtomAsc = isSortOrder !== `${Sort.Ascending}` ? {borderBottomColor: '#d1d1d1'} : {borderBottomColor: '#585757'};
  const styleButtomDesc = isSortOrder === `${Sort.Ascending}` ? {borderBottomColor: '#919191'} : {borderTopColor: 'black'};

  return (
    <div className="catalog-sort">
      <h2 className="catalog-sort__title">Сортировать:</h2>
      <div className="catalog-sort__type">
        <button className={`catalog-sort__type-button ${isSort === `${Sort.Price}` ? 'catalog-sort__type-button--active' : ''}`} tabIndex={isSort === `${Sort.Price}` ? -1 : 0} aria-label="по цене" onClick={(event) => dispatchAction(setType(event.currentTarget.innerHTML))}>по цене</button>
        <button className={`catalog-sort__type-button ${isSort === `${Sort.Favorite}` ? 'catalog-sort__type-button--active' : ''}`} tabIndex={isSort === `${Sort.Favorite}` ? -1 : 0} aria-label="по популярности" onClick={(event) => dispatchAction(setType(event.currentTarget.innerHTML))}>по популярности</button>
      </div>
      <div className="catalog-sort__order">
        <button style={styleButtomAsc} className={`catalog-sort__order-button catalog-sort__order-button--up ${isSortOrder === `${Sort.Ascending}` ? 'catalog-sort__order-button--active' : ''}`} aria-label="По возрастанию" tabIndex={isSortOrder === `${Sort.Ascending}` ? -1 : 0} onClick={(event) => dispatchAction(setOrder(event.currentTarget.value))} value='По возрастанию'></button>
        <button style={styleButtomDesc} className={`catalog-sort__order-button catalog-sort__order-button--down ${isSortOrder === `${Sort.Descending}` ? 'catalog-sort__order-button--active' : ''}`} aria-label="По убыванию" onClick={(event) => dispatchAction(setOrder(event.currentTarget.value))} tabIndex={isSortOrder === `${Sort.Descending}` ? -1 : 0} value='По убыванию'></button>
      </div>
    </div>
  );
}
export default CatalogSort;
