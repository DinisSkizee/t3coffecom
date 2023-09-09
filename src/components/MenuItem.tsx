import Link from "next/link";
import React from "react";
import ThinBrownLine from "./ThinBrownLine";
import Espresso from "./svg/Coffee/Espresso";
import Cappuccino from "./svg/Coffee/Cappuccino";
import Macchiato from "./svg/Coffee/Macchiato";
import Mocha from "./svg/Coffee/Mocha";
import Latte from "./svg/Coffee/Latte";

interface MenuItemProps {
  pathname: string;
  query: Record<string, any>;
  iconName: string;
  name: string;
}
type IconComponents = Record<string, JSX.Element>;

const ItemName = ({ name }: { name: string }) => {
  return (
    <div className="ml-6 pt-1 text-[20px] font-medium text-[#2D140D]">
      {name}
    </div>
  );
};

const ItemArrow = () => {
  return (
    <div className="ml-auto">
      <svg
        width="8"
        height="13"
        viewBox="0 0 8 13"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          opacity="0.81942"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0 1.5L1.5 0L8 6.5L1.5 13L0 11.5L5 6.5L0 1.5Z"
          fill="#C69A80"
        />
      </svg>
    </div>
  );
};

const MenuItem = ({ pathname, query, iconName, name }: MenuItemProps) => {
  const iconComponents: IconComponents = {
    espresso: <Espresso className="h-[49] w-[50px] drop-shadow-strDrop" />,
    cappuccino: <Cappuccino className="h-[49] w-[50px] drop-shadow-strDrop" />,
    macchiato: <Macchiato className="h-[56] w-[38px] drop-shadow-strDrop" />,
    mocha: <Mocha className="h-[56] w-[38px] drop-shadow-strDrop" />,
    latte: <Latte className="h-[56] w-[38px] drop-shadow-strDrop" />,
  };

  const iconComponent = iconComponents[iconName.toLowerCase()];
  return (
    <>
      <Link
        href={{ pathname, query }}
        className="mx-7 flex h-[87px] items-center"
      >
        <div className="mb-1 flex w-[60px] justify-center">{iconComponent}</div>
        <ItemName name={name} />
        <ItemArrow />
      </Link>
      <ThinBrownLine />
    </>
  );
};

export default MenuItem;
