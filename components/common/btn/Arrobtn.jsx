import Link from 'next/link';
import React from 'react';

const Arrobtn = ({ children }) => {
    return (
        <div className="">
            <div  className='flex items-center dark:text-Primary_Color hover:text-Primary_Color duration-300 header_4 '>{children} <div className="ml-2"><img src="view-arrow.png" width={50} alt="" /></div></div>
        </div>
    );
};

export default Arrobtn;