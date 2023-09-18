import { updateQueryParams } from "@helpers/updateQueryParams";
import { useDrinkDetails } from "@state/store";
import { useRouter } from "next/router";
import React from "react";

const DrinkDetails = () => {
  const {
    decreaseDrinkAmount,
    increaseDrinkAmount,
    drinkName,
    drinkAmount,
    drinkPrice,
  } = useDrinkDetails();
  const router = useRouter();
  return (
    <div className="mx-6 my-4 flex select-none flex-row">
      <div className="flex flex-col">
        <div className="text-[20px] font-bold text-superdark-brown">
          {drinkName}
        </div>
        <div className="text-[18px] text-darker-brown">
          {Number(drinkPrice).toFixed(2)} GBP
        </div>
      </div>
      <div className="ml-auto flex flex-row items-center gap-4">
        <div className="text-[26px] text-darker-brown">{drinkAmount}</div>
        <div className="flex h-[34px] w-[105px] flex-row justify-between gap-2">
          {/* ADD */}
          <div
            className="flex w-full items-center justify-center rounded-l-full border border-superdark-brown text-[39px] hover:bg-almond-brown hover:drop-shadow-md"
            onClick={() => {
              if (drinkAmount > 0) {
                decreaseDrinkAmount();
                updateQueryParams({
                  drinkName,
                  drinkAmount: drinkAmount - 1,
                  router,
                });
              }
            }}
          >
            <svg width="13" height="3" viewBox="0 0 13 3" fill="none">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M13 2.73145V0.674805H0.101562V2.73145H13Z"
                fill="#2D140D"
              />
            </svg>
          </div>
          {/* REMOVE */}
          <div
            className="flex w-full items-center justify-center rounded-r-full border border-superdark-brown text-[32px] hover:bg-almond-brown hover:drop-shadow-md"
            onClick={() => {
              increaseDrinkAmount();
              updateQueryParams({
                drinkName,
                drinkAmount: drinkAmount + 1,
                router,
              });
            }}
          >
            <svg width="13" height="14" viewBox="0 0 13 14" fill="none">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7.47754 7.73145V13.5459H5.4209V7.73145H0V5.6748H5.4209V0H7.47754V5.6748H12.8984V7.73145H7.47754Z"
                fill="#2D140D"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DrinkDetails;
