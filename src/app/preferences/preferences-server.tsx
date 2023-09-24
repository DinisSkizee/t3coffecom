import Link from "next/link";
import { type Metadata } from "next";
import React, { useMemo } from "react";
import Header from "@components/Header";
import Footer from "@components/Footer";
import Basket from "@components/Basket";
import { useGetCartQuery } from "src/gql/schema";
import TotalAmount from "@components/TotalAmount";
import BackArrow from "@components/svg/BackArrow";
import ThinBrownLine from "@components/ThinBrownLine";
import DrinkSize from "@components/Preferences/DrinkSize";
import CartButton from "@components/Preferences/CartButton";
import SugarAmount from "@components/Preferences/SugarAmount";
import DrinkDetails from "@components/Preferences/DrinkDetails";
import { type ProductVariant } from "src/hooks/useDrinkDetails";
import DrinkBackground from "@components/Preferences/DrinkBackground";
import CoffeeAdditions from "@components/Preferences/CoffeeAdditions";

interface HomePageProps {
  cartId: string;
  drinkName: string;
  drinkAmount: number;
  drinkPrice: number;
  coffeeVariant: ProductVariant | undefined;
}
// eslint-disable-next-line @typescript-eslint/require-await
export async function generateMetadata(drinkName: string): Promise<Metadata> {
  const title = `Preferences ${drinkName}`;
  return {
    title,
  };
}

export default function PreferencesPage({
  cartId,
  drinkName,
  drinkAmount,
  drinkPrice,
  coffeeVariant,
}: HomePageProps) {
  // Get Cart Data
  const { data: getCartData } = useGetCartQuery({
    variables: {
      cartId: cartId,
    },
  });

  // Calculate total amount
  const totalAmount = drinkPrice * drinkAmount;

  // Memoize getCartData
  const memoizedGetCartData = useMemo(
    () => getCartData?.cart?.totalQuantity,
    [getCartData?.cart?.totalQuantity],
  );
  generateMetadata(drinkName).catch((err) => console.error(err));

  return (
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
            <Basket basketAmount={memoizedGetCartData ?? 0} />
          </div>
          {/* Bg & Icon */}
          {coffeeVariant ? (
            <>
              <DrinkBackground />
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
              <CartButton />
            </>
          ) : (
            <div>Invalid Drink</div>
          )}
        </div>
        <Footer />
      </div>
    </div>
  );
}
