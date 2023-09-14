import React, { useEffect, useState } from "react";
import NoSugar from "../svg/SugarSize/NoSugar";
import SmallSugar from "../svg/SugarSize/SmallSugar";
import MediumSugar from "../svg/SugarSize/MediumSugar";
import LargeSugar from "../svg/SugarSize/LargeSugar";

interface SugarProps {
  newSugarAmount: (amount: number) => void;
  opacitiesSugar: number[];
}

const SugarAmount = ({ newSugarAmount, opacitiesSugar }: SugarProps) => {
  const [opacitiesSugarHover, setOpacitiesSugarHover] = useState([
    ...opacitiesSugar,
  ]);
  useEffect(() => {
    setOpacitiesSugarHover(opacitiesSugar);
  }, [opacitiesSugar]);

  const updateOpacitiesOne = (index: number) => {
    const updatedOpacities = [...opacitiesSugar];
    updatedOpacities[index] = 1;
    setOpacitiesSugarHover(updatedOpacities);
  };
  const updateOpacitiesZero = (index: number) => {
    if (opacitiesSugar[index] !== 1) {
      const updatedOpacities = [...opacitiesSugar];
      updatedOpacities[index] = 0.4;
      setOpacitiesSugarHover(updatedOpacities);
    }
  };
  return (
    <>
      <div className="m-6 flex flex-row items-center">
        <div className="select-none text-[20px] text-[#715D55]">Sugar</div>
        <div className="m-auto flex w-[60%] flex-row items-center justify-evenly">
          {opacitiesSugarHover[0] && (
            <div
              onClick={() => newSugarAmount(0)}
              onMouseEnter={() => updateOpacitiesOne(0)}
              onMouseLeave={() => updateOpacitiesZero(0)}
            >
              <NoSugar opacitiesSugar={opacitiesSugarHover[0]} />
            </div>
          )}
          {opacitiesSugarHover[1] && (
            <div
              onClick={() => newSugarAmount(1)}
              onMouseEnter={() => updateOpacitiesOne(1)}
              onMouseLeave={() => updateOpacitiesZero(1)}
            >
              <SmallSugar opacitiesSugar={opacitiesSugarHover[1]} />
            </div>
          )}
          {opacitiesSugarHover[2] && (
            <div
              onClick={() => newSugarAmount(2)}
              onMouseEnter={() => updateOpacitiesOne(2)}
              onMouseLeave={() => updateOpacitiesZero(2)}
            >
              <MediumSugar opacitiesSugar={opacitiesSugarHover[2]} />
            </div>
          )}
          {opacitiesSugarHover[3] && (
            <div
              onClick={() => newSugarAmount(3)}
              onMouseEnter={() => updateOpacitiesOne(3)}
              onMouseLeave={() => updateOpacitiesZero(3)}
            >
              <LargeSugar opacitiesSugar={opacitiesSugarHover[3]} />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SugarAmount;
