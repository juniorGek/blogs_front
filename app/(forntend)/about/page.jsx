'use client'
import React from 'react'
import { useFetch } from '@/helpers/hooks';
import { fetchSiteSettings } from '@/helpers/backend_helper';
import { useI18n } from '@/context/i18n';

const Page = () => {
    const i18n = useI18n();
    const [site] = useFetch(fetchSiteSettings);
    const {lang} = useI18n();
    // console.log(site)
    return (
        <section className='dark:bg-BG_Color bg-white py-10'>
            <div className="container mx-auto">
                <div className="">
                    <h1 className='header_1 pb-7 dark:text-white text-Font1_Color'>{i18n?.t('About Us')}</h1>
                    <p className='dark:text-white text-Font1_Color paragraph_1 text-justify'>
                        {
                            site?.about_page_description && site?.about_page_description[lang]
                        }
                    </p>
                </div>
            </div>
        </section>
    )
}

export default Page