import React, { useEffect, useState } from "react";
import Cream from "@svg/Additions/Cream";
import Vanilla from "@svg/Additions/Vanilla";

interface AdditionsProps {
  manageAdditions: (item: number) => void;
  opacitiesAdditions: number[];
}
const Additions = ({ manageAdditions, opacitiesAdditions }: AdditionsProps) => {
  const [opacitiesAdditionsHover, setOpacitiesAdditionsHover] = useState([
    ...opacitiesAdditions,
  ]);
  useEffect(() => {
    setOpacitiesAdditionsHover(opacitiesAdditions);
  }, [opacitiesAdditions]);

  const updateOpacitiesOne = (index: number) => {
    const updatedOpacities = [...opacitiesAdditions];
    updatedOpacities[index] = 1;
    setOpacitiesAdditionsHover(updatedOpacities);
  };
  const updateOpacitiesZero = (index: number) => {
    if (opacitiesAdditions[index] !== 1) {
      const updatedOpacities = [...opacitiesAdditions];
      updatedOpacities[index] = 0.4;
      setOpacitiesAdditionsHover(updatedOpacities);
    }
  };
  return (
    <div className="m-6 flex flex-row items-center">
      <div className="select-none text-[20px] text-[#715D55]">Additions</div>
      <div className="m-auto ml-2 flex w-[60%] flex-row items-center justify-evenly">
        <div
          onClick={() => manageAdditions(0)}
          onMouseEnter={() => updateOpacitiesOne(0)}
          onMouseLeave={() => updateOpacitiesZero(0)}
        >
          {opacitiesAdditionsHover[0] && (
            <Cream opacitiesAdditions={opacitiesAdditionsHover[0]} />
          )}
        </div>
        <div
          onClick={() => manageAdditions(1)}
          onMouseEnter={() => updateOpacitiesOne(1)}
          onMouseLeave={() => updateOpacitiesZero(1)}
        >
          {opacitiesAdditionsHover[1] && (
            <Vanilla opacitiesAdditions={opacitiesAdditionsHover[1]} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Additions;
