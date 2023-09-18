import Head from "next/head";
import Link from "next/link";
import React, { useEffect, useMemo } from "react";
import { useRouter } from "next/router";
import Header from "@components/Header";
import ThinBrownLine from "@components/ThinBrownLine";
import BackArrow from "@components/svg/BackArrow";
import Footer from "@components/Footer";
import Basket from "@components/Basket";
import DrinkDetails from "@components/Preferences/DrinkDetails";
import DrinkSize from "@components/Preferences/DrinkSize";
import SugarAmount from "@components/Preferences/SugarAmount";
import DrinkBackground from "@components/Preferences/DrinkBackground";
import CoffeeAdditions from "@components/Preferences/CoffeeAdditions";
import CartButton from "@components/Preferences/CartButton";
import TotalAmount from "@components/TotalAmount";
import useCartId from "@hooks/getCartId";
import { useDrinkVariant } from "@hooks/useDrinkDetails";
import { useGetCartQuery } from "@gql/schema";
import { useDrinkDetails } from "@state/store";

const PreferencesPage = () => {
  const router = useRouter();
  const cartId = useCartId();
  const { drinkName, drinkAmount, setDrinkAmount, setDrinkName } =
    useDrinkDetails();

  // Get the query parameter from the URL
  const { drink: queryDrink, amount: queryAmount } = useMemo(
    () => router.query,
    [router.query],
  );

  // Get Cart Data
  const { data: getCartData } = useGetCartQuery({
    variables: {
      cartId: cartId,
    },
  });

  // Memoize getCartData
  const memoizedGetCartData = useMemo(() => getCartData, [getCartData]);

  // 1. Check if the drink parameter is a string
  useEffect(() => {
    if (router.isReady) {
      setDrinkName(queryDrink as string);
      setDrinkAmount(Number(queryAmount));
    } else {
      setDrinkName("No drink parameter found");
    }
  }, [router.isReady]);

  // 2. Get the drink variant
  const { drinkVariant, drinkPrice } = useDrinkVariant();

  // 3. Calculate total amount
  const totalAmount = useMemo(
    () => drinkPrice * drinkAmount,
    [drinkPrice, drinkAmount],
  );

  const title = useMemo(() => "Preferences " + drinkName, [drinkName]);
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <div className="flex w-full justify-center">
        <div className="flex h-screen w-[414px] flex-col bg-white">
          <Header />
          <div className="my-1 flex flex-col">
            {/* Preferences header */}
            <div className="mx-7 mb-2 flex items-center">
              <Link href={"/selectDrink"}>
                <BackArrow />
              </Link>
              <div className="m-auto my-2 select-none text-[24px] text-dark-brown">
                Preferences
              </div>
              <Basket
                basketAmount={memoizedGetCartData?.cart?.totalQuantity ?? 0}
              />
            </div>
            {/* Bg & Icon */}
            {drinkVariant ? (
              <>
                {queryDrink && <DrinkBackground />}
                {/* Coffee Details */}
                <DrinkDetails />
                <ThinBrownLine />

                {/* Size */}
                <DrinkSize />
                <ThinBrownLine />

                {/* Sugar */}
                <SugarAmount />
                <ThinBrownLine />

                {/* CoffeeAdditions */}
                <CoffeeAdditions />
                <ThinBrownLine />

                {/* Total */}
                <TotalAmount totalAmount={totalAmount} />

                {/* Add To Cart */}
                {drinkVariant && cartId && totalAmount > 0 && <CartButton />}
              </>
            ) : (
              <div>Invalid Drink</div>
            )}
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default PreferencesPage;
