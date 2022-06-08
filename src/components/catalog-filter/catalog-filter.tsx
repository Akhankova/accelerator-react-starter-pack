import { setDataLoading, setFilterTypeGuitarElectric, setFilterTypeGuitarUkulele, setFilterTypeOfGuitar, setMaxPrice, setMinPrice, setStringsCount } from '../../store/action';
import { useDispatch } from 'react-redux';
import {  ChangeEvent, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getFilterTypeOfGuitar, getFilterTypeOfGuitarElectric, getFilterTypeOfGuitarUkulele, getGuitarMaxPrice, getGuitarMinPrice, getStringsCount } from '../../store/filters-data/selectors';
import 'react-toastify/dist/ReactToastify.css';
import { getSortOrder, getSortType } from '../../store/sort-data/selectors';
import { GuitarType, Key, PaginationSite, StringCount, StringIndex } from '../../const';
import { generatePath, useHistory } from 'react-router-dom';
import { loadCardsWithoutPagination } from '../../store/api-actions';

function CatalogFilter(): JSX.Element {
  const dispatchAction = useDispatch();
  const [acoustic, setAcoustic] = useState(false);
  const [electric, setElectric] = useState(false);
  const [ukulele, setUkulele] = useState(false);

  const strings = useSelector(getStringsCount);
  const cardsStateSortType = useSelector(getSortType);
  const cardsStateSortOrder = useSelector(getSortOrder);
  const stringsCount = useSelector(getStringsCount);
  const filterTypeOfGuitar = useSelector(getFilterTypeOfGuitar);
  const filterTypeOfGuitarElectric = useSelector(getFilterTypeOfGuitarElectric);
  const filterTypeOfGuitarUkulele = useSelector(getFilterTypeOfGuitarUkulele);
  const minPrice = useSelector(getGuitarMinPrice);
  const maxPrice = useSelector(getGuitarMaxPrice);

  const history = useHistory();
  useEffect(() => {
    if(!acoustic && filterTypeOfGuitar === `${GuitarType.Acoustic}`){
      setAcoustic(!acoustic);
    }
    if(!electric && filterTypeOfGuitarElectric === `${GuitarType.Electric}`){
      setElectric(!electric);
    }
    if(!ukulele && filterTypeOfGuitarUkulele === `${GuitarType.Ukulele}`){
      setUkulele(!ukulele);
    }
  }, [acoustic, electric, filterTypeOfGuitar, filterTypeOfGuitarElectric, filterTypeOfGuitarUkulele, ukulele]);

  useEffect(() => {
    dispatchAction(loadCardsWithoutPagination(cardsStateSortType, cardsStateSortOrder, filterTypeOfGuitar, filterTypeOfGuitarElectric, filterTypeOfGuitarUkulele, stringsCount));
  }, [cardsStateSortOrder, cardsStateSortType, dispatchAction, filterTypeOfGuitar, filterTypeOfGuitarElectric, filterTypeOfGuitarUkulele, maxPrice, minPrice, stringsCount]);

  const onTypeClickHandler = (name: ChangeEvent<HTMLInputElement>) => {
    history.push(generatePath(`/catalog/page_${PaginationSite.First}`));

    if (name.currentTarget.name === `${GuitarType.Acoustic}`) {
      setAcoustic(!acoustic);
      if (acoustic) { dispatchAction(setFilterTypeOfGuitar('')); }
      else { dispatchAction(setFilterTypeOfGuitar(name.currentTarget.name)); }
    }
    if (name.currentTarget.name === `${GuitarType.Electric}`) {
      setElectric(!electric);
      if (electric) { dispatchAction(setFilterTypeGuitarElectric('')); }
      else { dispatchAction(setFilterTypeGuitarElectric(name.currentTarget.name)); }
    }
    if (name.currentTarget.name === `${GuitarType.Ukulele}`) {
      setUkulele(!ukulele);
      if (ukulele) { dispatchAction(setFilterTypeGuitarUkulele('')); }
      else { dispatchAction(setFilterTypeGuitarUkulele(name.currentTarget.name)); }
    }
  };

  const onChangeFilterPriceMinHandler = (item: React.FocusEvent<HTMLInputElement, Element>) => {
    if (Number(item.target.value) < minPrice && Number(item.target.value) !== 0) {
      item.target.value = String(minPrice);
      dispatchAction(setMinPrice(minPrice));
    }
  };

  const onChangeFilterPriceMaxHandler = (item: React.FocusEvent<HTMLInputElement, Element>) => {
    if (Number(item.target.value) > maxPrice) {
      item.target.value = String(maxPrice);
      dispatchAction(setMaxPrice(maxPrice));
    }
    dispatchAction(setMaxPrice(Number(item.target.value)));
  };

  const handleMinPriceKeyDown = (evt: React.KeyboardEvent<HTMLInputElement>) => {
    if(evt.key === Key.Enter) {
      if (Number(evt.currentTarget.value) < minPrice && Number(evt.currentTarget.value) !== 0) {
        evt.currentTarget.value = String(minPrice);
        dispatchAction(setMinPrice(minPrice));
      }
    }
  };

  const handleMaxPriceKeyDown = (evt: React.KeyboardEvent<HTMLInputElement>) => {
    if(evt.key === Key.Enter) {
      if (Number(evt.currentTarget.value) > maxPrice) {
        evt.currentTarget.value = String(maxPrice);
        dispatchAction(setMaxPrice(maxPrice));
      }
      dispatchAction(setMaxPrice(Number(evt.currentTarget.value)));
    }
  };

  return (
    <form className="catalog-filter">
      <h2 className="title title--bigger catalog-filter__title">Фильтр</h2>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Цена, ₽</legend>
        <div className="catalog-filter__price-range">
          <div className="form-input">
            <label className="visually-hidden">Минимальная цена</label>
            <input type="number" placeholder={String(minPrice)} id="priceMin" name="от" min={minPrice} onBlur={(event) => onChangeFilterPriceMinHandler(event)} onChange={(event) => dispatchAction(setMinPrice(Number(event.currentTarget.value)))} onKeyDown={(evt) => handleMinPriceKeyDown(evt)}/>
          </div>
          <div className="form-input">
            <label className="visually-hidden">Максимальная цена</label>
            <input type="number" placeholder={String(maxPrice)} id="priceMax" name="до" min={minPrice} style={{width: '6em'}} onBlur={(event)  => onChangeFilterPriceMaxHandler(event)} onChange={(event) => dispatchAction(setMaxPrice(Number(event.currentTarget.value)))} onKeyDown={(evt) => handleMaxPriceKeyDown(evt)}/>
          </div>
        </div>
      </fieldset>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Тип гитар</legend>
        <div className="form-checkbox catalog-filter__block-item">
          <input className="visually-hidden" type="checkbox" id="acoustic" name="acoustic" onChange={(event) => {dispatchAction(setDataLoading(false)); onTypeClickHandler(event);}} disabled={strings[StringIndex.FourStringsIndex] && !strings[StringIndex.SixStringsIndex] && !strings[StringIndex.SevenStringsIndex] && !strings[StringIndex.TwelveStringsIndex]} checked={filterTypeOfGuitar === GuitarType.Acoustic}/>
          <label htmlFor="acoustic">Акустические гитары</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input className="visually-hidden" type="checkbox" id="electric" name="electric" onChange={(event) => {dispatchAction(setDataLoading(false));onTypeClickHandler(event);}} disabled={!strings[StringIndex.FourStringsIndex] && !strings[StringIndex.SixStringsIndex] && !strings[StringIndex.SevenStringsIndex] && strings[StringIndex.TwelveStringsIndex]} data-testid="checkbox-electric" checked={filterTypeOfGuitarElectric === GuitarType.Electric}/>
          <label htmlFor="electric">Электрогитары</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input className="visually-hidden" type="checkbox" id="ukulele" name="ukulele" onChange={(event) => {dispatchAction(setDataLoading(false)); onTypeClickHandler(event);}} disabled={(strings[StringIndex.TwelveStringsIndex] || strings[StringIndex.SevenStringsIndex] || strings[StringIndex.SixStringsIndex]) && !strings[StringIndex.FourStringsIndex]} checked={filterTypeOfGuitarUkulele === GuitarType.Ukulele}/>
          <label htmlFor="ukulele">Укулеле</label>
        </div>
      </fieldset>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Количество струн</legend>
        <div className="form-checkbox catalog-filter__block-item">
          <input className="visually-hidden" type="checkbox" id="4-strings" value={StringCount.FourStrings} name="4-strings" disabled={filterTypeOfGuitar === GuitarType.Acoustic && filterTypeOfGuitarUkulele !== GuitarType.Ukulele && filterTypeOfGuitarElectric !== GuitarType.Electric} onChange={() => {dispatchAction(setDataLoading(false)); dispatchAction(setStringsCount([!strings[StringIndex.FourStringsIndex], strings[StringIndex.SixStringsIndex], strings[StringIndex.SevenStringsIndex], strings[StringIndex.TwelveStringsIndex]]));}} checked={strings[StringIndex.FourStringsIndex]}/>
          <label htmlFor="4-strings">4</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input className="visually-hidden" type="checkbox" id="6-strings" value={StringCount.SixStrings} name="6-strings" disabled={filterTypeOfGuitarUkulele === GuitarType.Ukulele && filterTypeOfGuitarElectric !== GuitarType.Electric && filterTypeOfGuitar !== GuitarType.Acoustic} onChange={() => {dispatchAction(setDataLoading(false)); dispatchAction(setStringsCount([strings[StringIndex.FourStringsIndex], !strings[StringIndex.SixStringsIndex], strings[StringIndex.SevenStringsIndex], strings[StringIndex.TwelveStringsIndex]]));}} checked={strings[StringIndex.SixStringsIndex]}/>
          <label htmlFor="6-strings">6</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input className="visually-hidden" type="checkbox" id="7-strings" value={StringCount.SevenStrings} name="7-strings" disabled={filterTypeOfGuitarUkulele === GuitarType.Ukulele && filterTypeOfGuitarElectric !== GuitarType.Electric && filterTypeOfGuitar !== GuitarType.Acoustic} onChange={() => {dispatchAction(setDataLoading(false)); dispatchAction(setStringsCount([strings[StringIndex.FourStringsIndex], strings[StringIndex.SixStringsIndex], !strings[StringIndex.SevenStringsIndex], strings[StringIndex.TwelveStringsIndex]]));}} checked={strings[StringIndex.SevenStringsIndex]}/>
          <label htmlFor="7-strings">7</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input className="visually-hidden" type="checkbox" id="12-strings" value={StringCount.TwelveStrings} name="12-strings" disabled={(filterTypeOfGuitarUkulele === GuitarType.Ukulele || filterTypeOfGuitarElectric === GuitarType.Electric) && filterTypeOfGuitar !== GuitarType.Acoustic} onChange={() => {dispatchAction(setDataLoading(false)); dispatchAction(setStringsCount([strings[StringIndex.FourStringsIndex], strings[StringIndex.SixStringsIndex], strings[StringIndex.SevenStringsIndex], !strings[StringIndex.TwelveStringsIndex]]));}} checked={strings[StringIndex.TwelveStringsIndex]}/>
          <label htmlFor="12-strings">12</label>
        </div>
      </fieldset>
    </form>
  );
}
export default CatalogFilter;


