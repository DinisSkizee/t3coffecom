"use client";
import PreferencesPage from "./preferences-server";
import { useDrinkDetails } from "@state/store";
import { useDrinkVariant } from "src/hooks/useDrinkDetails";
import useCartId from "src/hooks/getCartId";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function PreferencesClient() {
  const router = useRouter();
  const cartId = useCartId();
  const searchParams = useSearchParams();
  const { drinkName, drinkAmount, setDrinkAmount, setDrinkName, drinkPrice } =
    useDrinkDetails();

  // Get the drink variant
  const { coffeeVariant } = useDrinkVariant();

  useEffect(() => {
    if (router) {
      // Get the query parameter from the URL
      const queryDrink = searchParams.get("drink");
      const queryAmount = searchParams.get("amount");

      setDrinkName(queryDrink ?? "No drink parameter found");
      setDrinkAmount(Number(queryAmount ?? 0));
    } else {
      setDrinkName("No drink parameter found");
    }
  }, [router, searchParams, setDrinkAmount, setDrinkName]);

  return (
    <PreferencesPage
      cartId={cartId}
      drinkName={drinkName}
      drinkAmount={drinkAmount}
      drinkPrice={drinkPrice}
      coffeeVariant={coffeeVariant}
    />
  );
}
