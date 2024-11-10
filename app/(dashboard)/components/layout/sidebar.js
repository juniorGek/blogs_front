"use client"

import Link from "next/link";
import {use, useEffect, useRef} from "react";
import SimpleBar from "simplebar-react";
import Menu from "./menu";
import {usePathname} from "next/navigation";
import { useUserContext } from "@/context/user";
import { useSite } from "@/context/site";
import { initI18n, useI18n } from "@/context/i18n";

const Sidebar = ({menus, seller}) => {
    const site = useSite()
    const i18n = useI18n()
    const ref = useRef();
    const pathName = usePathname()
    const isChildActive = href => {
        let item;
        let path = pathName
        menus.forEach(menu => {
            if (menu.href === href) {
                item = menu
            }
            menu.child?.forEach(child => {
                if (child.href === href) {
                    item = child
                }
            })
        })
        return item?.childHrefs?.find(child => path.match(new RegExp(child)))
    }


    useEffect(() => {
        let items = document.querySelectorAll('#sidebar-menu > ul > li a')
        for (let item of items) {
            if (item.getAttribute('href') === pathName || isChildActive(item.getAttribute('href'))) {
                item.classList.add('active')
                item.parentElement.classList.add('mm-active')
                let submenu = item.parentElement.parentElement
                if (submenu.classList.contains('mm-collapse')) {
                    submenu.classList.add('mm-show')
                    submenu.parentElement.classList.add('mm-active')
                    submenu.parentElement.children[0].classList.add('active')
                }
            } else {
                item.classList.remove('active')
                item.parentElement.classList.remove('mm-active')
                if (item.parentElement.children.length > 1) {
                    item.parentElement.children[1].classList.remove('mm-show')
                }
            }
        }
    }, [pathName])

    return (
        <div className="vertical-menu">
            <div className="navbar-brand-box">
                <Link href={seller ? "/seller" : "/admin"} className="logo">
                    <span className="logo-sm">
                        <h4 className="pt-4 text-white">{site?.site_short_name}</h4>
                    </span>
                    <span className="logo-lg">
                        <h3 className="pt-4 text-white">{site?.name}</h3>
                    </span>
                </Link>
            </div>
            <div data-simplebar="" className="h-100">
                <SimpleBar className="h-100" ref={ref}>
                    <div id="sidebar-menu">
                        <Menu>
                            {menus.map((menu, index) => (
                                <li className={!!menu.title ? "menu-title" : ''} key={index}>
                                    {!!menu.title && <>{i18n && i18n.t(menu.title)}</>}
                                    {!!menu.label && (
                                        <>
                                            {!!menu.child ? (
                                                <a className="has-arrow" role="button">
                                                    <i style={{marginBottom: 2}}>
                                                        {menu.icon}
                                                    </i>
                                                    <span>{i18n && i18n.t(menu.label)}</span>
                                                </a>
                                            ) : (
                                                <Link href={menu.href || '#!'}>
                                                    <i style={{marginBottom: 2}}>
                                                        {menu.icon}
                                                    </i>
                                                    <span>{i18n && i18n.t(menu.label)}</span>
                                                </Link>
                                            )}
                                        </>

                                    )}
                                    {!!menu.child && (
                                        <ul className="mm-collapse">
                                            {menu.child.map((menu, index) => (
                                                <li key={index}>
                                                    <Link href={menu.href || '#!'} key={index}>{i18n && i18n.t(menu.label)}</Link>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </li>
                            ))}
                        </Menu>
                    </div>
                </SimpleBar>
            </div>
            <div className="sidebar-background"></div>
        </div>
    )
}

export default Sidebar


