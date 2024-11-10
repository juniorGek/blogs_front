import ReactPaginate from "react-paginate";

const Pagination = ({page, total, size, totalPages, onPageChange, onSizeChange, showLeftTab = true}) => {
    return (
        <div className="pagination-tab">
            <div className="left-tab" style={{display: showLeftTab ? 'flex': 'none'}}>
                {onSizeChange && (
                    <>
                        <span>Show</span>
                        <div className="px-2">
                            <select value={size} onChange={(e) => {
                                onSizeChange(+e.target.value)
                            }} className="form-control">
                                <option value={10}>10</option>
                                <option value={25}>25</option>
                                <option value={50}>50</option>
                                <option value={100}>100</option>
                            </select>
                        </div>
                    </>

                )}
                <span>
                    Showing {((page - 1) * size) + 1 || 0}
                    &nbsp;to {Math.min(total || 0, (page * size) || 0)} of {total || 0} entries
                </span>
            </div>

            <ReactPaginate
                breakLabel="..."
                previousLabel={"Previous"}
                previousClassName="page-item"
                nextClassName="page-item"
                disabledLinkClassName="disabled"
                previousLinkClassName="page-link"
                nextLinkClassName="page-link"
                pageLinkClassName="page-link"
                pageClassName="page-item"
                activeLinkClassName="active"
                nextLabel={"Next"}
                className="pagination"
                onPageChange={({selected}) => onPageChange(selected + 1)}
                pageRangeDisplayed={3}
                pageCount={totalPages || 1}
                renderOnZeroPageCount={null}
            />
        </div>
    )
}
export default Pagination