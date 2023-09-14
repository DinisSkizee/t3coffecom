import Head from "next/head";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Header from "../components/Header";
import Link from "next/link";
import ThinBrownLine from "../components/ThinBrownLine";
import BackArrow from "../components/svg/BackArrow";
import Footer from "../components/Footer";
import Basket from "../components/Basket";
import { useAddCartLinesMutation, useGetCartQuery } from "../gql/schema";
import DrinkDetails from "../components/Preferences/DetailsDetails";
import DrinkSize from "../components/Preferences/DrinkSize";
import SugarAmount from "../components/Preferences/SugarAmount";
import DrinkBackground from "../components/Preferences/DrinkBackground";
import Additions from "../components/Preferences/Additions";
import CartButton from "../components/Preferences/CartButton";
import TotalAmount from "../components/TotalAmount";
import useCartId from "../hooks/useCartId";
import { useDrinkVariant } from "../hooks/useDrinkDetails";
import { useTotalAmount } from "../hooks/useTotalAmount";

const PreferencesPage = () => {
  const router = useRouter();
  const cartId = useCartId();

  // Get the query parameter from the URL
  const { drink } = router.query;

  const [drinkName, setDrinkName] = useState("");
  const [drinkAmount, setDrinkAmount] = useState(0);
  const [drinkSize, setDrinkSize] = useState(1);
  const [opacitiesSize, setOpacitiesSize] = useState([0.4, 1, 0.4]);
  const [sugarAmount, setSugarAmount] = useState(0);
  const [opacitiesSugar, setOpacitiesSugar] = useState([1, 0.4, 0.4, 0.4]);
  const [additions, setAdditions] = useState<Record<string, number>>({
    Cream: 0,
    Vanilla: 0,
  });
  const [opacitiesAdditions, setOpacitiesAdditions] = useState([0.4, 0.4]);
  const [basketAmount, setBasketAmount] = useState(0);

  const [
    addCartLinesMutation,
    {
      data: basketItemsData,
      loading: basketItemsLoading,
      error: basketItemsError,
    },
  ] = useAddCartLinesMutation();

  const {
    data: getCartData,
    loading: getCartLoading,
    error: getCartError,
  } = useGetCartQuery({
    variables: {
      cartId: cartId,
    },
  });

  // 1. Check if the drink parameter is a string
  useEffect(() => {
    if (typeof drink === "string") {
      setDrinkName(drink);
    } else {
      setDrinkName("No drink parameter found");
    }
  }, [drink]);

  // 2. Get the drink variant
  const { drinkVariant, drinkPrice } = useDrinkVariant(
    drinkName,
    drinkSize,
    additions,
    drinkAmount,
  );
  console.log("drinkVariant", drinkVariant);
  console.log("drinkPrice", drinkPrice);

  // 3. Calculate total amount
  const totalAmount = useTotalAmount(drinkPrice, drinkAmount);

  /*  HELPER FUNCTIONS  */
  // Increase/Decrease drink amount
  const increaseDrinkAmount = () => {
    setDrinkAmount(drinkAmount + 1);
  };
  const decreaseDrinkAmount = () => {
    if (drinkAmount > 0) setDrinkAmount(drinkAmount - 1);
  };

  // Update drink size
  const newDrinkSize = (size: number) => {
    setDrinkSize(size);

    const updatedOpacities = opacitiesSize.map((_, i) =>
      i === size ? 1 : 0.4,
    );
    setOpacitiesSize(updatedOpacities);
  };

  // Update sugar amount
  const newSugarAmount = (amount: number) => {
    setSugarAmount(amount);

    const updatedOpacities = opacitiesSugar.map((_, i) =>
      i === amount ? 1 : 0.4,
    );
    setOpacitiesSugar(updatedOpacities);
  };

  // Update additions
  const manageAdditions = (item: number) => {
    const extra = item === 0 ? "Cream" : "Vanilla";
    const updatedAdditions = {
      ...additions,
      [extra]: additions[extra] === 1 ? 0 : 1,
    };

    setAdditions(updatedAdditions);

    const updatedAdditionsOpacities = opacitiesAdditions.map((value, i) =>
      i === item ? (value === 1 ? 0.4 : 1) : value,
    );
    setOpacitiesAdditions(updatedAdditionsOpacities);
  };

  const title = "Preferences " + drinkName;
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
              <div className="m-auto my-2 select-none text-[24px] text-[#8C746A]">
                Preferences
              </div>
              <Basket basketAmount={getCartData?.cart?.totalQuantity ?? 0} />
            </div>
            {/* Bg & Icon */}
            {drinkVariant ? (
              <>
                {drink && <DrinkBackground drink={drinkName} />}
                {/* Coffee Details */}
                <DrinkDetails
                  increaseDrinkAmount={increaseDrinkAmount}
                  decreaseDrinkAmount={decreaseDrinkAmount}
                  drinkAmount={drinkAmount}
                  drinkPrice={drinkPrice}
                  drinkName={drinkName}
                />
                <ThinBrownLine />

                {/* Size */}
                <DrinkSize
                  drinkName={drinkName}
                  opacities={opacitiesSize}
                  newDrinkSize={newDrinkSize}
                />
                <ThinBrownLine />

                {/* Sugar */}
                <SugarAmount
                  newSugarAmount={newSugarAmount}
                  opacitiesSugar={opacitiesSugar}
                />
                <ThinBrownLine />

                {/* Additions */}
                <Additions
                  manageAdditions={manageAdditions}
                  opacitiesAdditions={opacitiesAdditions}
                />
                <ThinBrownLine />

                {/* Total */}
                <TotalAmount totalAmount={totalAmount} />

                {/* Add To Cart */}
                {drinkVariant && cartId && totalAmount > 0 && (
                  <CartButton
                    setBasketAmount={setBasketAmount}
                    basketAmount={basketAmount}
                    addCartLines={addCartLinesMutation}
                    prodVariant={drinkVariant}
                    cartId={cartId}
                  />
                )}
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
