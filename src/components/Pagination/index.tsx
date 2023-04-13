import ReactPaginate from 'react-paginate';

import styles from './Pagination.module.scss';

type PaginationProps = {
    value: number;
    onChangePage: (event: number) => void;
};

const Pagination = ({value, onChangePage}: PaginationProps) => {
    return (
        <ReactPaginate
            className={styles.pagination}
            breakLabel="..."
            previousLabel="<"
            nextLabel=">"
            onPageChange={event => onChangePage(event.selected + 1)}
            pageRangeDisplayed={4}
            pageCount={1}
            forcePage={value - 1}
        />
    );
};

export default Pagination;