import React, { useState } from "react";
import {message} from 'antd';
const LoveCalculator = () => {
  const [result, setResult] = useState(0);
  const [yourName, setYourName] = useState("");
  const [crushName, setCrushName] = useState("");

  const calculateLove = () => {
    if (!yourName || !crushName) {
      setResult(0);
      message.error("Enter the Names Properly")
    } else {
      const lovePercentage = Math.floor(Math.random() * (100 - 60 + 1) + 60);
      if(!result)
      setResult(lovePercentage);
    }
  };

  return (
    <div className="mini-card h-max w-[700px] py-[2rem] bg-white  mt-[-5rem] p-[2rem] flex flex-col   rounded items-center transition-transform duration-300 ease-in-out shadow-lg">
      <h1 className="text-[2rem] text-red-400 font-bold">
        Calculate Love <br /> Between You and Your Crush
      </h1>
      <div className="calc-wrap flex">
        <div className="fields text-[1.3rem] mt-[1rem]">
          <div className="field1">
            <label htmlFor="your-name" className="text-[2rem]">
              Your Name: {"   "}
            </label>
            <input
              type="text"
              className="outline-none p-1 border-b-2 border-red-500 border-solid w-[200px]"
              onChange={(e) => setYourName(e.target.value)}
            />
          </div>
          <div className="field2">
            <label htmlFor="crush-name" className="text-[2rem]">
              Crush Name:{"    "}
            </label>
            <input
              type="text"
              className="outline-none p-1 border-b-2 border-red-500 border-solid w-[200px]"
              onChange={(e) => setCrushName(e.target.value)}
            />
          </div>
        </div>
      </div>
      <button
        className="p-2 rounded bg-red-500 text-white mt-[2rem] text-[2rem] font-thin"
        onClick={calculateLove}
      >
        Calculate
      </button>
      {result === 0 ? (
        ""
      ) : (
        <div className="result text-[5rem] text-red-500">{result}%</div>
      )}
    </div>
  );
};

export default LoveCalculator;
