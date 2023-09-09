import React, { useEffect, useState } from "react";
import SmallLatte from "../svg/CoffeeSize/Latte/SmallLatte";
import SmallCappuccino from "../svg/CoffeeSize/Cappuccino/SmallCappuccino";
import SmallMocha from "../svg/CoffeeSize/Mocha/SmallMocha";
import SmallEspresso from "../svg/CoffeeSize/Espresso/SmallEspresso";
import SmallMacchiato from "../svg/CoffeeSize/Macchiato/SmallMacchiato";
import MediumLatte from "../svg/CoffeeSize/Latte/MediumLatte";
import MediumCappuccino from "../svg/CoffeeSize/Cappuccino/MediumCappuccino";
import MediumMocha from "../svg/CoffeeSize/Mocha/MediumMocha";
import MediumEspresso from "../svg/CoffeeSize/Espresso/MediumEspresso";
import MediumMacchiato from "../svg/CoffeeSize/Macchiato/MediumMacchiato";
import LargeEspresso from "../svg/CoffeeSize/Espresso/LargeEspresso";
import LargeMocha from "../svg/CoffeeSize/Mocha/LargeMocha";
import LargeCappuccino from "../svg/CoffeeSize/Cappuccino/LargeCappuccino";
import LargeLatte from "../svg/CoffeeSize/Latte/LargeLatte";
import LargeMacchiato from "../svg/CoffeeSize/Macchiato/LargeMacchiato";

interface SizeProps {
  newDrinkSize: (size: number) => void;
  opacities: number[];
  drinkName: string;
}
const DrinkSize = ({ newDrinkSize, opacities, drinkName }: SizeProps) => {
  const [opacitiesSizeHover, setOpacitiesSizeHover] = useState([...opacities]);
  useEffect(() => {
    setOpacitiesSizeHover(opacities);
  }, [opacities]);

  const updateOpacitiesOne = (index: number) => {
    const updatedOpacities = [...opacities];
    updatedOpacities[index] = 1;
    setOpacitiesSizeHover(updatedOpacities);
  };
  const updateOpacitiesZero = (index: number) => {
    if (opacities[index] !== 1) {
      const updatedOpacities = [...opacities];
      updatedOpacities[index] = 0.4;
      setOpacitiesSizeHover(updatedOpacities);
    }
  };
  return (
    <div className="mx-6 my-5 flex flex-row items-center">
      <div className="text-[20px] text-[#715D55]">Size</div>
      <div className="m-auto flex w-[60%] flex-row items-end justify-evenly">
        {/* SMALL CUP */}
        <div
          onClick={() => newDrinkSize(0)}
          onMouseEnter={() => updateOpacitiesOne(0)}
          onMouseLeave={() => updateOpacitiesZero(0)}
        >
          {opacitiesSizeHover[0] && (
            <>
              {drinkName === "Latte" ? (
                <SmallLatte opacities={opacitiesSizeHover[0]} />
              ) : drinkName === "Cappuccino" ? (
                <SmallCappuccino opacities={opacitiesSizeHover[0]} />
              ) : drinkName === "Mocha" ? (
                <SmallMocha opacities={opacitiesSizeHover[0]} />
              ) : drinkName === "Espresso" ? (
                <SmallEspresso opacities={opacitiesSizeHover[0]} />
              ) : drinkName === "Macchiato" ? (
                <SmallMacchiato opacities={opacitiesSizeHover[0]} />
              ) : (
                <SmallMacchiato opacities={opacitiesSizeHover[0]} />
              )}
            </>
          )}
        </div>
        {/* MEDIUM CUP */}
        <div
          onClick={() => newDrinkSize(1)}
          onMouseEnter={() => updateOpacitiesOne(1)}
          onMouseLeave={() => updateOpacitiesZero(1)}
        >
          {opacitiesSizeHover[1] && (
            <>
              {drinkName === "Latte" ? (
                <MediumLatte opacities={opacitiesSizeHover[1]} />
              ) : drinkName === "Cappuccino" ? (
                <MediumCappuccino opacities={opacitiesSizeHover[1]} />
              ) : drinkName === "Mocha" ? (
                <MediumMocha opacities={opacitiesSizeHover[1]} />
              ) : drinkName === "Espresso" ? (
                <MediumEspresso opacities={opacitiesSizeHover[1]} />
              ) : drinkName === "Macchiato" ? (
                <MediumMacchiato opacities={opacitiesSizeHover[1]} />
              ) : (
                <MediumMacchiato opacities={opacitiesSizeHover[1]} />
              )}
            </>
          )}
        </div>
        {/* LARGE CUP */}
        <div
          onClick={() => newDrinkSize(2)}
          onMouseEnter={() => updateOpacitiesOne(2)}
          onMouseLeave={() => updateOpacitiesZero(2)}
        >
          {opacitiesSizeHover[2] && (
            <>
              {drinkName === "Latte" ? (
                <LargeLatte opacities={opacitiesSizeHover[2]} />
              ) : drinkName === "Cappuccino" ? (
                <LargeCappuccino opacities={opacitiesSizeHover[2]} />
              ) : drinkName === "Mocha" ? (
                <LargeMocha opacities={opacitiesSizeHover[2]} />
              ) : drinkName === "Espresso" ? (
                <LargeEspresso opacities={opacitiesSizeHover[2]} />
              ) : drinkName === "Macchiato" ? (
                <LargeMacchiato opacities={opacitiesSizeHover[2]} />
              ) : (
                <LargeMacchiato opacities={opacitiesSizeHover[2]} />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DrinkSize;
