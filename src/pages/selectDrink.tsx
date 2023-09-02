import Head from "next/head";
import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import ThinBrownLine from "../components/ThinBrownLine";
import Macciato from "../components/svg/Coffee/Macciato";
import Espresso from "../components/svg/Coffee/Espresso";
import Mocha from "../components/svg/Coffee/Mocha";
import Latte from "../components/svg/Coffee/Latte";
import Capuccino from "../components/svg/Coffee/Capuccino";
import Link from "next/link";
import BackArrow from "../components/svg/BackArrow";

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

const ItemName = ({ name }: { name: string }) => {
  return (
    <div className="ml-6 pt-1 text-[20px] font-medium text-[#2D140D]">
      {name}
    </div>
  );
};

const SelectDrink = () => {
  return (
    <>
      <Head>
        <title>Select Drink</title>
      </Head>
      <div className="flex h-screen w-full justify-center">
        <div className="flex h-[896px] w-[414px] flex-col bg-white">
          <Header />
          <div className="my-1 flex flex-col">
            {/* Menu header */}
            <div className="mx-7 mb-2 flex items-center">
              {/* COME BACK */}
              <Link href={"/"}>
                <BackArrow />
              </Link>
              <div className="m-auto my-2 text-[24px] text-[#8C746A]">Menu</div>
            </div>
            <ThinBrownLine />
            <Link
              href={{ pathname: "/preferences", query: { drink: "espresso" } }}
              className="mx-7 flex h-[87px] items-center"
            >
              <div className="mb-1 flex w-[60px] justify-center">
                <Espresso className={"drop-shadow-strDrop h-[49] w-[50px]"} />
              </div>
              <ItemName name={"Espresso"} />
              <ItemArrow />
            </Link>
            <ThinBrownLine />
            <Link
              href={{ pathname: "/preferences", query: { drink: "Capuccino" } }}
              className="mx-7 flex h-[87px] items-center"
            >
              <div className="mb-1 flex w-[60px] justify-center">
                <Capuccino className={"drop-shadow-strDrop h-[49] w-[50px]"} />
              </div>
              <ItemName name={"Capuccino"} />
              <ItemArrow />
            </Link>
            <ThinBrownLine />
            <Link
              href={{ pathname: "/preferences", query: { drink: "macciato" } }}
              className="mx-7 flex h-[87px] items-center"
            >
              <div className="mb-1 flex w-[60px] justify-center pr-1.5">
                <Macciato className={"drop-shadow-strDrop h-[56] w-[38px]"} />
              </div>
              <ItemName name={"Macciato"} />
              <ItemArrow />
            </Link>
            <ThinBrownLine />
            <Link
              href={{ pathname: "/preferences", query: { drink: "mocha" } }}
              className="mx-7 flex h-[87px] items-center"
            >
              <div className="mb-1 flex w-[60px] justify-center ">
                <Mocha className={"drop-shadow-strDrop h-[56] w-[38px]"} />
              </div>
              <ItemName name={"Mocha"} />
              <ItemArrow />
            </Link>
            <ThinBrownLine />
            <Link
              href={{ pathname: "/preferences", query: { drink: "latte" } }}
              className="mx-7 flex h-[87px] items-center"
            >
              <div className="mb-1 flex w-[60px] justify-center">
                <Latte className={"drop-shadow-strDrop h-[56] w-[38px]"} />
              </div>
              <ItemName name={"Latte"} />
              <ItemArrow />
            </Link>
            <ThinBrownLine />
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default SelectDrink;
