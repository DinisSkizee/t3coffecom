import React from "react";

const TotalAmount = ({ totalAmount }: { totalAmount: number }) => {
  return (
    <div className="m-6 flex text-[28px]">
      <div className="text-[#8C746A]">Total:</div>
      <div className="ml-auto text-[30px] font-semibold text-[#2D140D]">
        {Number(totalAmount)?.toFixed(2)}
        <span className="ml-1 text-[20px] font-extrabold">GBP</span>
      </div>
    </div>
  );
};

export default TotalAmount;
