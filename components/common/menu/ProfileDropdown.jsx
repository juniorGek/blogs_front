'use client';
import { useI18n } from '@/context/i18n';
import { useUserContext } from '@/context/user';
import { Menu } from '@headlessui/react';
import { message } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';


const ProfileDropdown = () => {
    const i18n = useI18n();
    const router = useRouter();
    const [messageApi, contextHolder] = message.useMessage();

    const success = (msg) => {
        messageApi.open({
            type: 'success',
            content: msg,
        });
    };

    const warning = (msg) => {
        messageApi.open({
            type: 'warning',
            content: msg,
        });
    };

    const [userIn, setUserIn] = useState('');
    const { user } = useUserContext();
    // console.log('user:', user)
    const close = () => {
        setUserIn('');
        localStorage.removeItem('token');
        if (localStorage.getItem('token') === null) {
            setUserIn('');
            success(i18n?.t('Logout successfully'));
            router.push('/');

        } else {
            warning(i18n?.t('Logout failed'));
        }
    };
    useEffect(() => {
        if (user?.email) {
            setUserIn(user?.email);
        }
        // const user = localStorage.getItem('token');
        setUserIn(localStorage.getItem('token'));
    }, [userIn, user]);

    return (
        <>
            {contextHolder}
            <Menu.Items className="flex flex-col absolute top-12 right-0 bg-white border rounded-lg w-44 md:w-52 z-50 text-Black_Color p-1">
                {
                    userIn ? <>
                        <Menu.Item>
                            {({ active }) => (
                                <Link
                                    className={` flex flex-col items-center gap-2 px-4 py-3  text-sm md:text-lg ${active && 'bg-Primary_Color text-White_Color'} rounded-t-lg`}
                                    href="/edit-profile"
                                >
                                    <h1>{i18n?.t('Profile')}</h1>
                                </Link>
                            )}
                        </Menu.Item>
                        <hr />
                        {
                            user?.role !== 'user' && <Menu.Item>
                                {({ active }) => (
                                    <Link
                                        className={` flex flex-col items-center gap-2 px-4 py-3  text-sm md:text-lg ${active && 'bg-Primary_Color text-White_Color'}`}
                                        href="/admin"
                                    >
                                        <h1>{i18n?.t('Dashboard')}</h1>
                                    </Link>
                                )}
                            </Menu.Item>
                        }
                        <hr />
                        <Menu.Item>
                            {({ active }) => (
                                <div
                                    className={` flex flex-col items-center gap-2 px-4 py-3  text-sm md:text-lg ${active && 'bg-Primary_Color text-White_Color'} rounded-b-lg`} onClick={close}
                                >
                                    <h1 className=' cursor-pointer'>
                                        {i18n?.t('Logout')}
                                    </h1>
                                </div>
                            )}
                        </Menu.Item>

                    </> :
                        <Menu.Item>
                            {({ active }) => (
                                <Link
                                    className={` flex flex-col items-center gap-2 px-4 py-3  text-sm md:text-lg ${active && 'bg-Primary_Color text-White_Color'}`}
                                    href="/login"
                                >
                                    <h1>{i18n?.t('Login')}</h1>
                                    {/* <h1>Logout</h1> */}
                                </Link>
                            )}
                        </Menu.Item>
                }

            </Menu.Items>
        </>
    );
};

export default ProfileDropdown;