import React from 'react'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import ReactPaginate from 'react-paginate'

const Pagination2 = ({ page, total, limit, totalPages, onPageChange, onSizeChange }) => {
    const theme = 'main'
  return (
    <div className="flex flex-wrap justify-between mb-2">
    <ReactPaginate
        breakLabel="..."
        previousLabel={<FiChevronLeft />}
        disabledLinkClassName="text-white"
        previousLinkClassName={`text-sm dark:text-white hover:text-Primary_Color font-semibold h-10 flex items-center justify-center w-10 rounded-l`}
        nextLinkClassName={`text-sm dark:text-white hover:text-Primary_Color font-semibold h-10 flex items-center justify-center w-10 rounded-l`}
        pageLinkClassName={`text-sm border border-Primary_Color mx-1 dark:text-white hover:bg-Primary_Color hover:text-white duration-300 font-semibold h-10 w-10 flex justify-center items-center`}
        pageClassName="!mb-3 md:!mb-0"
        activeLinkClassName={`bg-Primary_Color !text-white`}
        nextLabel={<FiChevronRight />}
        className="flex flex-wrap"
        onPageChange={({ selected }) => onPageChange(selected + 1)}
        pageRangeDisplayed={3}
        pageCount={totalPages || 1}
        renderOnZeroPageCount={null}
    />
</div>
  )
}

export default Pagination2