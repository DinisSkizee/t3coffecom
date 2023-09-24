import React, { useEffect, useRef, useState } from "react";
import { useAddCartLinesMutation } from "src/gql/schema";
import { useDrinkDetails, useStoreCart } from "@state/store";

const CartButton = () => {
  const { drinkAmount, drinkVariant } = useDrinkDetails();
  const { setBasketAmount, basketAmount, cartId } = useStoreCart();
  const [addCartLines] = useAddCartLinesMutation();

  const [displayText, setDisplayText] = useState("Add To Cart");
  const timeRef = useRef<NodeJS.Timeout | null>(null);
  const handleButtonClick = () => {
    addCartLines({
      variables: {
        cartId: cartId,
        lines: {
          merchandiseId: drinkVariant?.id ?? "",
          quantity: drinkAmount,
        },
      },
    }).catch((error) => {
      console.log(error);
    });
    setBasketAmount(basketAmount + 1);
    setDisplayText("Added");

    timeRef.current = setTimeout(() => {
      setDisplayText("Add To Cart");
    }, 1000);
  };

  useEffect(() => {
    return () => {
      if (timeRef.current) clearTimeout(timeRef.current);
    };
  }, []);

  return (
    <div className="flex cursor-pointer select-none items-center justify-center">
      <div
        className="flex w-[90%] items-center justify-center rounded-full bg-almond-brown py-3.5 text-white hover:drop-shadow-md"
        onClick={handleButtonClick}
      >
        {displayText}
      </div>
    </div>
  );
};

export default CartButton;
