import React, { useEffect, useState } from "react";
import NoSugar from "@svg/SugarSize/NoSugar";
import SmallSugar from "@svg/SugarSize/SmallSugar";
import LargeSugar from "@svg/SugarSize/LargeSugar";
import MediumSugar from "@svg/SugarSize/MediumSugar";

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

  const updateOpacities = (index: number, opacity: number) => {
    if (opacity === 1) {
      const updatedOpacities = [...opacitiesSugar];
      updatedOpacities[index] = opacity;
      setOpacitiesSugarHover(updatedOpacities);
    } else {
      if (opacitiesSugar[index] !== 1) {
        const updatedOpacities = [...opacitiesSugar];
        updatedOpacities[index] = 0.4;
        setOpacitiesSugarHover(updatedOpacities);
      }
    }
  };

  const sugarComponents = [
    <NoSugar key={0} opacitiesSugar={opacitiesSugarHover[0] ?? 0} />,
    <SmallSugar key={1} opacitiesSugar={opacitiesSugarHover[1] ?? 0} />,
    <MediumSugar key={2} opacitiesSugar={opacitiesSugarHover[2] ?? 0} />,
    <LargeSugar key={3} opacitiesSugar={opacitiesSugarHover[3] ?? 0} />,
  ];
  return (
    <>
      <div className="m-6 flex flex-row items-center">
        <div className="select-none text-[20px] text-[#715D55]">Sugar</div>
        <div className="m-auto flex w-[60%] flex-row items-center justify-evenly">
          {opacitiesSugarHover.map(
            (opacity, index) =>
              opacity && (
                <div
                  key={index}
                  onClick={() => newSugarAmount(index)}
                  onMouseEnter={() => updateOpacities(index, 1)}
                  onMouseLeave={() => updateOpacities(index, 0)}
                >
                  {sugarComponents[index]}
                </div>
              ),
          )}
        </div>
      </div>
    </>
  );
};

export default SugarAmount;
