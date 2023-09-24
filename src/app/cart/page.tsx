"use client";
import React, { useEffect } from "react";
import {
  useAddCartLinesMutation,
  useGetCartQuery,
  useUpdateCartLinesMutation,
} from "src/gql/schema";
import useCartId from "src/hooks/getCartId";
import CartPage from "./cart-server";

const CartClient = () => {
  const cartId = useCartId();

  const { data: getCartData, refetch: refetchCartData } = useGetCartQuery({
    variables: {
      cartId: cartId,
    },
  });
  const [updateCartLinesMutation, { data: updateData }] =
    useUpdateCartLinesMutation();
  const [addCartLinesMutation, { data: addData }] = useAddCartLinesMutation();

  useEffect(() => {
    void refetchCartData();
  }, [getCartData, updateData, addData]);

  return (
    <CartPage
      getCartData={getCartData as any}
      updateCartLinesMutation={updateCartLinesMutation}
      addCartLinesMutation={addCartLinesMutation}
    />
  );
};

export default CartClient;
