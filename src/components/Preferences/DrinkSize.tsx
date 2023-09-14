import React, { useEffect, useState } from "react";
import Cappuccino from "@svg/Coffee/Cappuccino";
import Latte from "@svg/Coffee/Latte";
import Mocha from "@svg/Coffee/Mocha";
import Espresso from "@svg/Coffee/Espresso";
import Macchiato from "@svg/Coffee/Macchiato";

interface SizeProps {
  newDrinkSize: (size: number) => void;
  opacities: number[];
  drinkName: string;
}

const cupSizeComponents: Record<
  string,
  React.ComponentType<{ opacities: number; size: number }>
> = {
  Cappuccino,
  Espresso,
  Macchiato,
  Mocha,
  Latte,
};

const DrinkSize = ({ newDrinkSize, opacities, drinkName }: SizeProps) => {
  const [opacitiesSizeHover, setOpacitiesSizeHover] = useState([...opacities]);
  const CupComponent = cupSizeComponents[drinkName];
  useEffect(() => {
    setOpacitiesSizeHover(opacities);
  }, [opacities]);

  const updateOpacities = (index: number, opacity: number) => {
    if (opacity === 1) {
      const updatedOpacities = [...opacities];
      updatedOpacities[index] = opacity;
      setOpacitiesSizeHover(updatedOpacities);
    } else {
      if (opacities[index] !== 1) {
        const updatedOpacities = [...opacities];
        updatedOpacities[index] = 0.4;
        setOpacitiesSizeHover(updatedOpacities);
      }
    }
  };

  return (
    <div className="mx-6 my-5 flex flex-row items-center">
      <div className="select-none text-[20px] text-[#715D55]">Size</div>
      <div className="m-auto flex w-[60%] flex-row items-end justify-evenly">
        {opacitiesSizeHover.map((opacity, index) => (
          <div
            key={index}
            onClick={() => newDrinkSize(index)}
            onMouseEnter={() => updateOpacities(index, 1)}
            onMouseLeave={() => updateOpacities(index, 0)}
          >
            {opacitiesSizeHover[0] && CupComponent && (
              <CupComponent opacities={opacity} size={index} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DrinkSize;
