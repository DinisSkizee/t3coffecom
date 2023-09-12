import React from "react";
import Macchiato from "../svg/Coffee/Macchiato";
import Espresso from "../svg/Coffee/Espresso";
import Mocha from "../svg/Coffee/Mocha";
import Latte from "../svg/Coffee/Latte";
import Cappuccino from "../svg/Coffee/Cappuccino";

const drinkComponentMap: Record<
  string,
  React.ComponentType<{ className?: string }>
> = {
  Macchiato: Macchiato,
  Espresso: Espresso,
  Mocha: Mocha,
  Latte: Latte,
  Cappuccino: Cappuccino,
};

const DrinkBackground = ({ drink }: { drink: string }) => {
  const DrinkComponent = drinkComponentMap[drink];
  return (
    <div className="flex h-[210px] items-center justify-center bg-background-light">
      {DrinkComponent && (
        <DrinkComponent className="h-[100px] drop-shadow-strDrop" />
      )}
    </div>
  );
};

export default DrinkBackground;
