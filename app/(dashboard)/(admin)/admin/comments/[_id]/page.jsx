"use client";
import Table, { TableImage } from "@/app/(dashboard)/components/common/table";
import {
  delComment,
  fetchCommentsListByAdmin,
  fetchContact,
} from "@/helpers/backend_helper";
import { useFetch } from "@/helpers/hooks";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { TbListDetails } from "react-icons/tb";
import { useRouter } from "next/navigation";
import { Modal } from "antd";

const page = () => {
   // eslint-disable-next-line react-hooks/rules-of-hooks
  const { push } = useRouter();
   // eslint-disable-next-line react-hooks/rules-of-hooks
  const params = useParams();
   // eslint-disable-next-line react-hooks/rules-of-hooks
  const [comments, getComments, { loading, error }] = useFetch(
    fetchCommentsListByAdmin,
    {},
    false
  );
   // eslint-disable-next-line react-hooks/rules-of-hooks
  const [comment, setComment] = useState(null);

   // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (params?._id) {
      getComments({
        blog: params?._id,
      });
    }
  }, [params?._id]);

   // eslint-disable-next-line react-hooks/rules-of-hooks
  const [open, setOpen] = useState(false);
  const showModal = () => {
    setOpen(true);
  };
  const handleCancel = () => {
    setOpen(false);
  };

  const columns = [
    {
      dataField: "user_id",
      text: "Image",
      formatter: (user_id) => <TableImage url={user_id?.image} />,
    },
    {
      dataField: "user_id",
      text: "Name",
      formatter: (user_id) => (
        <span className="capitalize">{user_id?.name}</span>
      ),
    },

    {
      dataField: "content",
      text: "Comment",
      formatter: (content) => <span className="">{content}</span>,
      formatter: (content) => (
        <div>
          {content?.slice(0, 20)}{" "}
          {content?.length > 20 && (
            <button
              type="button"
              onClick={() => {
                setComment(content);
                showModal();
              }}
              className="text-blue-600 hover:underline"
            >
              ....see more
            </button>
          )}
        </div>
      ),
    },
    {
      dataField: "createdAt",
      text: "Created At",
      formatter: (createdAt) => (
        <span>{dayjs(createdAt).format(" MMM. DD, YYYY")}</span>
      ),
    },
  ];

  let actions = (data) => (
    <div className="flex">
      <button
        className="p-1.5 border border-green-500 text-green-500 hover:bg-green-500 hover:text-white rounded mr-2"
        title="View Comments"
        onClick={() => push(`/admin/comments/replies/${data?._id}`)}
      >
        <TbListDetails className="cursor-pointer" />
      </button>
    </div>
  );

  return (
    <>
      <Table
        columns={columns}
        data={comments}
        pagination={true}
        noActions={false}
        // action={action}
        actions={actions}
        indexed={true}
        shadow={false}
        onDelete={delComment}
        onReload={getComments}
        error={error}
        loading={loading}
        title="Comments"
      />
      {/* modal open */}
      <Modal title="Comment" open={open} onCancel={handleCancel} footer={null}>
        <p className="text-gray-600 text-base">{comment}</p>
      </Modal>
    </>
  );
};

export default page;
