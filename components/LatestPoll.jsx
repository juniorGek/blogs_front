"use client";

import { useI18n } from "@/context/i18n";
import { useFetch } from "@/helpers/hooks";
import Link from 'next/link';
import Image from 'next/image';
import { fetchPoll } from "@/helpers/backend_helper";
import PollCard from "./PollCard";


const LatestPolls = () => {
    const i18n = useI18n();
    const [polls, getPolls] = useFetch(fetchPoll, { size: 3 })
    const { lang } = useI18n();

    return (
        <section className='bg-white dark:bg-BG_Color py-10'>
            <div className="container mx-auto ">
                <div className="flex md:justify-between justify-center ">
                    <h1 className='text-center md:header_1 header_3 text-Font1_Color dark:text-white mb-10'>{i18n?.t('Latest Polls')}</h1>
                    <Link href='/poll' className=' text-Font1_Color dark:text-white flex items-center dark:hover:text-Primary_Color hover:text-Primary_Color duration-300 header_4 gap-2'>{i18n?.t('Explore All Polls')} <img src="/view-arrow.png" width={60} alt="" /></Link>

                </div>
                <div className="flex">
                    <div className="w-full grid lg:grid-cols-3 mf:grid-cols-2 grid-cols-1 gap-6">
                        {polls?.docs?.map((item, index) => (
                            <div key={index}> <PollCard data={item} getData={getPolls} /></div>
                        ))}

                    </div>
                </div>

            </div>
        </section>
    );
};

export default LatestPolls;

