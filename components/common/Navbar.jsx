'use client'
import React, { useEffect, useState } from 'react'
import MediaLink from './btn/MediaLink'
import { BiSearch, BiSolidCategory } from 'react-icons/bi'
import { LuHome } from 'react-icons/lu'
import { CgProfile } from 'react-icons/cg'
import { Menu } from '@headlessui/react'
import { MdOutlineLightMode, MdNightlight } from 'react-icons/md'
import DropdownMenu from './menu/DropdownMenu'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import Link from 'next/link'
import ProfileDropdown from './menu/ProfileDropdown'
import Search from 'antd/es/input/Search'
import { usePathname, useRouter } from 'next/navigation'
import { Select } from 'antd'
import { useI18n } from '@/context/i18n'
import Story from './Story'
import { FaBars, FaInfoCircle, FaLanguage } from 'react-icons/fa'
import { IoMdClose } from 'react-icons/io'
import { ImHome2 } from 'react-icons/im'
import { FiChevronDown } from 'react-icons/fi'
import { RiProfileFill } from 'react-icons/ri'
import { Button, Drawer, Tooltip, Dropdown } from 'antd';
import { useUserContext } from '@/context/user'
import Image from 'next/image'
import { IoLanguage } from "react-icons/io5";

const Navbar = ({ site }) => {
  const [show, setShow] = useState(false);
  const pathname = usePathname();
  const { push } = useRouter();
  const i18n = useI18n()

  const [currentLanguage, setCurrentLanguage] = useState('')

  const [theme, setTheme] = useState("dark");
  const [open, setOpen] = useState(false);
  const { user } = useUserContext()

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setTheme(storedTheme);
    }
  }, []);

  useEffect(() => {
    if (localStorage.getItem("lang")) {
      const lang = localStorage.getItem("lang")
      setCurrentLanguage(i18n?.languages?.find(l => l.key === lang)?.name)
    } else {
      setCurrentLanguage(i18n?.languages?.find(l => l.key === "en")?.name)
    }
  }, [i18n?.languages])

  useEffect(() => {
    setTheme(localStorage.getItem("theme") === "light" ? "light" : "dark");
  }, [])
  const handleToggle = () => {
    setTheme(theme === "light" ? "dark" : "light");
  }
  useEffect(() => {
    localStorage.setItem("theme", theme);
    const localTheme = localStorage.getItem("theme");
    document.querySelector("html").setAttribute("data-theme", localTheme);
  }, [theme])

  return (
    <div className='overflow-x-hidden'><header className="bg-BG_Color flex justify-between md:flex-col md:mt-0 pt-1 md:pb-0 pb-4 md:mx-0 md:mb-0 ">

      <nav className="container text-White_Color mx-auto md:pb-7 md:pt-7 pt-[1rem]">
        <div className="flex justify-between items-center ">

          <div className="hidden md:block">
            <ul className="flex items-center gap-5">
              <div className="relative">
                <Menu>
                  <Menu.Button className="flex items-center gap-2 duration-300 hover:text-Primary_Color rounded-lg">
                    <BiSolidCategory></BiSolidCategory>
                    <span className="hidden md:block">{i18n?.t('Category')}</span>
                  </Menu.Button>
                  <DropdownMenu></DropdownMenu>
                </Menu>
              </div>
              <Link
                href="/about"
                className={`hover:text-Primary_Color duration-300 ${pathname == '/about' ? '!text-Primary_Color' : ''
                  }`}
              >
                {i18n?.t('About Us')}
              </Link>
              <Link
                href="/contact"
                className={`hover:text-Primary_Color duration-300 ${pathname == '/contact' ? '!text-Primary_Color' : ''
                  }`}
              >
                {i18n?.t('Contact')}
              </Link>
            </ul>
          </div>
          <div className='flex items-center gap-3 md:mt-0 mt-3'>
            <FaBars onClick={showDrawer} className="text-xl md:hidden text-textGray cursor-pointer" />
            <Link href={"/"} className="">
              <img
                className="cursor-pointer md:h-[40px] w-full h-[30px]"
                src={site?.logo}
                alt="logo"
              ></img>
            </Link>
          </div>
          <div className="">
            <div className=" flex items-center gap-4 relative">
              <div className='lung-select md:relative absolute md:right-0 :-right-[36px] mylanguage md:block hidden'>
                <Dropdown
                  overlay={
                    <div className='bg-white p-1 rounded-sm'>
                      {
                        i18n?.languages?.map((l, index) => <div key={index} className='flex flex-col gap-2'>
                          <button className='hover:text-Primary_Color border-b px-2 py-1' onClick={() => i18n.changeLang(l?.key)}>{l?.name}</button>
                        </div>)
                      }
                    </div>
                  }
                  placement="bottom"
                >
                  <IoLanguage className='text-2xl hover:text-Primary_Color cursor-pointer' />
                </Dropdown>
              </div>
              <div className="md:block hidden">
                <div className="flex items-center text-2xl space-x-5">
                  <Link href="/" className=''>
                    <LuHome className={`hover:text-Primary_Color duration-300 ${pathname == '/' ? '!text-Primary_Color' : ''
                      }`}></LuHome>
                  </Link>

                  <BiSearch
                    onClick={() => setShow(!show)}
                    className="cursor-pointer hover:text-Primary_Color duration-300 text-2xl"
                  ></BiSearch>
                </div>

              </div>

              <div className="cursor-pointer text-2xl duration-300 md:block hidden" onClick={handleToggle}>
                {theme === "light" ? (
                  <MdOutlineLightMode className=' duration-300 hover:text-Primary_Color'></MdOutlineLightMode>
                ) : (
                  <MdNightlight className=' duration-300 hover:text-Primary_Color'></MdNightlight>
                )}
              </div>
              <div className="relative md:block hidden mt-2">
                <Menu>
                  <Menu.Button className="">
                    {
                      user?.image ?
                        <div className='h-[30px] w-[30px] '>
                          <Image
                            src={user?.image}
                            height={50}
                            width={50}
                            alt="user"
                            className="object-fill h-full w-full rounded-full"
                          />
                        </div>
                        :
                        <CgProfile className="cursor-pointer hover:text-Primary_Color duration-300 text-2xl"></CgProfile>
                    }
                  </Menu.Button>
                  <ProfileDropdown></ProfileDropdown>
                </Menu>
              </div>
            </div>
          </div>
        </div>
        <div
          className={`${show ? "block" : "hidden"
            } bg-BG_Color absolute p-5 sm:right-5 right-1 top-[3rem] md:top-[5rem] z-10 flex items-center gap-3 text-White_Color hover:text-White_Color rounded-xl`}
        >
          <div className="flex items-center rounded-lg hover:text-white ">
            <Search
              // style={{ backgroundColor: "red" }}
              // className="!outline-none !bg-transparent p-1"
              placeholder="Search"

              onSearch={(values) => push(`/blogs?search=${values}`)}
            />
          </div>
          <AiOutlineCloseCircle
            className="text-2xl"
            onClick={() => setShow(!show)}
          ></AiOutlineCloseCircle>
        </div>
      </nav>
      <hr className="text-black hidden md:block" />
      <div className="bg-BG_Color md:bg-[#fffafa] md:dark:bg-BG_Color md:dark:text-White_Color text-white md:text-Black_Color md:rounded-none rounded-2xl">
        <div className="container mx-auto ">
          <div className='md:hidden '>
            <div className=" flex justify-end items-center gap-4 md:hidden md:mt-0 mt-[14px]">
              <div className="cursor-pointer text-2xl hidden" onClick={handleToggle}>
                {theme === "light" ? (
                  <MdOutlineLightMode className=' duration-300 hover:text-Primary_Color'></MdOutlineLightMode>
                ) : (
                  <MdNightlight className=' duration-300 hover:text-Primary_Color'></MdNightlight>
                )}
              </div>
            </div>
          </div>
          <div className=" flex items-center justify-between md:pb-4 md:py-4 md:mr-0 -mr-5">
            <div className="flex items-center space-x-3 md:space-x-0 md:text-xl text-lg md:mt-0 mt-1">
              <div className='lung-select mylanguage block md:hidden'>
                <Dropdown
                  overlay={
                    <div className='bg-white p-1 rounded-sm'>
                      {
                        i18n?.languages?.map((l, index) => <div key={index} className='flex flex-col gap-2'>
                          <button className='hover:text-Primary_Color border-b px-2 py-1' onClick={() => i18n.changeLang(l?.key)}>{l?.name}</button>
                        </div>)
                      }
                    </div>
                  }
                  placement="bottom"
                >
                  <IoLanguage className='text-2xl hover:text-Primary_Color cursor-pointer' />
                </Dropdown>
              </div>
              <BiSearch
                onClick={() => setShow(!show)}
                className="md:hidden cursor-pointer hover:text-Primary_Color duration-300 md:text-2xl text-lg"
              ></BiSearch>

              <div className="cursor-pointer md:text-2xl text-lg md:hidden" onClick={handleToggle}>
                {theme === "light" ? (
                  <MdOutlineLightMode className=' duration-300 hover:text-Primary_Color'></MdOutlineLightMode>
                ) : (
                  <MdNightlight className=' duration-300 hover:text-Primary_Color'></MdNightlight>
                )}
              </div>
              <div className="relative md:hidden">
                <Menu>
                  <Menu.Button className="flex items-center gap-2 text-White_Color">
                    {/* need to change here */}
                    {
                      user?.image ?
                        <div className='h-[30px] w-[30px] '>
                          <Image
                            src={user?.image}
                            height={50}
                            width={50}
                            alt="user"
                            className="object-fill h-full w-full rounded-full"
                          />
                        </div>
                        : <CgProfile className="cursor-pointer  hover:text-Primary_Color duration-300"></CgProfile>
                    }
                  </Menu.Button>
                  <ProfileDropdown></ProfileDropdown>
                </Menu>
              </div>

              <div className="block md:hidden">

                {/* {/ small device start  /} */}
                <div className="lg:hidden">

                  <Drawer
                    closeIcon={false}
                    placement={"left"}
                    onClose={onClose}
                    open={open}
                    className=" lg:!hidden !text-white !bg-BG_Color "
                  >
                    <div className="w-full flex flex-col gap-5 pb-5 border-b border-white ">
                      <div className=" w-full flex items-center justify-between mt-4">
                        <Link href={"/"} className="" onClick={onClose}>
                          <img
                            className="cursor-pointer md:h-[40px] w-full h-[30px] md:ml-0 -ml-4"
                            src={site?.logo ? site?.logo : "/Logo (1).png"}
                            alt="image"
                          ></img>
                        </Link>
                        <IoMdClose onClick={onClose} className="text-lg cursor-pointer" />
                      </div>
                    </div>

                    <div className=" mt-10 flex flex-col text-xl  lg:gap-8 gap-4">
                      <Link
                        onClick={onClose}
                        href="/"
                        className={`flex items-center  gap-4 font-semibold text-base duration-500  ${pathname === "/"
                          ? "text-secondary hover:text-Primary_Color"
                          : "hover:text-secondary"
                          } `}
                      >
                        <ImHome2 className="" />
                        <span className="">Home</span>
                      </Link>
                      <Link
                        onClick={onClose}
                        href="/about"
                        className={`flex  items-center gap-4 font-semibold text-base duration-500  ${pathname === "/about"
                          ? "text-secondary hover:text-Primary_Color"
                          : "hover:text-Primary_Color"
                          } `}
                      >
                        <FaInfoCircle className="" />
                        <span className="">About Us</span>
                      </Link>
                      <Link
                        onClick={onClose}
                        href="/contact"
                        className={`flex  items-center gap-4 font-semibold text-base duration-500  ${pathname === "/contact"
                          ? "text-secondary hover:text-Primary_Color"
                          : "hover:text-Primary_Color"
                          } `}
                      >
                        <RiProfileFill className="" />
                        <span className="">Contact</span>
                      </Link>
                      <Menu>
                        <Menu.Button className="flex !font-semibold !text-base items-center gap-4 duration-300 hover:text-Primary_Color rounded-lg relative">
                          <BiSolidCategory></BiSolidCategory>
                          <span className="">{i18n?.t('Category')}</span>
                        </Menu.Button>
                        <div className='absolute !top-[150px] right-0' onClick={onClose}>
                          <DropdownMenu></DropdownMenu>
                        </div>
                      </Menu>

                    </div>
                  </Drawer>
                </div>
                {/* {/ small device end /} */}
              </div>


            </div>
            <div className='hidden md:block w-full'>

              <Story></Story>
            </div>

          </div>

        </div>

      </div>

    </header>
      <div className='md:hidden dark:bg-BG_Color '>
        <div className='flex justify-center pt-2'>
          <Story></Story>
        </div>
      </div></div>
  );
}

export default Navbar