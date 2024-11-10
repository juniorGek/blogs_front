"use client"
import Table from '@/app/(dashboard)/components/common/table';
import { useSite } from '@/context/site';
import { fetchPermissions, fetchRole, postPermissions } from '@/helpers/backend_helper';
import { useAction, useFetch } from '@/helpers/hooks';
import { Card, Checkbox } from 'antd';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { havePermission } from '../../../layout';
import { useUserContext } from '@/context/user';

const RolePermission = () => {
    const site = useSite();
    const { push } = useRouter()
    const searchParams = useSearchParams()
    const query = searchParams.get('_id')
    const [role, getRoles] = useFetch(fetchRole)
    const [elements] = useFetch(fetchPermissions)
    const { user } = useUserContext();

    const [update, setUpdate] = useState(false)
    const reload = () => setUpdate(!update)
    const [permissions, setPermissions] = useState([])

    useEffect(() => {
        if (query) {
            getRoles({ _id: query, permissions: true })
        }
    }, [query])

    useEffect(() => {
        if (role?._id) {
            setPermissions(role?.permissions)
        }
    }, [role?._id])

    const isChecked = data => {
        if (data?.child) {
            for (let c of data.child) {
                if (permissions?.includes(c?.permission)) {
                    return true
                }
            }
        }
        if (permissions.includes(data?.permission)) {
            return true
        }
        return false
    }

    const handleChange = (e, data) => {
        if (e.target.checked === true) {
            if (data.child) {
                setPermissions([...permissions, ...data?.child?.map(d => d.permission)])
            } else {
                permissions.push(data.permission)
            }
        } else {
            let p = data?.child ? data?.child?.map(d => d.permission) : [data.permission]
            setPermissions(permissions?.filter(d => !p.includes(d)))
        }
        reload()
    }

    const admin = user?.role === 'admin';
    const Check = ({ d }) => <Checkbox onChange={e => handleChange(e, d)} checked={isChecked(d)} />

    const columns = [
        { text: '#', dataField: '', formatter: (_, d) => <Check d={d} /> },
        { text: 'Name', dataField: 'name' },
        {
            text: 'Create',
            dataField: '',
            formatter: (_, data) => data.child && (admin || havePermission(`${data?.permission}_create`, user?.permission)) &&
                <Check d={data?.child?.find(d => d.permission === `${data?.permission}_create`)} />
        },
        {
            text: 'Edit',
            dataField: '',
            formatter: (_, data) => data.child && (admin || havePermission(`${data?.permission}_edit`, user?.permission)) &&
                <Check d={data?.child?.find(d => d.permission === `${data?.permission}_edit`)} />
        },
        {
            text: 'Delete',
            dataField: '',
            formatter: (_, data) => data.child && (admin || havePermission(`${data?.permission}_delete`, user?.permission)) &&
                <Check d={data?.child?.find(d => d.permission === `${data?.permission}_delete`)} />
        },
        {
            text: 'View',
            dataField: '',
            formatter: (_, data) => data.child && (admin || havePermission(`${data?.permission}_show`, user?.permission)) &&
                <Check d={data?.child?.find(d => d.permission === `${data?.permission}_show`)} />
        },
    ]

    return (
        <>
            {/* <PageTitle title="Roles"/> */}
            <Card>
                <h2 className="text-xl">Permissions - <span className="text-danger">( {role?.name} )</span></h2>
                <Table
                    noHeader
                    pagination={false}
                    noActions={true}
                    shadow={false}
                    columns={columns}
                    data={elements?.filter(d => {
                        if (admin) {
                            return true
                        }
                        if (havePermission(d.permission, user?.permission)) {
                            return true
                        }
                        if (d?.child) {
                            for (let c of d.child) {
                                if (havePermission(c.permission, user?.permission)) {
                                    return true
                                }
                            }
                        }
                        return false
                    })?.map(d => {
                        return {
                            ...d,
                            child: d?.child ? admin ? d.child : d.child?.filter(d => havePermission(d.permission, user?.permission)) : undefined
                        }
                    })}
                />
                <button className='btn-submit' onClick={async () => {
                    // eslint-disable-next-line react-hooks/rules-of-hooks
                    return useAction(postPermissions, { role: query, permissions }, () => {
                        push('/admin/hrm/roles')
                    })
                }}>Save</button>
            </Card>
        </>
    )
}

export default RolePermission;