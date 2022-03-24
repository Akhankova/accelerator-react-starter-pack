import {setFilterTypeGuitarElectric, setFilterTypeGuitarUkulele, setFilterTypeOfGuitar, setMaxPrice, setMinPrice, setStringsCount} from '../../store/action';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { getCards, getStringsCount } from '../../store/cards-data/selectors';

function CatalogFilter(): JSX.Element {
  const dispatchAction = useDispatch();
  const [acoustic, setAcoustic] = useState(false);
  const [electric, setElectric] = useState(false);
  const [ukulele, setUkulele] = useState(false);
  const cardsState = useSelector(getCards);
  const strings = useSelector(getStringsCount);
  const prices: number[] = [];
  cardsState.forEach((element) => {
    prices.push(element.price);
  });

  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);

  const onTypeClickHandler = (name:any) => {

    if (name.target.name === 'acoustic') {
      setAcoustic(!acoustic);
      if (acoustic) {dispatchAction(setFilterTypeOfGuitar(''));}
      else {dispatchAction(setFilterTypeOfGuitar(name.target.name));}
    }
    if (name.target.name === 'electric') {
      setElectric(!electric);
      if (electric) {dispatchAction(setFilterTypeGuitarElectric(''));}
      else {dispatchAction(setFilterTypeGuitarElectric(name.target.name));}
    }
    if (name.target.name === 'ukulele') {
      setUkulele(!ukulele);
      if (ukulele) {dispatchAction(setFilterTypeGuitarUkulele(''));}
      else {dispatchAction(setFilterTypeGuitarUkulele(name.target.name));}
    }
  };

  const onChangeFilterPriceMinHandler = (item:any) => {
    if (item.target.value < minPrice) {
      item.target.value = minPrice;
      dispatchAction(setMinPrice(minPrice));
    }
    dispatchAction(setMinPrice(item.target.value));
  };

  const onChangeFilterPriceMaxHandler = (item:any) => {
    if (item.target.value > maxPrice) {
      item.target.value = maxPrice;
      dispatchAction(setMaxPrice(maxPrice));
    }
    dispatchAction(setMaxPrice(item.target.value));
  };

  const onGuitarStringsFourClickHandler = (item:any) => {
    dispatchAction(setStringsCount([!strings[0], strings[1], strings[2], strings[3]]));
  };

  const onGuitarStringsSixClickHandler = (item:any) => {
    dispatchAction(setStringsCount([strings[0], !strings[1], strings[2], strings[3]]));
  };

  const onGuitarStringsSevenClickHandler = (item:any) => {
    dispatchAction(setStringsCount([strings[0], strings[1], !strings[2], strings[3]]));
  };

  const onGuitarStringsTelveClickHandler = (item:any) => {
    dispatchAction(setStringsCount([strings[0], strings[1], strings[2], !strings[3]]));
  };
  return (
    <form className="catalog-filter">
      <h2 className="title title--bigger catalog-filter__title">Фильтр</h2>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Цена, ₽</legend>
        <div className="catalog-filter__price-range">
          <div className="form-input">
            <label className="visually-hidden">Минимальная цена</label>
            <input type="number" placeholder={String(minPrice)} id="priceMin" name="от" min={minPrice} onBlur={(event) => onChangeFilterPriceMinHandler(event)}/>
          </div>
          <div className="form-input">
            <label className="visually-hidden">Максимальная цена</label>
            <input type="number" placeholder={String(maxPrice)} id="priceMax" name="до" min={minPrice} onBlur={(event) => onChangeFilterPriceMaxHandler(event)}/>
          </div>
        </div>
      </fieldset>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Тип гитар</legend>
        <div className="form-checkbox catalog-filter__block-item">
          <input className="visually-hidden" type="checkbox" id="acoustic" name="acoustic" onClick={(event) => onTypeClickHandler(event)}/>
          <label htmlFor="acoustic">Акустические гитары</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input className="visually-hidden" type="checkbox" id="electric" name="electric" onClick={(event) => onTypeClickHandler(event)}/>
          <label htmlFor="electric">Электрогитары</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input className="visually-hidden" type="checkbox" id="ukulele" name="ukulele" onClick={(event) => onTypeClickHandler(event)}/>
          <label htmlFor="ukulele">Укулеле</label>
        </div>
      </fieldset>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Количество струн</legend>
        <div className="form-checkbox catalog-filter__block-item">
          <input className="visually-hidden" type="checkbox" id="4-strings" value={4} name="4-strings" disabled={!!acoustic && !ukulele && !electric} onClick={(event) => onGuitarStringsFourClickHandler(event)}/>
          <label htmlFor="4-strings">4</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input className="visually-hidden" type="checkbox" id="6-strings" value={6} name="6-strings" disabled={!!ukulele && !electric && !acoustic} onClick={(event) => onGuitarStringsSixClickHandler(event)}/>
          <label htmlFor="6-strings">6</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input className="visually-hidden" type="checkbox" id="7-strings" value={7} name="7-strings" disabled={!!ukulele && !electric && !acoustic} onClick={(event) => onGuitarStringsSevenClickHandler(event)}/>
          <label htmlFor="7-strings">7</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input className="visually-hidden" type="checkbox" id="12-strings" value={12} name="12-strings" disabled={(!!ukulele || !!electric) && !acoustic} onClick={(event) => onGuitarStringsTelveClickHandler(event)}/>
          <label htmlFor="12-strings">12</label>
        </div>
      </fieldset>
    </form>
  );
}
export default CatalogFilter;

