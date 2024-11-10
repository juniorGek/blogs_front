"use client";

import Sidebar from "../../components/layout/sidebar";
import Header from "../../components/layout/header";
import {
  BiCog,
  BiHomeCircle,
  BiLayer
} from "react-icons/bi";
import { FiUsers } from "react-icons/fi";
import { useEffect, useState } from "react";

import { usePathname, useRouter } from "next/navigation";
import { useFetch } from "@/helpers/hooks";
import { BsListTask, BsSendFill } from "react-icons/bs";
import { AiFillTags, AiOutlineComment, AiOutlineMail } from "react-icons/ai";
import { useUserContext } from "@/context/user";
import { fetchProfile, fetchSiteSettings } from "@/helpers/backend_helper";
import { Router } from "next/router";
import SiteContext from "@/context/site";
import { LiaLanguageSolid } from "react-icons/lia";
import I18nContext, { initI18n } from "@/context/i18n";
import { MdOutlineAmpStories } from "react-icons/md";
import { TfiGallery } from "react-icons/tfi";

const Layout = ({ children }) => {
  const pathname = usePathname()
  const { push } = useRouter()
  const router = useRouter();
  const [site] = useFetch(fetchSiteSettings);
  const { user } = useUserContext();
  const i18n = initI18n()

  useEffect(() => {
    if (user?.role === "user") {
      push('/')
    }
  }, [push, user]);

  const menu = getMenu(user, push, pathname)

  return (

    <I18nContext.Provider value={i18n}>
      <SiteContext.Provider value={{ ...(site || {}) }}>
        <div id="layout-wrapper">
          <Header />
          <Sidebar menus={menu} />
          <div className="main-content">
            <div className="content">{children}</div>
          </div>
        </div>
      </SiteContext.Provider>
    </I18nContext.Provider>

  );
};

export default Layout;

const menu = [
  {
    label: "Dashboard",
    icon: <BiHomeCircle />,
    href: "/admin",
    permission: 'any'
  },
  {
    label: "Gallery",
    icon: <TfiGallery />,
    href: "/admin/gallery",
    permission: 'gallery'
  },
  {
    title: "Blog",
    permission: 'story_show',
  },
  {
    label: "Categories",
    icon: <BiLayer />,
    href: "/admin/categories",
    childHrefs: ["/admin/subcategories", "/admin/subcategories/[id]"],
    permission: 'categories_show'
  },
  {
    label: "Tags",
    icon: <AiFillTags />,
    href: "/admin/tag",
    permission: 'tags_show'
  },
  {
    label: "Blog List",
    icon: <BsListTask />,
    href: "/admin/blogs",
    childHrefs: ["/admin/add-post", "/admin/edit-post/*"],
    permission: 'blog_list_show'
  },

  {
    title: "Story",
    permission: 'story_show',
  },
  {
    label: "Topics",
    icon: <BiLayer />,
    href: "/admin/stories/topics",
    permission: 'story_show'
  },
  {
    label: "Stories",
    icon: <MdOutlineAmpStories />,
    href: "/admin/stories",
    childHrefs: ["/admin/add-story", "/admin/edit-story/*"],
    permission: 'story_show'
  },

  {
    title: "HRM",
    icon: <FiUsers />,
    permission: 'hrm',
  },
  {
    label: "Employees",
    icon: <FiUsers />,
    href: "/admin/hrm/employees",
    permission: 'hrm',
  },
  {
    label: "Departments",
    icon: <FiUsers />,
    href: "/admin/hrm/departments",
    permission: 'hrm',
  },
  {
    label: "Roles & Permissions",
    icon: <FiUsers />,
    href: "/admin/hrm/roles",
    permission: 'hrm',
  },
  {
    title: "Others",
    permission: 'others',
  },
  {
    label: "Users",
    icon: <FiUsers />,
    href: "/admin/users",
    permission: 'user_list_show'
  },

  {
    label: "Contact",
    icon: <BsSendFill />,
    href: "/admin/contacts",
    permission: 'contact'
  },
  {
    label: "Newsletter",
    icon: <AiOutlineMail />,
    href: "/admin/newsletter",
    permission: 'newsletter'
  },
  {
    label: "Language Settings",
    icon: <LiaLanguageSolid />,
    href: "/admin/language",
    permission: 'language'
  },
  {
    label: "Settings",
    icon: <BiCog />,
    href: "/admin/settings",
    permission: 'setting'
  },

];

const getMenu = (user, push, pathname) => {
  const hasPermission = menu => {
    if (menu.permission && havePermission(menu.permission, user?.roles)) {
      return true
    }
    if (menu.permissions) {
      for (let permission of menu.permissions) {
        if (havePermission(permission, user?.roles)) {
          return true
        }
      }
    }
    if (menu.permissions) {
      for (let permission of menu.permissions) {
        if (roleWisePermission(permission, [user?.role])) {
          return true
        }
      }
    }
    if (menu.permission) {
      if (roleWisePermission('admin', [user?.role])) {
        return true
      }
    }
    if (process.browser) {
      if (pathname === menu.href && user) {
        push('/admin')
      }
    }
    return false
  }
  return menu?.map(d => ({ ...d, href: d.href?.replace('[_id]', user?._id) })).filter(menu => {
    if (menu?.permission === 'any') {
      return true
    } else if (menu.permission || menu.permissions) {
      return hasPermission(menu)
    } else if (Array.isArray(menu.child)) {
      menu.child = menu.child.filter(child => {
        return hasPermission(child)
      })
      return menu.child.length > 0
    }
    return false
  })
}

export const havePermission = (permission, roles) => {
  for (let role of roles || []) {
    if (role?.permissions?.includes(permission)) {
      return true;
    }
  }
  return false;
};



export const roleWisePermission = (permission, roles) => {
  if (roles?.includes(permission)) {
    return true
  }
  return false
}