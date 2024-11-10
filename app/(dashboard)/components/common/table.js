import { FaEye, FaPencilAlt, FaTimes, FaTrashAlt } from 'react-icons/fa';
import { useActionConfirm } from '@/helpers/hooks';
import ReactPaginate from 'react-paginate';
import { Modal } from 'antd';
import { useState } from 'react';
import { Loader } from './preloader';
import { useUserContext } from '@/context/user';
// import { havePermission } from '../../layouts/admin';
// import { useI18n } from '../../contexts/i18n';
import Pagination from './pagination';
import SearchInput from '../forms/search';
import { havePermission } from '../../(admin)/admin/layout';
import { useI18n } from '@/context/i18n';
import UserContext from '@/context/user';

const Table = ({
    columns,
    data,
    indexed,
    loading = false,
    noActions,
    actions,
    action,
    onView,
    onEdit,
    onDelete,
    onReload,
    pagination = false,
    shadow = true,
    title,
    permission,
    noHeader = false,
    afterSearch,
    onSearchChange,
}) => {
    const i18n = useI18n();
    const { user } = useUserContext();

    const checkPermissions = (name) => {
        if (permission) {
            return havePermission(name, user?.roles);
        }
        return true;
    };

    let cols = noActions
        ? columns
        : [
            ...columns,
            {
                text: 'Action',
                dataField: 'no_actions',
                className: 'w-44 text-right',
                formatter: (noActions, data) => {
                    return (
                        <div className='flex justify-end'>
                            {actions && actions(data)}
                            {onView && (
                                <button
                                    className='mr-2 rounded border border-green-500 p-1.5 text-green-500 hover:bg-green-500 hover:text-white'
                                    title='View'
                                    onClick={() => onView(data)}
                                >
                                    <FaEye />
                                </button>
                            )}
                            {data.disableEdit === 1 &&
                                !onView &&
                                data.disableDelete === 1 &&
                                !actions &&
                                '-'}
                            {onEdit &&
                                (checkPermissions(permission + '_edit') || user?.role === 'admin') &&
                                data?.disableEdit !== 1 && (
                                    <button
                                        className='mr-2 rounded border border-blue-500 p-1.5 text-blue-500 hover:bg-blue-500 hover:text-white'
                                        title='Edit'
                                        onClick={() => onEdit(data)}
                                    >
                                        <FaPencilAlt />
                                    </button>
                                )}
                            {onDelete && (checkPermissions(permission + '_delete') || user?.role === 'admin') && (
                                <button
                                    className='mr-2 rounded border border-red-500 p-1.5 text-red-500 hover:bg-red-500 hover:text-white disabled:cursor-not-allowed disabled:opacity-20'
                                    title='Delete'
                                    disabled={data?.disableDelete === 1}
                                    onClick={async () => {
                                        // eslint-disable-next-line react-hooks/rules-of-hooks
                                        await useActionConfirm(
                                            onDelete,
                                            { _id: data._id },
                                            onReload,
                                            'Are you sure you want to delete this item?',
                                            'Yes, Delete'
                                        );
                                    }}
                                >
                                    <FaTrashAlt />
                                </button>
                            )}
                        </div>
                    );
                },
            },
        ];

    return (
        <>
            <div className={`w-full bg-white ${shadow ? 'shadow-lg' : ''} mb-4 rounded-sm`}>
                {noHeader || (
                    <header className='flex flex-wrap justify-between border-b border-gray-100 px-4 pt-3 pb-2'>
                        {title ? (
                            <>
                                {typeof title === 'string' ? (
                                    <h4 className='text-base font-medium text-gray-700'>{title}</h4>
                                ) : (
                                    title
                                )}
                            </>
                        ) : (
                            <div className='mb-3 flex flex-wrap sm:mb-0'>
                                <SearchInput
                                    className='w-60'
                                    onChange={(e) => {
                                        onReload({ search: e.target.value || undefined, page: 1 });
                                        onSearchChange && onSearchChange(e.target.value || '');
                                    }}
                                />
                                {afterSearch}
                            </div>
                        )}
                        {(checkPermissions(permission + '_create') || user?.role === 'admin') && action}
                    </header>
                )}
                <div className='relative p-3'>
                    <div className='overflow-x-auto'>
                        <table className='w-full table-auto'>
                            <thead className='bg-gray-50 text-xs font-semibold uppercase text-gray-500'>
                                <tr>
                                    {indexed && (
                                        <th className='whitespace-nowrap p-2'>
                                            <div className='text-left font-semibold'>#</div>
                                        </th>
                                    )}
                                    {cols?.map((column, index) => (
                                        <th className='whitespace-nowrap p-2 text-left' key={index}>
                                            <div
                                                className={`font-semibold ${column?.className || ''
                                                    }`}
                                            >
                                                {/* {i18n?.t ? i18n.t(column?.text) : ''} */}
                                                {column?.text}
                                            </div>
                                            <div style={{ fontSize: 10 }}>{column.description}</div>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className='divide-y divide-gray-100 text-sm'>
                                {loading ? (
                                    <tr>
                                        <td className='h-96 pb-16'>
                                            <div className='absolute flex w-full justify-center'>
                                                <div className='loading' />
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    <>
                                        {(pagination ? data?.docs : data)?.map((row, index) => (
                                            <tr key={index}>
                                                {indexed && (
                                                    <td className='whitespace-nowrap p-2 text-gray-500'>
                                                        {(pagination
                                                            ? (data?.page - 1) * data.limit
                                                            : 0) +
                                                            index +
                                                            1}
                                                    </td>
                                                )}
                                                {cols?.map((column, index) => (
                                                    <td
                                                        className={`whitespace-nowrap p-2 text-gray-500 ${column?.className || ''
                                                            }`}
                                                        key={index}
                                                    >
                                                        {column.formatter
                                                            ? column.formatter(
                                                                row[column.dataField],
                                                                row
                                                            )
                                                            : row[column.dataField] || '-'}
                                                    </td>
                                                ))}
                                            </tr>
                                        ))}
                                    </>
                                )}
                            </tbody>
                        </table>
                    </div>
                    {pagination && (
                        <div className='mt-1 border-t pt-3'>
                            <Pagination
                                page={data?.page}
                                total={data?.totalDocs}
                                onSizeChange={(size) => onReload({ size })}
                                size={data?.size}
                                totalPages={data?.totalPages}
                                onPageChange={(page) => onReload({ page })}
                            />
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};
export default Table;

export const TableImage = ({ url }) => {
    const [image, setImage] = useState();
    return (
        <div className='w-inline-block h-8'>
            <img
                role='button'
                src={url}
                alt='Image'
                onClick={() => setImage(url)}
                style={{ maxWidth: '100%', maxHeight: '100%' }}
            />
            <Modal
                width={800}
                open={image}
                onCancel={() => setImage(undefined)}
                footer={null}
                bodyStyle={{ padding: 0, zIndex: 60 }}
                closeIcon={
                    <FaTimes
                        size={18}
                        className='bg-dark absolute right-4 top-4 inline-block rounded bg-gray-300 bg-opacity-25 text-white'
                    />
                }
            >
                <img className='w-100' style={{ minHeight: 400 }} src={image} alt='' />
            </Modal>
        </div>
    );
};
