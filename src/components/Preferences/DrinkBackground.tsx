import React from "react";
import Mocha from "@svg/Coffee/Mocha";
import Latte from "@svg/Coffee/Latte";
import Espresso from "@svg/Coffee/Espresso";
import Macchiato from "@svg/Coffee/Macchiato";
import Cappuccino from "@svg/Coffee/Cappuccino";

const drinkComponentMap: Record<
  string,
  React.ComponentType<{ className?: string; size: number }>
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
        <DrinkComponent size={4} className="drop-shadow-strDrop" />
      )}
    </div>
  );
};

export default DrinkBackground;
