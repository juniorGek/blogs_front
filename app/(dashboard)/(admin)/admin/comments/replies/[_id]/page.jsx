"use client";
import Table, { TableImage } from "@/app/(dashboard)/components/common/table";
import {
  delComment,
  delCommentReply,
  fetchCommentReplyByAdmin,
} from "@/helpers/backend_helper";
import { useFetch } from "@/helpers/hooks";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { TbListDetails } from "react-icons/tb";
import { Modal } from "antd";

const page = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const params = useParams();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [comments, getComments, { loading, error }] = useFetch(
    fetchCommentReplyByAdmin,
    {},
    false
  );
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [comment, setComment] = useState(null);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (params?._id) {
      getComments({
        comment: params?._id,
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
      dataField: "comment",
      text: "Comment",
      formatter: (comment) => (
        <div>
          {comment?.slice(0, 20)}{" "}
          {comment?.length > 20 && (
            <button
              type="button"
              onClick={() => {
                setComment(comment);
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

  return (
    <>
      <Table
        columns={columns}
        data={comments}
        pagination={true}
        noActions={false}
        // action={action}
        indexed={true}
        shadow={false}
        onDelete={delCommentReply}
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
