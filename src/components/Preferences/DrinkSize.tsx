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

const smallCupComponentMap: Record<
  string,
  React.ComponentType<{ opacities: number }>
> = {
  Macchiato: SmallMacchiato,
  Espresso: SmallEspresso,
  Mocha: SmallMocha,
  Latte: SmallLatte,
  Cappuccino: SmallCappuccino,
};
const mediumCupComponentMap: Record<
  string,
  React.ComponentType<{ opacities: number }>
> = {
  Macchiato: MediumMacchiato,
  Espresso: MediumEspresso,
  Mocha: MediumMocha,
  Latte: MediumLatte,
  Cappuccino: MediumCappuccino,
};
const largeCupComponentMap: Record<
  string,
  React.ComponentType<{ opacities: number }>
> = {
  Macchiato: LargeMacchiato,
  Espresso: LargeEspresso,
  Mocha: LargeMocha,
  Latte: LargeLatte,
  Cappuccino: LargeCappuccino,
};

const DrinkSize = ({ newDrinkSize, opacities, drinkName }: SizeProps) => {
  const [opacitiesSizeHover, setOpacitiesSizeHover] = useState([...opacities]);
  const SmallCupComponent = smallCupComponentMap[drinkName];
  const MediumCupComponent = mediumCupComponentMap[drinkName];
  const LargeCupComponent = largeCupComponentMap[drinkName];
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
      <div className="select-none text-[20px] text-[#715D55]">Size</div>
      <div className="m-auto flex w-[60%] flex-row items-end justify-evenly">
        <div
          onClick={() => newDrinkSize(0)}
          onMouseEnter={() => updateOpacitiesOne(0)}
          onMouseLeave={() => updateOpacitiesZero(0)}
        >
          {opacitiesSizeHover[0] && SmallCupComponent && (
            <SmallCupComponent opacities={opacitiesSizeHover[0]} />
          )}
        </div>
        <div
          onClick={() => newDrinkSize(1)}
          onMouseEnter={() => updateOpacitiesOne(1)}
          onMouseLeave={() => updateOpacitiesZero(1)}
        >
          {opacitiesSizeHover[1] && MediumCupComponent && (
            <MediumCupComponent opacities={opacitiesSizeHover[1]} />
          )}
        </div>
        <div
          onClick={() => newDrinkSize(2)}
          onMouseEnter={() => updateOpacitiesOne(2)}
          onMouseLeave={() => updateOpacitiesZero(2)}
        >
          {opacitiesSizeHover[2] && LargeCupComponent && (
            <LargeCupComponent opacities={opacitiesSizeHover[2]} />
          )}
        </div>
      </div>
    </div>
  );
};

export default DrinkSize;
