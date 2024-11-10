import { Menu } from '@headlessui/react';
import React from 'react';
import { IoIosArrowForward } from 'react-icons/io';

import { useCategoryContext } from '@/context/category';
import Link from 'next/link';
import { useI18n } from '@/context/i18n';
import { Dropdown, Space } from 'antd';


const DropdownMenu = () => {
    const i18n = useI18n()

    let { lang, languages } = useI18n()

    const { topic } = useCategoryContext()



    return (
        <>


            <Menu.Items className="flex flex-col absolute top-12 md:left-0 right-0  rounded-lg bg-white z-40 text-Black_Color dark:text-Black_Color">


                <div className={`${topic?.length > 5 ? 'h-72 overflow-y-scroll md:hover:w-[500px] w-56 no-scrollbar' : ''}`}>
                    {
                        topic?.map((item, i) => <Menu.Item key={item._id}>
                            {({ active }) => (
                                <Link
                                    className={`group relative flex flex-col w-56 md:flex-row items-center gap-3 px-4 py-3 text-sm md:text-base  ${active ? 'bg-Primary_Color text-White_Color' : 'bg-white'} border
                                    ${i == 0 ? 'rounded-t-lg' : ''}
                                    ${i == topic?.length - 1 ? 'rounded-b-lg' : ''}
                                    `}
                                    href={`/blogs?category_id=${item?._id}`}
                                >

                                    <span className='capitalize'>{item?.name && item?.name[lang]}</span>
                                    {item?.subcategories?.length > 0 && <IoIosArrowForward className='ml-auto hidden md:block'></IoIosArrowForward>}
                                    {
                                        item?.subcategories.length > 0
                                        &&
                                        <div className='hidden group-hover:block'>
                                            <div className='flex flex-col md:absolute top-0 -right-56  bg-White_Color w-48 md:w-56 text-black  rounded-lg'>
                                                {
                                                    item?.subcategories?.map((sub) =>
                                                        <Link key={sub?._id} href={`/blogs/?subcategory_id=${sub?._id}`} className='px-4 py-3 shadow-md hover:bg-Primary_Color hover:text-white  rounded-lg text-sm md:text-base '>{sub?.name && sub?.name[lang]}</Link>
                                                    )}
                                            </div>
                                        </div>
                                    }
                                </Link>
                            )}
                        </Menu.Item>)
                    }
                </div>
                {/* {
                    topic?.length > 6 && <div className='flex justify-center'>
                        <Link href={'/all-category'} className='rounded-lg text-sm md:text-lg py-3 hover:text-Primary_Color hover:underline'>{i18n?.t('View All')}</Link>
                    </div>
                } */}
            </Menu.Items>
        </>
    );
};

export default DropdownMenu;