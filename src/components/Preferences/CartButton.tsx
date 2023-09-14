import React, { useState } from "react";
import { type AddCartLinesMutationFn } from "@gql/schema";
import { type ProductVariant } from "@hooks/useDrinkDetails";

interface CartButtonProps {
  setBasketAmount: (basketAmount: number) => void;
  basketAmount: number;
  addCartLines: AddCartLinesMutationFn;
  prodVariant: ProductVariant;
  cartId: string;
}

const CartButton = ({
  setBasketAmount,
  basketAmount,
  addCartLines,
  prodVariant,
  cartId,
}: CartButtonProps) => {
  const [cartOpacity, setCartOpacity] = useState(0);
  const [displayText, setDisplayText] = useState("Add To Cart");

  const handleButtonClick = () => {
    addCartLines({
      variables: {
        cartId: cartId,
        lines: {
          merchandiseId: prodVariant.id,
        },
      },
    }).catch((error) => {
      console.log(error);
    });
    setBasketAmount(basketAmount + 1);
    setDisplayText("Added");
    setCartOpacity(1);

    setTimeout(() => {
      setCartOpacity(0);
      setDisplayText("Add To Cart");
    }, 1000);
  };

  const instantCartStyle = {
    opacity: cartOpacity === 0 ? 0 : 1,
  };
  const cartStyle = {
    opacity: cartOpacity,
    transition: ".5s ease-in-out",
  };

  return (
    <div className="flex cursor-pointer select-none items-center justify-center">
      <div
        className="flex w-[90%] items-center justify-center rounded-full bg-[#B98068] py-3.5 text-white hover:drop-shadow-md"
        onClick={handleButtonClick}
      >
        {displayText}
        <div
          className="absolute right-[5rem]"
          style={cartOpacity === 0 ? instantCartStyle : cartStyle}
        >
          <svg
            width="18"
            height="16"
            viewBox="0 0 18 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.5 9.70676L4.65 13.5712C4.7555 13.7018 4.8904 13.8081 5.04474 13.8823C5.19908 13.9565 5.36891 13.9966 5.54169 13.9998C5.71448 14.003 5.8858 13.9691 6.04302 13.9006C6.20023 13.8321 6.33931 13.7308 6.45 13.6042L16.5 2"
              stroke="#F8E9D6"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default CartButton;
