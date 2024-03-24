import React from "react";
import { Link } from "react-router-dom";
import { IoIosCall } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";
import { FaFacebookSquare } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { FaYoutube } from "react-icons/fa";

const MiniNavBar = () => {
  return (
    <div className="mini-nav-container w-full h-10  bg-red-400 flex justify-center items-center text-[10px]  sm:text-[1.2rem]">
      <div className="left-mini flex w-2/4 justify-center items-center gap-3">
        <IoIosCall className="text-lg size-25" />
        +91 7906715293
        <FaLocationDot /> Mathura,Uttar Pradesh
      </div>
      <div className="mini-nav-right flex w-2/4 justify-center gap-3 items-center">
        <Link to="/facebook" className="flex justify-center items-center">
          <FaFacebookSquare className="text-lg size-25" />
          Facebook
        </Link>
        <Link to="/instagram" className="flex justify-center items-center">
          <AiFillInstagram className="text-lg size-25" />
          Instagram
        </Link>
        <Link to="/youtube" className="flex justify-center items-center">
          <FaYoutube className="text-lg size-25" />
          Youtube
        </Link>
      </div>
    </div>
  );
};

export default MiniNavBar;
