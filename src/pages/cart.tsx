import Head from "next/head";
import React, { useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import BackArrow from "~/components/svg/BackArrow";
import Link from "next/link";
import Basket from "~/components/Basket";
import {
  useAddCartLinesMutation,
  useGetCartQuery,
  useUpdateCartLinesMutation,
} from "../gql/schema";
import useCartId from "~/hooks/useCartId";
import BasketItem from "~/components/Cart/BasketItem";
import ThinBrownLine from "~/components/ThinBrownLine";
import TotalAmount from "~/components/TotalAmount";
import CheckoutButton from "~/components/Cart/CheckoutButton";

const Cart = () => {
  const cartId = useCartId();
  const { data: getCartData, refetch: refetchCartData } = useGetCartQuery({
    variables: {
      cartId: cartId,
    },
  });
  const [
    updateCartLinesMutation,
    { data: updateData, loading: updateLoading, error: updateError },
  ] = useUpdateCartLinesMutation();
  const [
    addCartLinesMutation,
    { data: addData, loading: addLoading, error: addError },
  ] = useAddCartLinesMutation();

  useEffect(() => {
    void refetchCartData();
  }, [getCartData, updateData, addData]);

  return (
    <>
      <Head>
        <title>Cart</title>
      </Head>

      <div className="flex w-full justify-center">
        <div className="flex h-screen w-[414px] flex-col bg-white">
          <Header />
          <div className="my-1 flex flex-col">
            {/* Preferences header */}
            <div className="mx-7 mb-4 flex items-center">
              <Link href={"/selectDrink"}>
                <BackArrow />
              </Link>
              <div className="m-auto my-2 select-none text-[24px] text-[#8C746A]">
                Cart
              </div>
              <Basket basketAmount={getCartData?.cart?.totalQuantity ?? 0} />
            </div>

            <div className="flex h-[750px] flex-col overflow-y-auto">
              {/* Items */}
              <div className="flex flex-col gap-4">
                {getCartData?.cart?.lines.edges.map((edge) => (
                  <div key={edge.node.id}>
                    <BasketItem
                      productId={edge.node.merchandise.id}
                      lineId={edge?.node.id ?? ""}
                      productName={edge.node.merchandise.product.title}
                      productPrice={edge.node.cost.totalAmount.amount}
                      productQuantity={edge.node.quantity}
                      cartId={cartId}
                      variants={edge.node.merchandise.title}
                      addProduct={addCartLinesMutation}
                      removeProduct={updateCartLinesMutation}
                    />
                    <ThinBrownLine />
                  </div>
                ))}
              </div>

              {/* Total */}
              <div className="mt-auto">
                <TotalAmount
                  totalAmount={getCartData?.cart?.cost.totalAmount.amount}
                />

                {/* Checkout */}
                <CheckoutButton cartId={cartId} />
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Cart;
