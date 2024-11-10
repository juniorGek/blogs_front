import { useI18n } from '@/context/i18n'
import Link from 'next/link'
import React from 'react'

const Tag = ({item}) => {
  let {lang,languages} = useI18n()

  return (
    <Link href={`/blogs?tag_id=${item?._id}`} className="border dark:border-BG_Line_Color border-Light_Line_Color dark:hover:border-Primary_Color hover:border-Primary_Color hover:text-Primary_Color duration-300 rounded inline-block px-4 py-1 header_4 text-Font2_Color mr-3 mb-6">{item.name && item.name[lang]}</Link>
  )
}

export default Tag