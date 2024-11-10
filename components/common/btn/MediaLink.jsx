import React from "react";
import { RiFacebookLine, RiTwitterXFill } from "react-icons/ri";
import { BiLogoFacebook } from "react-icons/bi";
import {
  GrFacebook,
  GrFacebookOption,
  GrInstagram,
  GrLinkedinOption,
  GrTwitter,
} from "react-icons/gr";
import { BsWhatsapp, BsYoutube } from "react-icons/bs";
import Link from "next/link";
import { FaXTwitter } from "react-icons/fa6";

const MediaLink = ({ data }) => {

  return (
    <div className="flex items-center space-x-5 text-lg">
      {!!data?.facebook && (
        <Link href={data?.facebook}>
          <GrFacebookOption className="cursor-pointer duration-300 hover:text-Primary_Color"></GrFacebookOption>
        </Link>
      )}
      {!!data?.twitter && (
        <Link href={data?.twitter}>
          <FaXTwitter className="cursor-pointer duration-300 hover:text-Primary_Color"></FaXTwitter>
        </Link>
      )}
      {!!data?.linkedin && (
        <Link href={data?.linkedin}>
          <GrLinkedinOption className="cursor-pointer duration-300 hover:text-Primary_Color"></GrLinkedinOption>
        </Link>
      )}
      {!!data?.instagram && (
        <Link href={data?.instagram}>
          <GrInstagram className="cursor-pointer duration-300 hover:text-Primary_Color"></GrInstagram>
        </Link>
      )}
      {!!data?.whatsapp && (
        <Link href={`https://wa.me/${data?.whatsapp}`}>
          <BsWhatsapp className="cursor-pointer duration-300 hover:text-Primary_Color"></BsWhatsapp>
        </Link>
      )}
      {!!data?.youtube && (
        <Link href={data?.youtube}>
          <BsYoutube className="cursor-pointer duration-300 hover:text-Primary_Color"></BsYoutube>
        </Link>
      )}
    </div>
  );
};

export default MediaLink;
