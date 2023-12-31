import React from "react";
import Mocha from "@svg/Coffee/Mocha";
import Latte from "@svg/Coffee/Latte";
import Espresso from "@svg/Coffee/Espresso";
import Macchiato from "@svg/Coffee/Macchiato";
import Cappuccino from "@svg/Coffee/Cappuccino";
import {
  type UpdateCartLinesMutationFn,
  type AddCartLinesMutationFn,
} from "src/gql/schema";
import { separateVariants } from "@helpers/separateVariants";
import { useStoreCart } from "@state/store";

interface BasketItemProps {
  productId: string;
  lineId: string;
  productName: string;
  productPrice: number;
  productQuantity: number;
  variants: string;
  addProduct: AddCartLinesMutationFn;
  removeProduct: UpdateCartLinesMutationFn;
}
type IconComponents = Record<string, JSX.Element>;

const BasketItem = ({
  productId,
  lineId,
  productName,
  productPrice,
  productQuantity,
  variants,
  addProduct,
  removeProduct,
}: BasketItemProps) => {
  const { cartId } = useStoreCart();
  const variantsList = separateVariants(variants);
  const iconComponents: IconComponents = {
    espresso: <Espresso size={3} className="drop-shadow-strDrop" />,
    cappuccino: <Cappuccino size={3} className="drop-shadow-strDrop" />,
    macchiato: <Macchiato size={3} className="drop-shadow-strDrop" />,
    mocha: <Mocha size={3} className="drop-shadow-strDrop" />,
    latte: <Latte size={3} className="drop-shadow-strDrop" />,
  };
  const iconComponent = iconComponents[productName.toLowerCase()];

  const handleRemoveProductClick = () => {
    removeProduct({
      variables: {
        cartId: cartId,
        lines: {
          id: lineId,
          quantity: productQuantity - 1,
        },
      },
    }).catch((error) => {
      console.log(error);
    });
  };

  const handleAddProductClick = () => {
    addProduct({
      variables: {
        cartId: cartId,
        lines: {
          merchandiseId: productId,
        },
      },
    }).catch((error) => {
      console.log(error);
    });
  };

  return (
    <div className="mx-8 mb-4 flex flex-row gap-6">
      <div className="flex w-[50px] items-center justify-center">
        {iconComponent}
      </div>
      <div className="flex w-[35%] flex-col">
        <h2 className="font-bold">{productName}</h2>
        {variantsList.map((variant) => (
          <p
            className="text-[13px] font-semibold text-dark-brown"
            key={variant}
          >{`x ${variant}`}</p>
        ))}
      </div>
      <div className="flex h-full flex-col items-center justify-evenly">
        <div className="text-[20px] font-medium text-superdark-brown">{`£${Number(
          productPrice,
        ).toFixed(2)}`}</div>
        <div className="flex flex-row gap-2 text-[16px] font-semibold">
          <div
            onClick={handleRemoveProductClick}
            className="flex w-8 cursor-pointer items-center justify-center rounded-l-full border border-almond-brown bg-light-brown text-almond-brown"
          >
            -
          </div>
          <div className="flex w-8 select-none items-center justify-center border border-almond-brown bg-light-brown pt-[.1rem] text-sm text-almond-brown">
            {productQuantity}
          </div>
          <div
            onClick={handleAddProductClick}
            className="flex w-8 cursor-pointer items-center justify-center rounded-r-full border border-almond-brown bg-light-brown text-almond-brown"
          >
            +
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasketItem;
