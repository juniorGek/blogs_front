"use client"

import { FaBars } from "react-icons/fa";
import { useEffect, useState } from "react";
import { Col, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Row } from "reactstrap";
import { BiBell, BiChevronDown, BiPowerOff, BiUser } from "react-icons/bi";
import SimpleBar from "simplebar-react";
import { useRouter } from "next/navigation";

import Link from "next/link";
import { useSite } from "@/context/site";
import { useUserContext } from "@/context/user";
import { Select } from "antd";
import { useI18n } from "@/context/i18n";
import { ImExit } from "react-icons/im";

const Header = ({ seller }) => {
    const site = useSite()
    const user = useUserContext()
    const i18n = useI18n()
    const [currentLanguage, setCurrentLanguage] = useState('')

    useEffect(() => {
        if (localStorage.getItem("lang")) {
            const lang = localStorage.getItem("lang")
            setCurrentLanguage(i18n?.languages?.find(l => l.key === lang)?.name)
        } else {
            setCurrentLanguage(i18n?.languages?.find(l => l.key === "en")?.name)
        }
    }, [i18n?.languages])







    const { push } = useRouter()
    const [menu, setMenu] = useState(false);

    const t = d => d
    return (
        <>
            <header id="page-topbar">
                <div className="navbar-header">
                    <div className="d-flex align-items-center">
                        <div className="navbar-brand-box d-lg-none d-md-block">
                            <a href="/admin" className="logo logo-dark">
                                <span className="logo-sm">
                                    <h4 className="pt-4 text-gray">{site?.site_short_name}</h4>
                                </span>
                            </a>
                        </div>

                        <button
                            type="button"
                            onClick={() => {
                                let body = document.body;
                                if (window.screen.width <= 998) {
                                    body.classList.toggle("sidebar-enable");
                                } else {
                                    body.classList.toggle("vertical-collpsed");
                                    body.classList.toggle("sidebar-enable");
                                }
                            }}
                            className="btn btn-sm px-3 font-size-16 header-item "
                            id="vertical-menu-btn"
                        >
                            <FaBars size={16} />
                        </button>
                        <p className="text-BG_Line_Color transition-all ease-in-out hover:text-Primary_Color cursor-pointer text-14 font-semibold mt-3 ml-5 flex items-center gap-1" onClick={() => window.open('/')}> <ImExit /> {i18n?.t("Live Site")} </p>
                    </div>
                    <div className="flex items-center ">


                        {
                            currentLanguage && (
                                <Select
                                    defaultValue={currentLanguage}
                                    style={{ width: 90 }}
                                    bordered={false}
                                    options={
                                        i18n?.languages?.map((l, index) => (
                                            { label: l.name, value: l.key }
                                        ))
                                    }
                                    onChange={
                                        (value) => i18n.changeLang(value)
                                    }
                                />
                            )
                        }



                        <Dropdown
                            isOpen={menu}
                            toggle={() => setMenu(!menu)}
                            className="d-inline-block"
                        >
                            <DropdownToggle
                                className="btn header-item "
                                id="page-header-user-dropdown"
                                tag="button"
                            >
                                <div className="md:flex">
                                    <img
                                        className="rounded-circle header-profile-user"
                                        src={user?.user?.image ? user?.user?.image : "https://ui-avatars.com/api/?name=Admin&background=random&length=1&size=128"}
                                        alt="Header Avatar"
                                    />
                                    <div className="flex items-center text-14">
                                        <span
                                            className="capitalize">
                                            {user?.user?.role}
                                        </span>
                                        <BiChevronDown />
                                    </div>
                                </div>

                            </DropdownToggle>
                            <DropdownMenu className="dropdown-menu-end border-0">
                                <DropdownItem tag={Link} href={`/${seller ? 'seller' : 'admin'}/profile`} className="!flex justify-center items-center">
                                    <BiUser size={16} className="align-middle me-2 text-muted" />
                                    <span className="text-14">{i18n?.t("Profile")}{" "}</span>
                                </DropdownItem>
                                <div className="dropdown-divider" />
                                <a className="dropdown-item !flex items-center justify-center" role="button" onClick={() => {
                                    localStorage.removeItem("token");
                                    push(`/`);
                                }}>
                                    <BiPowerOff size={16} className="align-middle me-2 text-danger" />
                                    <span className="text-14">
                                        {i18n?.t("Logout")}
                                    </span>
                                </a>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                </div>
            </header>

        </>
    )
}

export default Header


const Notification = () => {
    const user = useUserContext()

    const [menu, setMenu] = useState(false);
    const t = d => d
    return (
        <>
            <Dropdown
                isOpen={menu}
                toggle={() => setMenu(!menu)}
                className="dropdown d-inline-block border-0"
                tag="li"
            >
                <DropdownToggle
                    className="btn header-item noti-icon position-relative"
                    tag="button"
                    id="page-header-notifications-dropdown"
                >
                    <BiBell size={20} />
                    {/*<span className="badge bg-danger rounded-pill text-12">3</span>*/}
                </DropdownToggle>

                <DropdownMenu className="dropdown-menu dropdown-menu-lg dropdown-menu-end p-0">
                    <div className="p-3">
                        <Row className="align-items-center">
                            <Col>
                                <h6 className="m-0"> {t("Notifications")} </h6>
                            </Col>
                            <div className="col-auto">
                                <a href="#" className="small">
                                    {" "}
                                    View All
                                </a>
                            </div>
                        </Row>
                    </div>

                    <SimpleBar style={{ height: "230px" }}>
                        <a to="" className="text-reset notification-item">
                            <div className="d-flex">
                                <div className="avatar-xs me-3">
                                    <span className="avatar-title bg-primary rounded-circle font-size-16">
                                        <i className="bx bx-cart" />
                                    </span>
                                </div>
                                <div className="flex-grow-1">
                                    <h6 className="mt-0 mb-1">
                                        {t("Your order is placed")}
                                    </h6>
                                    <div className="text-12 text-muted">
                                        <p className="mb-1">
                                            {t(
                                                "If several languages coalesce the grammar"
                                            )}
                                        </p>
                                        <p className="mb-0">
                                            <i className="mdi mdi-clock-outline" />{" "}
                                            {t("3 min ago")}{" "}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </a>
                        <a to="" className="text-reset notification-item">
                            <div className="d-flex">
                                <img
                                    src={"https://ui-avatars.com/api/?name=Admin&background=random&length=1&size=128"}
                                    className="me-3 rounded-circle avatar-xs"
                                    style={{ height: "36px", width: "36px" }}
                                    alt="user-pic"
                                />
                                <div className="flex-grow-1">
                                    <h6 className="mt-0 mb-1">James Lemire</h6>
                                    <div className="text-12 text-muted">
                                        <p className="mb-1">
                                            {t("It will seem like simplified English") +
                                                "."}
                                        </p>
                                        <p className="mb-0">
                                            <i className="mdi mdi-clock-outline" />
                                            {t("1 hours ago")}{" "}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </a>

                        <a to="" className="text-reset notification-item">
                            <div className="d-flex">
                                <img
                                    src="https://ui-avatars.com/api/?name=Admin&background=random&length=1&size=128"
                                    className="me-3 rounded-circle avatar-xs"
                                    alt="user-pic"
                                    style={{ width: "36px", height: "36px" }}
                                />
                                <div className="flex-grow-1">
                                    <h6 className="mt-0 mb-1">Salena Layfield</h6>
                                    <div className="text-12 text-muted">
                                        <p className="mb-1">
                                            {t(
                                                "As a skeptical Cambridge friend of mine occidental"
                                            ) + "."}
                                        </p>
                                        <p className="mb-0">
                                            <i className="mdi mdi-clock-outline" />
                                            {t("1 hours ago")}{" "}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </SimpleBar>
                    <div className="p-2 border-top d-grid">
                        <a className="btn btn-sm btn-link font-size-14 text-center" to="#">
                            <i className="mdi mdi-arrow-right-circle me-1"></i> <span
                                key="t-view-more">{t("View More..")}</span>
                        </a>
                    </div>
                </DropdownMenu>
            </Dropdown>
        </>
    )
}