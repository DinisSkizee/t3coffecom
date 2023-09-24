"use client";
import React from "react";
import useCartId from "src/hooks/getCartId";
import SelectDrinkPage from "./selectdrink-client";
import { useGetCartQuery, useGetProductsQuery } from "@gql/schema";

const SelectDrink = () => {
  const cartId = useCartId();
  const { data: getCartData } = useGetCartQuery({
    variables: {
      cartId: cartId,
    },
  });

  const {
    data: productsData,
    loading: productsLoading,
    error: productsError,
  } = useGetProductsQuery({
    variables: {
      first: 100,
    },
  });

  return (
    <SelectDrinkPage
      getCartData={getCartData}
      productsData={productsData}
      productsError={productsError}
      productsLoading={productsLoading}
    />
  );
};

export default SelectDrink;
