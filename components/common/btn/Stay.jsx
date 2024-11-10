import { useI18n } from '@/context/i18n';
import { useSite } from '@/context/site';
import { fetchSiteSettings } from '@/helpers/backend_helper';
import { useFetch } from '@/helpers/hooks';
import React from 'react';
import { RiFacebookFill, RiInstagramFill, RiLinkedinFill, RiTwitterXFill } from 'react-icons/ri';

const Stay = () => {
  const i18n = useI18n();
  const [site] = useFetch(fetchSiteSettings);

  return (
    <div className="rounded-lg border border-Font2_Color p-6 ">
      <h1 className="header_4 pb-4 border-b border-Font2_Color text-Font1_Color dark:text-white">
        {i18n?.t('STAY CONNECTED')}
      </h1>
      <div className="">
        {!!site?.stay_connected?.facebook && (
          <div className="group flex justify-between items-center my-8">
            <p
              className="rounded-full py-2 group-hover:bg-Primary_Color duration-300 border group-hover:border-transparent flex items-center justify-center md:header_4 paragrapn_1 md:w-44 px-3 md:px-0 "

            >
              <span className="pe-2 text-Font2_Color dark:text-white">
                <RiFacebookFill />{" "}
              </span>{" "}
              <span className="text-Font1_Color dark:text-white">
                {i18n?.t('Facebook')}
              </span>
            </p>
            <p className="paragraph_2 text-Font1_Color dark:text-white group-hover:text-Primary_Color duration-300">
              {site?.stay_connected?.facebook} {i18n?.t('Followers')}
            </p>
          </div>
        )}

        {!!site?.stay_connected?.twitter && (
          <div className="group flex justify-between items-center my-8">
            <div
              className="rounded-full py-2 group-hover:bg-Primary_Color duration-300 border group-hover:border-transparent flex items-center justify-center md:header_4 paragrapn_1 md:w-44 px-5 md:px-0  "
             
            >
              <p className="pe-2 text-Font2_Color dark:text-white">
                <RiTwitterXFill />{" "}
              </p>{" "}
              <span className="text-Font1_Color dark:text-white">
                {i18n?.t('Twitter')}
              </span>
            </div>
            <p className="paragraph_2 text-Font1_Color dark:text-white group-hover:text-Primary_Color duration-300">
              {site?.stay_connected?.twitter} {i18n?.t('Followers')}
            </p>
          </div>
        )}

        {!!site?.stay_connected?.linkedin && (
          <div className="group flex justify-between items-center my-8">
            <div
              className="rounded-full py-2 group-hover:bg-Primary_Color duration-300 border group-hover:border-transparent flex items-center justify-center md:header_4 paragrapn_1 md:w-44 px-5 md:px-0  "
            
            >
              <p className="pe-2 text-Font2_Color dark:text-white">
                <RiLinkedinFill />{" "}
              </p>{" "}
              <span className="text-Font1_Color dark:text-white">
                {i18n?.t('Linkedin')}
              </span>
            </div>
            <p className="paragraph_2 text-Font1_Color dark:text-white group-hover:text-Primary_Color duration-300">
              {site?.stay_connected?.linkedin} {i18n?.t('Followers')}
            </p>
          </div>
        )}

        {!!site?.stay_connected?.instagram && (
          <div className="group flex justify-between items-center my-8">
            <p
              className="rounded-full py-2 group-hover:bg-Primary_Color duration-300 border group-hover:border-transparent flex items-center justify-center md:header_4 paragrapn_1 md:w-44 px-5 md:px-0  "
             
            >
              <span className="pe-2 text-Font2_Color dark:text-white">
                <RiInstagramFill />{" "}
              </span>{" "}
              <span className="text-Font1_Color dark:text-white">
                {i18n?.t('Instagram')}
              </span>
            </p>
            <p className="paragraph_2 text-Font1_Color dark:text-white group-hover:text-Primary_Color duration-300">
              {site?.stay_connected?.instagram} {i18n?.t('Followers')}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Stay;