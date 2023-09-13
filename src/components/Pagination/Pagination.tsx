import { next, prev } from "../../redux/Slices/PaginationSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

import "./Pagination.scss";

const Pagination = () => {
  const page = useAppSelector((state) => state.pagination.page);
  const pageCount = useAppSelector((state) => state.laptop.pageCount);
  const dispatch = useAppDispatch();

  return (
    <div className="pagination">
      <button
        className={page === 1 ? "pag-button-disabled" : ""}
        disabled={page === 1}
        onClick={() => dispatch(prev())}
      >
        ⇐
      </button>

      <div className="pagination__current">{page}</div>
      <button
        className={page === pageCount ? "pag-button-disabled" : ""}
        disabled={page === pageCount}
        onClick={() => dispatch(next())}
      >
        ⇒
      </button>
    </div>
  );
};

export default Pagination;
