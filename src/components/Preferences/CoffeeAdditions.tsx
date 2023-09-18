import React from "react";
import Cream from "@svg/Additions/Cream";
import Vanilla from "@svg/Additions/Vanilla";
import { useDrinkDetails } from "@state/store";

const CoffeeAdditions = () => {
  const { opacitiesAdditionsHover, manageAdditions, updateAdditionOpacities } =
    useDrinkDetails();

  return (
    <div className="m-6 flex flex-row items-center">
      <div className="select-none text-[20px] text-dark-brown">Additions</div>
      <div className="m-auto ml-2 flex w-[60%] flex-row items-center justify-evenly">
        {opacitiesAdditionsHover.map((opacity, index) => (
          <div
            key={index}
            onClick={() => manageAdditions(index)}
            onMouseEnter={() => updateAdditionOpacities(index, 1)}
            onMouseLeave={() => updateAdditionOpacities(index, 0)}
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

export default CoffeeAdditions;
