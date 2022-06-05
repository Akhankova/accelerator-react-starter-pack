import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { NOT_FOUND_STARUS } from '../../const';
import { setNotFound } from '../../store/action';

function NotFound(): JSX.Element {
  const dispatchAction = useDispatch();

  return (
    <section className="game__screen" data-testid="not">
      <h1>
        404. Page not found
      </h1>
      <Link to="/" onClick={()=> {dispatchAction(setNotFound(NOT_FOUND_STARUS));}}>Вернуться на главную</Link>
    </section>
  );
}
export default NotFound;
