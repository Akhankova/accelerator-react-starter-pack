import { useDispatch } from 'react-redux';
import { setDataLoading, setPaginationSite } from '../../store/action';
import { getCardTotalCount, getPaginationSite } from '../../store/cards-data/selectors';
import { useSelector } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import { MIN_LENGTH, MAX_LENGTH, PAGE_NUMBER_FIRST, COUNT_CARDS_MAX, PAGINATION_VALUE_MIN, STEP_PAGINATION} from '../../const';
import { Link, useHistory, useParams } from 'react-router-dom';
import { useEffect } from 'react';

function Pagination(): JSX.Element {
  const paginationSiteState = useSelector(getPaginationSite);
  const cardTotalCount = Number(useSelector(getCardTotalCount));
  const dispatchAction = useDispatch();
  const pageCount = (Number(cardTotalCount) / COUNT_CARDS_MAX + MIN_LENGTH);
  const pagesArray = [];
  const history = useHistory();
  const numberOfPage = useParams<{id?: string}>().id;

  for (let i = MIN_LENGTH; i < pageCount; i++) {
    pagesArray.push(i);
  }

  useEffect(() => {
    if (Number(numberOfPage) > pagesArray.length) {
      history.push('/catalog/page_1');
    }
    if (numberOfPage === undefined) {
      dispatchAction(setPaginationSite(Number(paginationSiteState)));
    }
    if (Number(numberOfPage) !== paginationSiteState && numberOfPage !==undefined) {
      dispatchAction(setPaginationSite(Number(numberOfPage)));
    }

  }, [dispatchAction, history, numberOfPage, pagesArray.length, paginationSiteState]);

  return (
    <div className="pagination page-content__pagination">
      <ul className="pagination__list">
        {paginationSiteState !== Number(PAGE_NUMBER_FIRST) && pagesArray.length > MIN_LENGTH ?
          <li className="pagination__page pagination__page--prev" id="prev" onClick={() => {dispatchAction(setDataLoading(false)); dispatchAction(setPaginationSite(paginationSiteState - PAGINATION_VALUE_MIN));}}><Link className="link pagination__page-link" to={`/catalog/page_${paginationSiteState-PAGINATION_VALUE_MIN}`} href={`${paginationSiteState-STEP_PAGINATION}`}>Назад</Link>
          </li> : ' '}
        {pagesArray?.map((page) => (
          <li className={`pagination__page ${paginationSiteState === page ? 'pagination__page--active' : ''}`} key={page} value={page} onClick={() => {dispatchAction(setDataLoading(false));dispatchAction(setPaginationSite(page));}}>
            <Link className="link pagination__page-link" to={`/catalog/page_${page}`} href={`${page}`}>{page}</Link>
          </li>
        ))}
        {paginationSiteState !== pagesArray.length && cardTotalCount > MAX_LENGTH ?
          <li className="pagination__page pagination__page--next" id="next" value={PAGINATION_VALUE_MIN } onClick={() => {dispatchAction(setDataLoading(false)); dispatchAction(setPaginationSite(paginationSiteState + PAGINATION_VALUE_MIN));}}><Link className="link pagination__page-link" to={`/catalog/page_${paginationSiteState + STEP_PAGINATION}`} href={`${paginationSiteState+PAGINATION_VALUE_MIN}`}>Далее</Link>
          </li> : ''}
      </ul>
    </div>
  );
}
export default Pagination;


