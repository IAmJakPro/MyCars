import { usePagination, DOTS } from './usePagination';
import styles from './Pagination.module.scss';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
const Pagination = (props) => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
    className,
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  console.log(paginationRange);

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];
  return (
    <div className="flex-center-x">
      <ul className={`${styles['pagination-container']} ${className}`}>
        <li
          className={styles['pagination-item']}
          disabled={currentPage === 1}
          onClick={onPrevious}
        >
          <div className={`${styles.arrow} ${styles.left}`} />
        </li>
        {paginationRange.map((pageNumber) => {
          if (pageNumber === DOTS) {
            return <li className="pagination-item dots">&#8230;</li>;
          }

          return (
            <li
              className={`${styles['pagination-item']} ${
                pageNumber === currentPage && styles.selected
              }`}
              onClick={() => onPageChange(pageNumber)}
            >
              {pageNumber}
            </li>
          );
        })}
        <li
          className={styles['pagination-item']}
          disabled={currentPage === lastPage}
          onClick={onNext}
        >
          <div className={`${styles.arrow} ${styles.right}`} />
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
