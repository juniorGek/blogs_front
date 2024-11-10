import { useI18n } from '@/context/i18n'
import { Tooltip } from 'antd'
import { motion } from 'framer-motion'
import Link from 'next/link'
import React from 'react'

const TopicCard = ({ item }) => {
    const i18n = useI18n()
    let {lang,languages} = useI18n()

    return (
        <div className=" group w-full mb-5">
            <div className="dark:border rounded-[16px]">
                <div className="h-[210px] w-full rounded-t-[16px] overflow-hidden">
                    <motion.div
                        whileHover={{ scale: [null, 1.2] }}
                        transition={{ duration: 0.5 }}
                        className='h-full w-full'
                    >
                        <img className='h-full w-full rounded-t-[16px] object-cover' src={item.image || "/Logo (1).png"} alt="" />
                    </motion.div>
                </div>
                <div className="dark:bg-BG_Color bg-white p-5 rounded-b-[16px]" style={{
                    boxShadow: "0px 1px 5px -1px #00000033"
                }}>
                    {/* {console.log("🚀 ~ file: TopicCard.jsx:24 ~ TopicCard ~ item:", item)} */}
                    {item?.name[lang]?.slice(0, 10) < item?.name[lang]  ?
                        <Tooltip title={item?.name && item?.name[lang]}>
                            <div className="text-center pb-5">
                                <Link href={`/blogs?category_id=${item._id}`} className=' header_2 text-black group-hover:text-Primary_Color duration-500 capitalize  dark:text-White_Color'>{item?.name && item?.name[lang].slice(0, 8)}<span className='text-Primary_Color'>...</span></Link>
                            </div>
                        </Tooltip> : <div className="text-center pb-5">
                            <Link href={`/blogs?category_id=${item._id}`} className=' dark:text-White_Color header_2 text-black group-hover:text-Primary_Color duration-500 capitalize'>{item?.name && item?.name[lang]}</Link>
                        </div>
                    }
                    <div className="flex items-center gap-3">
                        <div className="w-[2px] bg-Primary_Color h-5"></div>
                        <p className='paragraph_1 text-Font2_Color'>{item?.number_of_blogs} {i18n?.t('Article')}</p>
                        {/* <p className='paragraph_1 text-Font2_Color'>{item?.total_views > 999 ? `${(item?.total_views / 1000).toFixed(2)}k` : item?.total_views} {i18n?.t('views')}</p> */}
                    </div>
                </div>
            </div>

        </div>
    )
}

export default TopicCard