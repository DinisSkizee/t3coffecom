import React from "react";

interface DetailsProps {
  drinkName: string;
  drinkPrice: number;
  drinkAmount: number;
  decreaseDrinkAmount: () => void;
  increaseDrinkAmount: () => void;
}
const DrinkDetails = ({
  drinkName,
  drinkPrice,
  decreaseDrinkAmount,
  drinkAmount,
  increaseDrinkAmount,
}: DetailsProps) => {
  return (
    <div className="mx-6 my-4 flex select-none flex-row">
      <div className="flex flex-col">
        <div className="text-[20px] font-bold text-[#2D140D]">{drinkName}</div>
        <div className="text-[18px] text-[#383537]">
          {Number(drinkPrice).toFixed(2)} GBP
        </div>
      </div>
      <div className="ml-auto flex flex-row items-center gap-4">
        <div className="text-[26px] text-[#383537]">{drinkAmount}</div>
        <div className="flex h-[34px] w-[105px] flex-row justify-between gap-2">
          {/* ADD */}
          <div
            className="flex w-full items-center justify-center rounded-l-full border border-[#2D140D] text-[39px] hover:bg-[#B98068] hover:drop-shadow-md"
            onClick={decreaseDrinkAmount}
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
            className="flex w-full items-center justify-center rounded-r-full border border-[#2D140D] text-[32px] hover:bg-[#B98068] hover:drop-shadow-md"
            onClick={increaseDrinkAmount}
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
