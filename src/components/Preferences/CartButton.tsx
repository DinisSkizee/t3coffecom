import React, { useState } from "react";
import { type CreateCartMutation } from "~/gql/schema";
import { type ProductVariant } from "~/pages/preferences";

interface CartButtonProps {
  setBasketAmount: (basketAmount: number) => void;
  basketAmount: number;
  addCartLines: any;
  prodVariant: ProductVariant;
  cartData: CreateCartMutation;
}

const CartButton = ({
  setBasketAmount,
  basketAmount,
  addCartLines,
  prodVariant,
  cartData,
}: CartButtonProps) => {
  const [cartOpacity, setCartOpacity] = useState(0);
  const [displayText, setDisplayText] = useState("Add To Cart");

  const handleButtonClick = () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    addCartLines({
      variables: {
        cartId: cartData.cartCreate?.cart?.id,
        lines: {
          merchandiseId: prodVariant.id,
        },
      },
    });
    setBasketAmount(basketAmount + 1);
    setDisplayText("Added");
    setCartOpacity(1);

    setTimeout(() => {
      setCartOpacity(0);
      setDisplayText("Add To Cart");
    }, 500);
  };

  const instantCartStyle = {
    opacity: cartOpacity === 0 ? 0 : 1,
  };
  const cartStyle = {
    opacity: cartOpacity,
    transition: "0.3s ease-in",
  };

  return (
    <div className="flex items-center justify-center">
      <div
        className="flex w-[90%] items-center justify-center rounded-full bg-[#B98068] py-3.5 text-white"
        onClick={handleButtonClick}
      >
        {displayText}
        <div
          className="pl-4"
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