// useDrinkVariant.tsx
import { useEffect, useState } from "react";
import { useGetProductsQuery } from "@gql/schema";
import { useDrinkDetails } from "@state/store";

export interface ProductVariant {
  id: string;
  title: string;
  price: MoneyV2;
}

interface MoneyV2 {
  amount: number;
}

export const useDrinkVariant = () => {
  const {
    drinkName,
    drinkSize,
    coffeeAdditions,
    drinkAmount,
    setDrinkPrice,
    setDrinkVariant,
  } = useDrinkDetails();
  const [coffeeVariant, setCoffeeVariant] = useState<ProductVariant>();
  const { data: productsData } = useGetProductsQuery({
    variables: {
      first: 100,
    },
  });

  useEffect(() => {
    if (!productsData || !drinkName) return;

    const sizeMapping: Record<number, string> = {
      0: "Small",
      1: "Medium",
      2: "Large",
    };

    const filteredProduct = productsData.products.edges.find(
      (edge) => edge.node.title === drinkName,
    );

    const filteredVariantName = filteredProduct?.node.variants.edges.filter(
      (variant) =>
        variant.node.title.includes(sizeMapping[drinkSize] ?? "Medium"),
    );

    const activeAdditions = Object.keys(coffeeAdditions).filter(
      (key) => coffeeAdditions[key as keyof typeof coffeeAdditions] === 1,
    );

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

    if (filteredVariant) {
      setDrinkVariant(filteredVariant.node);
      setCoffeeVariant(filteredVariant.node);
      setDrinkPrice(filteredVariant.node.price.amount as number);
    }
  }, [productsData, drinkSize, coffeeAdditions, drinkName]);

  useEffect(() => {
    const tempDrinkPrice = coffeeVariant?.price.amount ?? 0 * drinkAmount;
    setDrinkPrice(tempDrinkPrice);
  }, [coffeeVariant, drinkAmount]);

  return { coffeeVariant };
};
