import Head from "next/head";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Header from "../components/Header";
import Link from "next/link";
import ThinBrownLine from "../components/ThinBrownLine";
import BackArrow from "../components/svg/BackArrow";
import Footer from "../components/Footer";
import Basket from "../components/Basket";
import {
  useAddCartLinesMutation,
  useCreateCartMutation,
  useGetCartQuery,
  useGetProductsQuery,
} from "~/gql/schema";
import DrinkDetails from "~/components/Preferences/DetailsDetails";
import DrinkSize from "~/components/Preferences/DrinkSize";
import SugarAmount from "~/components/Preferences/SugarAmount";
import DrinkBackground from "~/components/Preferences/DrinkBackground";
import Additions from "~/components/Preferences/Additions";
import CartButton from "~/components/Preferences/CartButton";
import TotalAmount from "~/components/Preferences/TotalAmount";

export interface ProductVariant {
  id: string;
  title: string;
  price: MoneyV2;
}

interface MoneyV2 {
  amount: number;
}

const PreferencesPage = () => {
  const router = useRouter();

  // Get the query parameter from the URL
  const { drink } = router.query;

  const [drinkVariant, setDrinkVariant] = useState<ProductVariant>();
  const [drinkName, setDrinkName] = useState("");
  const [drinkPrice, setDrinkPrice] = useState(0.0);
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
  const [totalAmount, setTotalAmount] = useState(0.0);
  const [basketAmount, setBasketAmount] = useState(0);
  const {
    data: productsData,
    loading: productsLoading,
    error: productsError,
  } = useGetProductsQuery({
    variables: {
      first: 100,
    },
  });
  const [
    addCartLinesMutation,
    {
      data: basketItemsData,
      loading: basketItemsLoading,
      error: basketItemsError,
    },
  ] = useAddCartLinesMutation();

  const [cartId, setCartId] = useState("");

  const [
    createCartMutation,
    {
      data: createCartData,
      loading: createCartLoading,
      error: createCartError,
    },
  ] = useCreateCartMutation({});

  const {
    data: getCartData,
    loading: getCartLoading,
    error: getCartError,
  } = useGetCartQuery({
    variables: {
      cardId: cartId,
    },
  });

  // On Page Start
  useEffect(() => {
    const cardIdTemp = localStorage.getItem("cartId") ?? "";
    setCartId(cardIdTemp);
    if (!cardIdTemp)
      createCartMutation().catch((err) => {
        console.log(err);
      });
  }, []);

  // On Cart Create Check For CartId in LocalStorage or Create New One
  useEffect(() => {
    console.log("createCartData", createCartData);
    const cardIdTemp = localStorage.getItem("cartId") ?? "";
    if (!cardIdTemp) {
      localStorage.setItem(
        "cartId",
        createCartData?.cartCreate?.cart?.id ?? "",
      );
    }
    setCartId(cardIdTemp);
  }, [createCartData]);
  useEffect(() => {
    console.log("getCartData", getCartData);
  }, [getCartData]);

  // 1. Check if the drink parameter is a string
  useEffect(() => {
    if (typeof drink === "string") {
      setDrinkName(drink);
    } else {
      setDrinkName("No drink parameter found");
    }
  }, [drink]);

  // 2. Get the specific drink variant from the products data (shopify) (in 6 steps)
  useEffect(() => {
    if (!productsData) return;

    // 1. Map the drink size to the shopify variant size to help map the correct variant
    const sizeMapping: Record<number, string> = {
      0: "Small",
      1: "Medium",
      2: "Large",
    };

    // 2. Find the drink product by Name
    const filteredProduct = productsData.products.edges.find(
      (edge) => edge.node.title === drinkName,
    );

    // 3. Find the drink variant by Size
    const filteredVariantName = filteredProduct?.node.variants.edges.filter(
      (variant) =>
        variant.node.title.includes(sizeMapping[drinkSize] ?? "Medium"),
    );

    // 4. Check which additions are active
    const activeAdditions = Object.keys(additions).filter(
      (key) => additions[key] === 1,
    );

    // 5. Finally find the variant that matches specs
    const filteredVariant = filteredVariantName?.find((variant) => {
      if (
        activeAdditions.includes("Cream") &&
        activeAdditions.includes("Vanilla")
      ) {
        return variant.node.title.includes("Vanilla & Cream");
      } else if (activeAdditions.includes("Cream")) {
        return variant.node.title.includes("Cream");
      } else if (activeAdditions.includes("Vanilla")) {
        return variant.node.title.includes("Vanilla");
      } else {
        return variant.node.title.includes("Normal");
      }
    });

    // 6. If the variant is found, set the drinkVariant, totalAmount, and drinkPrice
    if (filteredVariant) {
      setDrinkVariant(filteredVariant.node);
      setTotalAmount(
        (filteredVariant.node.price.amount as number) * drinkAmount,
      );
      setDrinkPrice(filteredVariant.node.price.amount as number);
    }
    console.log("filteredVariant", filteredVariant);
  }, [productsData, drinkSize, additions, drinkName, drinkAmount]);

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
      {}
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
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default PreferencesPage;
