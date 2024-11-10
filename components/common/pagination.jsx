import React from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import ReactPaginate from "react-paginate";

const Pagination = ({ page, total, limit, totalPages, onPageChange, onSizeChange }) => {
    return (
        <div className="flex flex-wrap justify-between mb-2">
            <div className="flex items-center">
                {onSizeChange && (
                    <div className="flex items-center mr-3 text-sm  h-[24px] ">
                        Show
                        <select value={limit} onChange={(e) => {
                            onSizeChange(+e.target.value)
                        }} className="h-[24px] px-1 rounded mx-2 text-center focus:outline-0">
                            <option value={12}>12</option>
                            <option value={25}>25</option>
                            <option value={50}>50</option>
                            <option value={100}>100</option>
                        </select>
                    </div>
                )}
                <p className="!mb-3 md:!mb-0 text-sm ">
                    Showing {((page - 1) * limit) + 1 || 0}
                    &nbsp;to {Math.min(total || 0, (page * limit) || 0)} of {total || 0} entries
                </p>
            </div>

            <ReactPaginate
                breakLabel="..."
                previousLabel={<FiChevronLeft className='!text-Primary_Color' />}
                disabledLinkClassName="text-white"
                previousLinkClassName={`text-sm dark:text-white hover:text-Primary_Color font-semibold h-10 flex items-center justify-center w-10 rounded-l`}
                nextLinkClassName={`text-sm !text-white hover:text-Primary_Color font-semibold h-10 flex items-center justify-center w-10 rounded-l`}
                pageLinkClassName={`text-sm border border-Primary_Color mx-1 text-Primary_Color hover:bg-Primary_Color hover:text-white duration-300 font-semibold h-10 w-10 flex justify-center items-center`}
                pageClassName="!mb-3 md:!mb-0"
                activeLinkClassName={`bg-Primary_Color !text-white`}
                nextLabel={<FiChevronRight className='!text-Primary_Color' />}
                className="flex flex-wrap"
                onPageChange={({ selected }) => onPageChange(selected + 1)}
                pageRangeDisplayed={3}
                pageCount={totalPages || 1}
                renderOnZeroPageCount={null}
            />
        </div>
    )
}

export default Pagination;