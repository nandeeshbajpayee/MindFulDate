import React from "react";
import Card from "./Card";
import MiniCard from "./MiniCard";
const Section2 = () => {
  return (
    <div className="section2 h-[1200px] w-full bg-gradient-to-r from-blue-400 to-white flex flex-col justify-center items-center">
      <Card />
      <h1 className="quotation text-[5rem] font-bold text-cyan-800 mt-[2rem]">
        It All Starts With A Date
      </h1>
      <h3 className="quotation-desc text-[1.5rem] text-gray-500 ">
        Learn from them and try to make it to this board. This will for sure{" "}
        <br />
        boost you visibility and increase your chances to find you loved one.
      </h3>
      <div className="mini-cards flex gap-[2rem]">
        <MiniCard
          cardLogo="https://demos.codexcoder.com/themeforest/html/ollya/assets/images/about/icon/01.png"
          totalMembers={699}
          miniCardDesc="Total Members"
          color="red"
        />
        <MiniCard
          cardLogo="https://demos.codexcoder.com/themeforest/html/ollya/assets/images/about/icon/02.png"
          totalMembers={65}
          miniCardDesc="Members Online"
          color="green"
        />
        <MiniCard
          cardLogo="https://demos.codexcoder.com/themeforest/html/ollya/assets/images/about/icon/03.png"
          totalMembers={54}
          miniCardDesc="Women Online"
          color="orange"
        />
        <MiniCard
          cardLogo="https://demos.codexcoder.com/themeforest/html/ollya/assets/images/about/icon/04.png"
          totalMembers={34}
          miniCardDesc="Men Online"
          color="purple"
        />
      </div>
    </div>
  );
};

export default Section2;
