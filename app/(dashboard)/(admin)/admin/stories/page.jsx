"use client"
import Table, { TableImage } from "@/app/(dashboard)/components/common/table";
import { useI18n } from "@/context/i18n";
import { deleteStory, fetchAllStory } from '@/helpers/backend_helper'
import { useFetch } from '@/helpers/hooks'
import { Button } from "antd";
import dayjs from "dayjs";

import { useRouter } from "next/navigation";

const Page = () => {
  let { lang, languages } = useI18n()
  const i18n = useI18n()

  const { push } = useRouter();
  const [post, getPost, { loading, error }] = useFetch(fetchAllStory)

  let action = (
    <div className='flex'>
      <Button className="" onClick={() => { push('/admin/add-story') }}>
        {i18n?.t('Add Story')}
      </Button>
    </div>
  );

  const columns = [
    {
      dataField: 'cover_image',
      text: i18n?.t('Cover image'),
      formatter: (_, data) => <TableImage url={data?.topic?.image} />,
    },
    {
      dataField: 'topic',
      text: i18n?.t('Topic'),
      formatter: (_, data) => <span className='capitalize'>{data?.topic?.title && data?.topic?.title[lang]}</span>,
    },
    {
      dataField: 'type',
      text: i18n?.t('Story Type'),
      formatter: (type) => <span className='capitalize'>{i18n?.t(type)}</span>,
    },
    {
      dataField: 'start_time',
      text: i18n?.t('Start Time'),
      formatter: (start_time) => <span className='capitalize'>{dayjs(start_time).format('YYYY-MM-DD HH:mm')}</span>,
    },
    {
      dataField: 'end_time',
      text: i18n?.t('End Time'),
      formatter: (end_time) => <span className='capitalize'>{dayjs(end_time).format('YYYY-MM-DD HH:mm')}</span>,
    },
    {
      dataField: 'status',
      text: i18n?.t('published'),
      formatter: (status) => <div>
        <p>{status === 'published' ? <span className="text-green-500">{i18n?.t('Published')}</span> : <span className="text-">{i18n?.t('Draft')}</span>}</p>
      </div>,
    }
  ]



  return (
    <>
      {/* <FormSelect/> */}
      {
        post?.docs && <Table
          columns={columns}
          data={post}
          pagination={true}
          noActions={false}
          action={action}
          indexed={true}
          shadow={false}
          onEdit={(data) => {
            push(`/admin/edit-story?_id=${data._id}`)
          }}
          onDelete={deleteStory}
          onReload={getPost}
          error={error}
          loading={loading}
          // title={ i18n?.t('All Stories') }
          permission={'story'}
        />
      }
    </>

  )
}

export default Page