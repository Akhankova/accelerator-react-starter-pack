import { useDispatch } from 'react-redux';
import { setPaginationSite } from '../../store/action';
import { getCardTotalCount, getPaginationSite } from '../../store/cards-data/selectors';
import { useSelector } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';

function Pagination(): JSX.Element {
  const dispatchAction = useDispatch();
  const paginationSiteState = useSelector(getPaginationSite);
  const cardTotalCount = Number(useSelector(getCardTotalCount));

  const pages = (Number(cardTotalCount) / 9 + 1);
  const pagesArray = [];
  for (let i = 1; i < pages; i++) {
    pagesArray.push(i);
  }

  return (
    <div className="pagination page-content__pagination">
      <ul className="pagination__list">
        {paginationSiteState !== Number(1) ?
          <li className="pagination__page pagination__page--prev" id="prev" onClick={() => dispatchAction(setPaginationSite(paginationSiteState - 1))}><a className="link pagination__page-link">Назад</a>
          </li> : ' '}
        {pagesArray?.map((page) => (
          <li className={`pagination__page ${paginationSiteState === page ? 'pagination__page--active' : ''}`} key={page} value={page} onClick={() => dispatchAction(setPaginationSite(page))}><a className="link pagination__page-link">{page}</a>
          </li>
        ))}
        {paginationSiteState !== Number(3) && cardTotalCount > 9 ?
          <li className="pagination__page pagination__page--next" id="next" value={-1} onClick={() => dispatchAction(setPaginationSite(paginationSiteState + 1))}><a className="link pagination__page-link" href="#2">Далее</a>
          </li> : ''}
      </ul>
    </div>
  );
}
export default Pagination;


