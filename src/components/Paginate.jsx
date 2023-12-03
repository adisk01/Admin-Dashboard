import React from 'react';
import ReactPaginate from 'react-paginate';

const PaginationComponent = ({ pageCount, handlePageClick }) => {
  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel="next >"
      onPageChange={handlePageClick}
      pageRangeDisplayed={5}
      pageCount={pageCount}
      previousLabel="< previous"
      renderOnZeroPageCount={null}
      containerClassName='pagination'
      pageLinkClassName='page-num'
      previousLinkClassName='page-num'
      nextLinkClassName='page-num'
      activeLinkClassName='active'
    />
  );
};

export default PaginationComponent;
