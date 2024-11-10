"use client";

import { Suspense } from 'react';
import { postUnSubscribe } from '@/helpers/backend_helper';
import { message } from 'antd';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const UnSubscribePage = () => {
    const searchParam = useSearchParams();  // Appel direct sans condition
    const email = searchParam.get('email'); // Extraction du paramètre email
    const [unsubscribeMessage, setUnsubscribeMessage] = useState('');

    useEffect(() => {
        if (email) {
            postUnSubscribe({ email })
                .then((res) => {
                    console.log('res', res);
                    setUnsubscribeMessage(res?.msg);
                })
                .catch((err) => {
                    setUnsubscribeMessage(err?.msg || 'Unknown error');
                });
        }
    }, [email]); // Re-déclenchement à chaque changement de l'email

    return (
        <div className='flex flex-col h-screen w-screen justify-center items-center'>
            <h2 className='header_2'>
                {unsubscribeMessage}
            </h2>
            <Link className='header_4 text-Primary_Color mt-4' href="/">
                Return Home
            </Link>
        </div>
    );
};

const WrappedUnSubscribePage = () => (
    <Suspense fallback={<div>Loading...</div>}>
        <UnSubscribePage />
    </Suspense>
);

export default WrappedUnSubscribePage;
