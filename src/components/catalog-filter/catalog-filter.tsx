import { setFilterTypeGuitarElectric, setFilterTypeGuitarUkulele, setFilterTypeOfGuitar, setMaxPrice, setMinPrice, setStringsCount } from '../../store/action';
import { useDispatch } from 'react-redux';
import {  useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getFilterTypeOfGuitar, getFilterTypeOfGuitarElectric, getFilterTypeOfGuitarUkulele, getGuitarMaxPrice, getGuitarMinPrice, getStringsCount } from '../../store/filters-data/selectors';
import 'react-toastify/dist/ReactToastify.css';
import { getSortOrder, getSortType } from '../../store/sort-data/selectors';
import { GuitarType, PaginationSite, StringCount, StringIndex } from '../../const';
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
    dispatchAction(loadCardsWithoutPagination(cardsStateSortType, cardsStateSortOrder, filterTypeOfGuitar, filterTypeOfGuitarElectric, filterTypeOfGuitarUkulele, stringsCount));
  }, [cardsStateSortOrder, cardsStateSortType, dispatchAction, filterTypeOfGuitar, filterTypeOfGuitarElectric, filterTypeOfGuitarUkulele, maxPrice, minPrice, stringsCount]);

  const onTypeClickHandler = (name: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    history.push(generatePath(`/catalog/page_${PaginationSite.FIRST}`));

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
    if (item.target.value > String(maxPrice)) {
      item.target.value = String(maxPrice);
      dispatchAction(setMaxPrice(maxPrice));
    }
    dispatchAction(setMaxPrice(Number(item.target.value)));
  };

  return (
    <form className="catalog-filter">
      <h2 className="title title--bigger catalog-filter__title">Фильтр</h2>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Цена, ₽</legend>
        <div className="catalog-filter__price-range">
          <div className="form-input">
            <label className="visually-hidden">Минимальная цена</label>
            <input type="number" placeholder={String(minPrice)} id="priceMin" name="от" min={minPrice} onBlur={(event) => onChangeFilterPriceMinHandler(event)} onChange={(event) => dispatchAction(setMinPrice(Number(event.currentTarget.value)))}/>
          </div>
          <div className="form-input">
            <label className="visually-hidden">Максимальная цена</label>
            <input type="number" placeholder={String(maxPrice)} id="priceMax" name="до" min={minPrice} onBlur={(event) => onChangeFilterPriceMaxHandler(event)} onChange={(event) => dispatchAction(setMaxPrice(Number(event.currentTarget.value)))}/>
          </div>
        </div>
      </fieldset>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Тип гитар</legend>
        <div className="form-checkbox catalog-filter__block-item">
          <input className="visually-hidden" type="checkbox" id="acoustic" name="acoustic" onClick={(event) => onTypeClickHandler(event)} disabled={strings[StringIndex.FOUR_STRINGS_INDEX]}/>
          <label htmlFor="acoustic">Акустические гитары</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input className="visually-hidden" type="checkbox" id="electric" name="electric" onClick={(event) => onTypeClickHandler(event)} disabled={strings[StringIndex.TWELVE_STRINGS_INDEX]} data-testid="checkbox-electric"/>
          <label htmlFor="electric">Электрогитары</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input className="visually-hidden" type="checkbox" id="ukulele" name="ukulele" onClick={(event) => onTypeClickHandler(event)} disabled={strings[StringIndex.TWELVE_STRINGS_INDEX] || strings[StringIndex.SEVEN_STRINGS_INDEX] || strings[StringIndex.SIX_STRINGS_INDEX]}/>
          <label htmlFor="ukulele">Укулеле</label>
        </div>
      </fieldset>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Количество струн</legend>
        <div className="form-checkbox catalog-filter__block-item">
          <input className="visually-hidden" type="checkbox" id="4-strings" value={StringCount.FOUR_STRINGS} name="4-strings" disabled={!!acoustic && !ukulele && !electric} onClick={() => dispatchAction(setStringsCount([!strings[StringIndex.FOUR_STRINGS_INDEX], strings[StringIndex.SIX_STRINGS_INDEX], strings[StringIndex.SEVEN_STRINGS_INDEX], strings[StringIndex.TWELVE_STRINGS_INDEX]]))} />
          <label htmlFor="4-strings">4</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input className="visually-hidden" type="checkbox" id="6-strings" value={StringCount.SIX_STRINGS} name="6-strings" disabled={!!ukulele && !electric && !acoustic} onClick={() => dispatchAction(setStringsCount([strings[StringIndex.FOUR_STRINGS_INDEX], !strings[StringIndex.SIX_STRINGS_INDEX], strings[StringIndex.SEVEN_STRINGS_INDEX], strings[StringIndex.TWELVE_STRINGS_INDEX]]))} />
          <label htmlFor="6-strings">6</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input className="visually-hidden" type="checkbox" id="7-strings" value={StringCount.SEVEN_STRINGS} name="7-strings" disabled={!!ukulele && !electric && !acoustic} onClick={() => dispatchAction(setStringsCount([strings[StringIndex.FOUR_STRINGS_INDEX], strings[StringIndex.SIX_STRINGS_INDEX], !strings[StringIndex.SEVEN_STRINGS_INDEX], strings[StringIndex.TWELVE_STRINGS_INDEX]]))} />
          <label htmlFor="7-strings">7</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input className="visually-hidden" type="checkbox" id="12-strings" value={StringCount.TWELVE_STRINGS} name="12-strings" disabled={(!!ukulele || !!electric) && !acoustic} onClick={() => dispatchAction(setStringsCount([strings[StringIndex.FOUR_STRINGS_INDEX], strings[StringIndex.SIX_STRINGS_INDEX], strings[StringIndex.SEVEN_STRINGS_INDEX], !strings[StringIndex.TWELVE_STRINGS_INDEX]]))} />
          <label htmlFor="12-strings">12</label>
        </div>
      </fieldset>
    </form>
  );
}
export default CatalogFilter;


