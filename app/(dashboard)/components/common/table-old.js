"use client"
import {Card, Table as BTable} from "reactstrap";
import {FiSearch} from "react-icons/fi";
import Pagination from "./pagination";
import {useActionConfirm} from "../../helpers/hooks";
import {FaEye, FaPencilAlt, FaTrashAlt, FaTrashRestore} from "react-icons/fa";
import {useState} from "react";
import {Loader} from "./preloader";

const Table = ({
                   title,
                   columns,
                   data,
                   pagination,
                   action,
                   actions,
                   onView,
                   onReload,
                   loading,
                   onEdit,
                   onDelete,
                   onPermanentDelete,
                   onRestore,
                   indexed,
                   noActions,
                   formatter,
                   checkbox,
                   checkboxActions
               }) => {


    let docs = pagination ? data?.data : data
    if (!Array.isArray(docs)) {
        docs = []
    }
    if (!!formatter) {
        docs = docs.map(formatter)
    }

    const [checked, setChecked] = useState([])
    const clearChecked = () => setChecked([])


    let cols = noActions ? columns : [...columns, {
        text: 'Action',
        dataField: 'no_actions',
        style: {width: 200, textAlign: 'right'},
        formatter: (noActions, data) => {
            return (
                <div className="flex justify-end flex-wrap">
                    {actions && actions(data)}
                    {onView && (
                        <button className="btn btn-outline-success btn-sm focus:shadow-none me-2"
                                title="View" onClick={() => onView(data)}>
                            <FaEye/>
                        </button>
                    )}
                    {onEdit && (
                        <button
                            disabled={data?.disabledEdit}
                            className="btn btn-outline-primary btn-sm focus:shadow-none me-2"
                            title="Edit" onClick={() => onEdit(data)}>
                            <FaPencilAlt/>
                        </button>
                    )}
                    {onDelete && (
                        <button
                            disabled={data?.disabledDelete}
                            className="btn btn-outline-danger btn-sm focus:shadow-none me-2"
                            title="Delete" onClick={async () => {
                                 // eslint-disable-next-line react-hooks/rules-of-hooks
                            await useActionConfirm(
                                onDelete,
                                {ids: [data.id]},
                                onReload, 'Are you sure you want to delete this item?', 'Yes, Delete')
                        }}>
                            <FaTrashAlt/>
                        </button>
                    )}
                    {onRestore && (
                        <button className="btn btn-outline-primary btn-sm focus:shadow-none me-2"
                                title="Restore" onClick={async () => {
                                     // eslint-disable-next-line react-hooks/rules-of-hooks
                            await useActionConfirm(
                                onRestore,
                                {ids: [data.id]},
                                onReload, 'Are you sure you want to restore this item?', 'Yes, Restore')
                        }}>
                            <FaTrashRestore/>
                        </button>
                    )}
                    {onPermanentDelete && (
                        <button className="btn btn-outline-danger btn-sm focus:shadow-none me-2"
                                title="Permanent Delete" onClick={async () => {
                                     // eslint-disable-next-line react-hooks/rules-of-hooks
                            await useActionConfirm(
                                onPermanentDelete,
                                {ids: [data.id]},
                                onReload, 'Are you sure you want to permanently delete this item? It can\'t be restored', 'Yes, Permanently Delete')
                        }}>
                            <FaTrashAlt/>
                        </button>
                    )}
                </div>
            )
        }
    }]

    return (
        <Card>
            <div className="table-head">
                <div className="d-flex flex-wrap justify-content-between">
                    {title ? (
                        <div className="title p-0 border-0 mb-2.5">{title}</div>
                    ) : (
                        <div className="position-relative mb-2.5">
                            <input className="form-control form-control-sm rounded-1 mb-0"
                                   placeholder="Search"
                                   onChange={(e) => {
                                       onReload && onReload({search: e.target.value})
                                   }}
                                   style={{width: 220, paddingLeft: 30}}/>
                            <FiSearch className="position-absolute" color="#6B7280" style={{top: 10, left: 10}}/>
                        </div>
                    )}

                    <div className="d-flex mb-2.5 align-items-center">
                        {action}
                    </div>
                </div>
            </div>
            <div className="table-body">
                <div className="table-responsive">
                    <BTable className="table mb-0">
                        <thead>
                        <tr>
                            {checkbox && (
                                <th>
                                    <input
                                        className="form-check"
                                        checked={docs.length === checked.length && checked.length > 0}
                                        onChange={e => {
                                            if (e.target.checked) {
                                                setChecked(docs.map(d => d.id))
                                            } else {
                                                setChecked([])
                                            }
                                        }}
                                        type="checkbox"/>
                                </th>
                            )}
                            {indexed && <th>#</th>}
                            {cols?.map((column, index) => (
                                <th key={index} style={column.style}>
                                    {column.text}
                                </th>
                            ))}
                        </tr>
                        </thead>
                        <tbody>
                        {loading ? (
                            <></>
                        ) : (
                            <>
                                {docs?.map((doc, index) => (
                                    <tr key={index}>
                                        {checkbox && (
                                            <td>
                                                <input
                                                    type="checkbox"
                                                    className="form-check"
                                                    checked={checked.includes(doc.id)} onChange={e => {
                                                    if (e.target.checked) {
                                                        setChecked([...checked, doc.id])
                                                    } else {
                                                        setChecked(checked.filter(id => id !== doc.id))
                                                    }
                                                }}/>
                                            </td>
                                        )}
                                        {indexed &&
                                            <td>{(((data?.current_page || 1) - 1) * (data?.per_page || 10)) + (index + 1)}</td>}
                                        {cols?.map((column, index) => (
                                            <td key={index} style={column.style}>
                                                {(column?.formatter ? column.formatter(doc[column?.dataIndex], doc) : doc[column?.dataIndex]) || '-'}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </>
                        )}
                        </tbody>
                    </BTable>
                    {loading && (
                        <div style={{height: 200}}>
                            <Loader/>
                        </div>
                    )}
                </div>
                <div className={`checkbox-actions ${checked?.length > 0 ? 'show' : ''}`}>
                    {!!checkboxActions && checkboxActions(checked, clearChecked)}
                </div>
                {pagination && (
                    <div className="mt-3">
                        <Pagination
                            page={data?.current_page || 1}
                            total={data?.total || 0}
                            totalPages={data?.last_page || 1}
                            limit={data?.per_page || 10}
                            onPageChange={page => onReload && onReload({page})}
                            onSizeChange={per_page => onReload && onReload({per_page})}/>
                    </div>
                )}
            </div>
        </Card>
    )
}

export default Table


export const DetailTable = ({data, columns, title, actions}) => {
    return (
        <Card>
            {!!title && <div className="title">{title}</div>}
            <div className="body">
                <div className="table-responsive">
                    <BTable className="table mb-0">
                        <tbody>
                        {columns?.map((column, index) => (
                            <tr key={index}>
                                <td>{column.text}</td>
                                <td>{!!data ? !!column?.formatter ? column?.formatter(data[column.dataIndex], data) : data[column.dataIndex] : ''}</td>
                            </tr>
                        ))}
                        </tbody>
                    </BTable>
                </div>
                {actions}
            </div>
        </Card>
    )
}