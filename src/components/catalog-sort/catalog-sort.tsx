//import { useState } from 'react';
//import { api } from '../../index';
//import { useEffect } from 'react';
//import { useHistory } from 'react-router-dom';
import {setType, setOrder} from '../../store/action';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { getSortType, getSortOrder } from '../../store/cards-data/selectors';

function CatalogSort(): JSX.Element {
  //const [isSort, setIsSort] = useState('');
  //const [isSortOrder, setIsSortOrder] = useState('');
  const isSort = useSelector(getSortType);
  const isSortOrder = useSelector(getSortOrder);
  const dispatchAction = useDispatch();
  const onClickSortHandler = (event:any) => {
    //setIsSort(event.target.innerHTML);
    dispatchAction(setType(event.target.innerHTML));
  };

  const onClickSortOrderHandler = (event:any) => {
    //setIsSortOrder(event.target.value);
    dispatchAction(setOrder(event.target.value));
  };

  return (
    <div className="catalog-sort">
      <h2 className="catalog-sort__title">Сортировать:</h2>
      <div className="catalog-sort__type">
        <button className={`catalog-sort__type-button ${isSort === 'по цене' ? 'catalog-sort__type-button--active' : ''}`} tabIndex={isSort === 'по цене' ? -1 : 0} aria-label="по цене" onClick={(event) => onClickSortHandler(event)}>по цене</button>
        <button className={`catalog-sort__type-button ${isSort === 'по популярности' ? 'catalog-sort__type-button--active' : ''}`} tabIndex={isSort === 'по популярности' ? -1 : 0} aria-label="по популярности" onClick={(event) => onClickSortHandler(event)}>по популярности</button>
      </div>
      <div className="catalog-sort__order">
        <button className={`catalog-sort__order-button catalog-sort__order-button--up ${isSortOrder === 'По возрастанию' ? 'catalog-sort__order-button--active' : ''}`} aria-label="По возрастанию" tabIndex={isSortOrder === 'По возрастанию' ? -1 : 0} onClick={(event) => onClickSortOrderHandler(event)} value='По возрастанию'></button>
        <button style={{borderBottomColor: '#585757'}} className={`catalog-sort__order-button catalog-sort__order-button--down ${isSortOrder === 'По убыванию' ? 'catalog-sort__order-button--active' : ''}`} aria-label="По убыванию" onClick={(event) => onClickSortOrderHandler(event)} tabIndex={isSortOrder === 'По убыванию' ? -1 : 0} value='По убыванию'></button>
      </div>
    </div>
  );
}
export default CatalogSort;
