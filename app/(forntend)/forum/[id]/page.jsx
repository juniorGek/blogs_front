/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { fetchQuestionDetails } from "@/helpers/backend_helper";
import { useFetch } from "@/helpers/hooks";

import QuestionCard2 from "@/components/common/card/QuestionCard2";
import LatestQuesSidebar from "@/components/common/LatestQuesSidebar";


const Page = () => {
    const para = useParams();

    const [question, getQuestion] = useFetch(fetchQuestionDetails, {}, false);

    useEffect(() => {
        if (!!para?.id) {
            getQuestion({
                _id: para?.id,
            });
        }
    }, [para?.id]);

    return (
        <section className="dark:bg-BG_Color py-10 answer">
            <div className="container flex gap-4 dark:text-[#ebebeb]">
                <div className="md:basis-2/3 flex flex-col gap-3 md:w-fit w-full">
                    <QuestionCard2 data={question} footer={true} />
                    <div className="flex justify-center py-8">
                        <Link href='/forum' className=' text-Font1_Color dark:text-white flex items-center dark:hover:text-Primary_Color hover:text-Primary_Color duration-300 header_4 gap-2'>View Forum <img src="/view-arrow.png" width={60} alt="" /></Link>
                    </div>
                </div>

                <div className="basis-1/3 md:flex gap-2 hidden">
                    <LatestQuesSidebar />
                </div>
            </div>
        </section>
    );
};

export default Page;

