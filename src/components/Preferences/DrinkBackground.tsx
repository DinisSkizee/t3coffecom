import React from "react";
import Macchiato from "../svg/Coffee/Macchiato";
import Espresso from "../svg/Coffee/Espresso";
import Mocha from "../svg/Coffee/Mocha";
import Latte from "../svg/Coffee/Latte";
import Cappuccino from "../svg/Coffee/Cappuccino";

const DrinkBackground = ({ drink }: { drink: string }) => {
  return (
    <div className="flex h-[210px] items-center justify-center bg-background-light">
      {drink === "Macchiato" && (
        <Macchiato className="h-[100px] drop-shadow-strDrop" />
      )}
      {drink === "Espresso" && (
        <Espresso className="h-[100px] drop-shadow-strDrop" />
      )}
      {drink === "Mocha" && <Mocha className="h-[100px] drop-shadow-strDrop" />}
      {drink === "Latte" && <Latte className="h-[100px] drop-shadow-strDrop" />}
      {drink === "Cappuccino" && (
        <Cappuccino className="h-[85px] drop-shadow-strDrop" />
      )}
    </div>
  );
};

export default DrinkBackground;
