import React from "react";

const TotalAmount = ({ totalAmount }: { totalAmount: number }) => {
  return (
    <div className="m-6 flex select-none text-[28px]">
      <div className="text-dark-brown">Total:</div>
      <div className="ml-auto text-[30px] font-semibold text-superdark-brown">
        {Number(totalAmount)?.toFixed(2)}
        <span className="ml-1 text-[20px] font-extrabold">GBP</span>
      </div>
    </div>
  );
};

export default TotalAmount;
