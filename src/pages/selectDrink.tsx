import Head from "next/head";
import React, { useEffect } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import ThinBrownLine from "../components/ThinBrownLine";
import Link from "next/link";
import BackArrow from "../components/svg/BackArrow";
import MenuItem from "../components/MenuItem";
import { useGetProductsQuery } from "../gql/schema";
import { uppercaseFirstLetter } from "../helpers/uppercaseFirst";
import useCartId from "~/hooks/useCartId";

const SelectDrink = () => {
  const cartId = useCartId();
  const {
    data: productsData,
    loading: productsLoading,
    error: productsError,
  } = useGetProductsQuery({
    variables: {
      first: 10,
    },
  });

  useEffect(() => {
    console.log(productsData?.products.edges);
  }, [productsData]);

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
              <div className="m-auto my-2 text-[24px] text-[#8C746A]">Menu</div>
            </div>
            <ThinBrownLine />
            {productsLoading && <div>Products Loading...</div>}
            {productsError && <div>Products Error...</div>}
            {productsData?.products.edges.map((edge) => {
              return (
                <MenuItem
                  key={edge.node.id}
                  pathname={"/preferences"}
                  query={{ drink: edge.node.title }}
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
