import React from "react";
import Cappuccino from "@svg/Coffee/Cappuccino";
import Latte from "@svg/Coffee/Latte";
import Mocha from "@svg/Coffee/Mocha";
import Espresso from "@svg/Coffee/Espresso";
import Macchiato from "@svg/Coffee/Macchiato";
import { useDrinkDetails } from "@state/store";

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

const DrinkSize = () => {
  const { newDrinkSize, drinkName, updateSizeOpacities, opacitiesSizeHover } =
    useDrinkDetails();

  const CupComponent = cupSizeComponents[drinkName];

  return (
    <div className="mx-6 my-5 flex flex-row items-center">
      <div className="select-none text-[20px] text-dark-brown">Size</div>
      <div className="m-auto flex w-[60%] flex-row items-end justify-evenly">
        {opacitiesSizeHover.map((opacity, index) => (
          <div
            key={index}
            onClick={() => newDrinkSize(index)}
            onMouseEnter={() => updateSizeOpacities(index, 1)}
            onMouseLeave={() => updateSizeOpacities(index, 0)}
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
