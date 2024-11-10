"use client"

import React from "react"
import Link from "next/link"
import { Row, Col, BreadcrumbItem } from "reactstrap"

const Breadcrumb = ({item}) => {
    return (
        <div className="breadcrumb-section">
            <h6 className="title">{item}</h6>
            <div className="page-title-right">
                <ol className="breadcrumb m-0">
                    <BreadcrumbItem>
                        <Link href="#" className="text-14">Home</Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem active>
                        <Link href="#" className="text-14">{item}</Link>
                    </BreadcrumbItem>
                </ol>
            </div>
        </div>
    )
}


export default Breadcrumb
