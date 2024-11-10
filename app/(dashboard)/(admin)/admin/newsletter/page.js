"use client"
import Table from '@/app/(dashboard)/components/common/table'
import { useI18n } from '@/context/i18n'
import { fetchSubscriber, postSubscribe, postUnSubscribe } from '@/helpers/backend_helper'
import { useActionConfirm, useFetch } from '@/helpers/hooks'
import { Switch } from 'antd'
import React from 'react'
import { BiPencil } from 'react-icons/bi'
import { FaTrashAlt } from 'react-icons/fa'

let actions = (data) => (
  <div className='flex'>

    <button
      className='mr-2 w-fit rounded border border-red-500 p-1.5 text-red-500 hover:bg-red-500 hover:text-white'
      title='Delete Student'
    // onClick={() =>
    //     // useActionConfirm(deleteStudent, { _id: data?._id }, () => getStudents())
    // }
    >
      <FaTrashAlt className='cursor-pointer' />
    </button>
  </div>
);
const Page = () => {

  const [subscriber, getsubscriber, { loading, error }] = useFetch(fetchSubscriber)
  const i18n = useI18n()

  const columns = [
    {
      dataField: 'email',
      text: i18n?.t('Email'),
      formatter: (email) => <span className=''>{email}</span>,
    },
    {
      dataField: 'active',
      text: i18n?.t('Active Status'),
      formatter: (_, data) => (
        <Switch
          className='switch-ant'
          onChange={(e) => {
            if (data?.active) {
              // eslint-disable-next-line react-hooks/rules-of-hooks
              useActionConfirm(postUnSubscribe, { email: data?.email }, () =>
                getsubscriber()
              )
            } else {
              // eslint-disable-next-line react-hooks/rules-of-hooks
              useActionConfirm(postSubscribe, { email: data?.email }, () =>
                getsubscriber()
              )
            }
          }

          }
          checkedChildren={'Active'}
          unCheckedChildren={'Inactive'}
          checked={data?.active}
        />
      ),
    },
  ]

  return (
    <Table
      columns={columns}
      data={subscriber}
      pagination={true}
      noActions
      // actions={actions}
      indexed={true}
      // shadow={false}
      onReload={getsubscriber}
      error={error}
      loading={loading}
    />
  )
}

export default Page