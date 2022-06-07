import { useDispatch } from 'react-redux';
import { generatePath, Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { setCardLoading, setFilterTypeGuitarElectric, setFilterTypeGuitarUkulele, setFilterTypeOfGuitar, setStringsCount } from '../../store/action';

function Breadcrumbs(): JSX.Element {
  const dispatchAction = useDispatch();

  const handleShowHomepage = () => {
    dispatchAction(setCardLoading(false));
    dispatchAction(setFilterTypeGuitarElectric(''));
    dispatchAction(setFilterTypeGuitarUkulele(''));
    dispatchAction(setFilterTypeOfGuitar(''));
    dispatchAction(setStringsCount([false, false, false, false]));
  };

  return (
    <ul className="breadcrumbs page-content__breadcrumbs">
      <li className="breadcrumbs__item"><Link className="link" to={generatePath(AppRoute.Main)} onClick={handleShowHomepage}>Главная</Link>
      </li>
      <li className="breadcrumbs__item"><Link className="link" to={generatePath(AppRoute.Main)}>Каталог</Link>
      </li>
    </ul>
  );
}
export default Breadcrumbs;
