import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { setNotFound } from '../../store/action';

function NotFound(): JSX.Element {
  const dispatchAction = useDispatch();
  return (
    <section className="game__screen">
      <h1>
        404. Page not found
      </h1>
      <Link to="/" onClick={()=> dispatchAction(setNotFound(0))}>Вернуться на главную</Link>
    </section>
  );
}
export default NotFound;
