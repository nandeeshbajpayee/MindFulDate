import React from "react";
import LoveCalculator from "./LoveCalculator";
import MiniCard from "../Section2/MiniCard";
const Section3 = () => {
  return (
    <div
      className="section3 h-[1000px] w-full bg-cover bg-no-repeat flex flex-col justify-center items-center "
      style={{
        backgroundImage: `url("https://demos.codexcoder.com/themeforest/html/ollya/assets/images/bg-img/pageheader.jpg")`,
      }}
    >
      <LoveCalculator />
      <h1 className="quotation text-[5rem] font-bold text-cyan-800 mt-[1rem]">
        Why Choose MindfulAi
      </h1>
      <h3 className="quotation-desc text-[1.5rem] text-gray-500 ">
        Our dating platform is like a breath of fresh air. Clean and trendy
        design with <br /> ready to use features we are sure you will love.
      </h3>
      <div className="mini-cards flex gap-[2rem] flex-wrap items-center justify-center">
        <MiniCard
          cardLogo="https://demos.codexcoder.com/themeforest/html/ollya/assets/images/about/01.jpg"
          feature="Simple To Use"
          miniCardDesc="Simple steps to follow to have a matching connection."
          color="purple"
        />
        <MiniCard
          cardLogo="https://demos.codexcoder.com/themeforest/html/ollya/assets/images/about/02.jpg"
          feature="Smart Matching"
          miniCardDesc="Create connections with users that are like you."
          color="red"
        />
        <MiniCard
          cardLogo="https://demos.codexcoder.com/themeforest/html/ollya/assets/images/about/icon/03.png"
          feature="Filter Very Fast"
          miniCardDesc="Don’t waste your time! Find only what you are interested"
          color="orange"
        />
        <MiniCard
          cardLogo="https://demos.codexcoder.com/themeforest/html/ollya/assets/images/about/04.jpg"
          feature="Cool Community"
          miniCardDesc="BuddyPress network is full of cool members."
          color="green"
        />
      </div>
    </div>
  );
};

export default Section3;
