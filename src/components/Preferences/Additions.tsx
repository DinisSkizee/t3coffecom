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

  const updateOpacities = (index: number, opacity: number) => {
    if (opacity === 1) {
      const updatedOpacities = [...opacitiesAdditions];
      updatedOpacities[index] = opacity;
      setOpacitiesAdditionsHover(updatedOpacities);
    } else {
      if (opacitiesAdditions[index] !== 1) {
        const updatedOpacities = [...opacitiesAdditions];
        updatedOpacities[index] = 0.4;
        setOpacitiesAdditionsHover(updatedOpacities);
      }
    }
  };

  return (
    <div className="m-6 flex flex-row items-center">
      <div className="select-none text-[20px] text-[#715D55]">Additions</div>
      <div className="m-auto ml-2 flex w-[60%] flex-row items-center justify-evenly">
        {opacitiesAdditionsHover.map((opacity, index) => (
          <div
            key={index}
            onClick={() => manageAdditions(index)}
            onMouseEnter={() => updateOpacities(index, 1)}
            onMouseLeave={() => updateOpacities(index, 0)}
          >
            {opacity &&
              (index === 0 ? (
                <Cream opacitiesAdditions={opacity} />
              ) : (
                <Vanilla opacitiesAdditions={opacity} />
              ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Additions;
