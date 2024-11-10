"use client"

import Breadcrumb from "../../components/common/breadcums";
import { Col, Row } from "reactstrap";
import DashboardCard from "../../components/common/card";
import { FiDollarSign, FiShoppingBag, FiShoppingCart, FiTruck } from "react-icons/fi";
import { Card } from "antd";
import { useEffect, useState } from "react";
import UserContext, { useUserContext } from "@/context/user";
import { useFetch } from "@/helpers/hooks";
import { getDashboardFront } from "@/helpers/backend_helper";
import Table, { TableImage } from "../../components/common/table";
import dayjs from "dayjs";
import { useI18n } from "@/context/i18n";
import Link from "next/link";


const Dashboard = () => {
    let {lang,languages} = useI18n()

   const [dashboard, setDashboard,{loading,error}] = useFetch(getDashboardFront)
   const i18n = useI18n()

    const columns = [
        {
            dataField: 'name',
            text: i18n?.t('Username'),
            formatter: (name) => <span className=''>{name}</span>,
        }, {
            dataField: 'image',
            text: i18n?.t('Image'),
            formatter: (d) => <TableImage url={d} />,
        },
        {
            dataField: 'email',
            text: i18n?.t('Email'),
            formatter: (email) => <span className=''>{email}</span>,
        },
        {
            dataField: 'createdAt',
            text: i18n?.t('Joined At'),
            formatter: (createdAt) => <span className=''>{
                dayjs(createdAt).format(' MMM. DD, YYYY')
            }</span>,
        }
        
    ]

    const columns2 = [
        {
            dataField: 'name',
            text: i18n?.t('Username'),
            formatter: (_, data) => <span className=''>{data?.user?.name}</span>,
        }, 
        {
            dataField: 'comment',
            text: i18n?.t('Comment'),
            formatter: (_,data) => <span className=''>{data?.content}</span>,
        },
        {
            dataField: 'title',
            text: i18n?.t('Blog Title'),
            formatter: (_, data) => <Link href={`/admin/blog-details/${data?.blog?._id}`} className='text-Primary_Color'>{data?.blog?.title[lang].length>30 && data?.blog?.title[lang]?.slice(0,30)}</Link>,
        },
        {
            dataField: 'createdAt',
            text: i18n?.t('Commented At'),
            formatter: (createdAt) => <span className=''>{
                dayjs(createdAt).format(' MMM. DD, YYYY')
            }</span>,
        }
        
    ]



    return (
        <>
            <Row>
                <Col md={6} xl={4}>
                    <Card className="dashboard-card h-[180px] bg-[#19a185] text-white">
                        <div className="body position-relative">
                            <p className="header_1">{dashboard?.totalBlogs}</p>
                            <h4 className="mb-0 header_4">
                                {i18n && i18n.t('Total Blogs')}
                            </h4>
                        </div>
                    </Card>
                </Col>
                <Col md={6} xl={4}>
                    <Card className="dashboard-card h-[180px] bg-[#F1B740] text-white">
                        <div className="body position-relative">
                            <p className="header_1">{dashboard?.totalUser}</p>
                            <h4 className="mb-0 header_4">{i18n && i18n.t('Total Users') }</h4>
                        </div>
                    </Card>
                </Col>
                <Col md={6} xl={4}>
                    <Card className="dashboard-card h-[180px] bg-[#DE524A] text-white">
                        <div className="body position-relative">
                            <p className="header_1">{dashboard?.numberOfUnpublished}</p>
                            <h4 className="mb-0 header_4">
                                {i18n && i18n.t('Unpublished Blogs')}
                            </h4>
                        </div>
                    </Card>
                </Col>
            </Row>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <Table
                title={i18n?.t('New Members')}
                columns={columns}
                data={dashboard?.newMembers}
                indexed={true}
                noActions={true}
            />

            <Table
                title={i18n?.t('New Comments')}
                columns={columns2}
                data={dashboard?.newComments}
                indexed={true}
                noActions={true}
            />

            </div>
        </>
    )
}
export default Dashboard