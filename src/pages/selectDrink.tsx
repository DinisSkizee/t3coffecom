import React from "react";
import Head from "next/head";
import Link from "next/link";
import useCartId from "@hooks/getCartId";
import Footer from "@components/Footer";
import Header from "@components/Header";
import Basket from "@components/Basket";
import MenuItem from "@components/MenuItem";
import BackArrow from "@components/svg/BackArrow";
import ThinBrownLine from "@components/ThinBrownLine";
import { uppercaseFirstLetter } from "@helpers/uppercaseFirst";
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
    <>
      <Head>
        <title>Select Drink</title>
      </Head>
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
              <div className="m-auto my-2 text-[24px] text-dark-brown">
                Menu
              </div>
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
    </>
  );
};

export default SelectDrink;
