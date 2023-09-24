import React from "react";
import Head from "next/head";
import Link from "next/link";
import {
  type AddCartLinesMutationFn,
  type GetCartQuery,
  type UpdateCartLinesMutationFn,
} from "src/gql/schema";
import Header from "@components/Header";
import Footer from "@components/Footer";
import Basket from "@components/Basket";
import TotalAmount from "@components/TotalAmount";
import BackArrow from "@components/svg/BackArrow";
import BasketItem from "@components/Cart/BasketItem";
import ThinBrownLine from "@components/ThinBrownLine";
import CheckoutButton from "@components/Cart/CheckoutButton";

interface CartPageProps {
  getCartData: GetCartQuery;
  addCartLinesMutation: AddCartLinesMutationFn;
  updateCartLinesMutation: UpdateCartLinesMutationFn;
}

const CartPage = ({
  getCartData,
  updateCartLinesMutation,
  addCartLinesMutation,
}: CartPageProps) => {
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
              <div className="m-auto my-2 select-none text-[24px] text-dark-brown">
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
                      lineId={edge.node.id}
                      productName={edge.node.merchandise.product.title}
                      productPrice={edge.node.cost.totalAmount.amount}
                      productQuantity={edge.node.quantity}
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
                {getCartData && (
                  <TotalAmount
                    totalAmount={getCartData?.cart?.cost.totalAmount.amount}
                  />
                )}

                {/* Checkout */}
                <CheckoutButton />
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default CartPage;
