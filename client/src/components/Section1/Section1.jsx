import React from "react";
import section1Bg from "./bg-section1.jpg";
import Ladki from "./ladki.png";
import privacy from "./privacy.png";
import verified from "./verified.png";
import bestmatches from "./best-matches.png";
import { GoArrowRight } from "react-icons/go";
import {Link} from 'react-router-dom';
import "./section1.css";
const Section1 = () => {
  return (
    <div
      className="section1 w-full h-[700px] mt-20 flex justify-around items-center"
      style={{ backgroundImage: `url(${section1Bg})` }}
    >
      <div className="section1-content">
        <h1 className="text-[4rem] font-bold text-sky-700">
          New Places,
          <br /> Unforgettable Dating.
        </h1>
        <h2 className="text-[2rem] text-red-500 font-thin">
          Confess your Crush Anonomously...
        </h2>
        <button className="flex items-center text-[2rem] bg-red-400 text-white rounded p-2 mt-[40px]">
         <Link to='/confess'>Confess Anonymously</Link> 
          <GoArrowRight />
        </button>
      </div>
      <div className="ladki mt-[6.5rem]">
        <img src={Ladki} alt="" srcset=""  className="hidden sm:block"/>
      </div>
      <div className="section1-props ">
        <img src={privacy} alt="" srcset="" />
        <img src={verified} alt="" srcset="" />
        <img src={bestmatches} alt="" srcset="" />
      </div>
    </div>
  );
};

export default Section1;
