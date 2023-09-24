import React from "react";
import Link from "next/link";
import { type Metadata } from "next";
import BackArrow from "@svg/BackArrow";
import Basket from "@components/Basket";
import Footer from "@components/Footer";
import Header from "@components/Header";
import MenuItem from "@components/MenuItem";
import { type ApolloError } from "@apollo/client";
import ThinBrownLine from "@components/ThinBrownLine";
import { uppercaseFirstLetter } from "@helpers/uppercaseFirst";
import { type GetCartQuery, type GetProductsQuery } from "@gql/schema";

interface Props {
  productsLoading: boolean;
  productsError: ApolloError | undefined;
  getCartData: GetCartQuery | undefined;
  productsData: GetProductsQuery | undefined;
}

export const metadata: Metadata = {
  title: "CoffeeCom - Drinks",
};

export default function SelectDrinkPage({
  getCartData,
  productsLoading,
  productsError,
  productsData,
}: Props) {
  return (
    <div className="flex w-full justify-center">
      <div className="flex h-screen w-[414px] flex-col bg-white">
        <Header />
        <div className="my-1 flex flex-col">
          {/* Menu header */}
          <div className="mx-7 mb-2 flex items-center">
            {/* COME BACK */}
            <Link href={"/"}>
              <BackArrow />
            </Link>
            <div className="m-auto my-2 text-[24px] text-dark-brown">Menu</div>
            <Basket basketAmount={getCartData?.cart?.totalQuantity ?? 0} />
          </div>
          <ThinBrownLine />
          {productsLoading && <div>Products Loading...</div>}
          {productsError && <div>Products Error...</div>}
          {productsData?.products.edges.map((edge) => {
            return (
              <MenuItem
                key={edge.node.id}
                pathname={"/preferences"}
                query={{ drink: edge.node.title, amount: 1 }}
                iconName={edge.node.title.toLowerCase()}
                name={uppercaseFirstLetter(edge.node.title)}
              />
            );
          })}
        </div>
        <Footer />
      </div>
    </div>
  );
}
