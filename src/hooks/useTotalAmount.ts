import { useEffect, useState } from "react";

export const useTotalAmount = (drinkPrice: number, drinkAmount: number) => {
  const [totalAmount, setTotalAmount] = useState(0.0);

  useEffect(() => {
    setTotalAmount(drinkPrice * drinkAmount);
  }, [drinkPrice, drinkAmount]);

  return totalAmount;
};
