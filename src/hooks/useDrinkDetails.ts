"use client";
import { useEffect, useReducer, useMemo } from "react";
import { useGetProductsQuery } from "src/gql/schema";
import { useDrinkDetails } from "@state/store";

export interface ProductVariant {
  id: string;
  title: string;
  price: {
    amount: number;
  };
}

interface State {
  coffeeVariant?: ProductVariant;
}

interface Actions {
  type: "setCoffeeVariant";
  payload: ProductVariant;
}

const reducer = (state: State, action: Actions) => {
  switch (action.type) {
    case "setCoffeeVariant":
      return { ...state, coffeeVariant: action.payload };
    default:
      return state;
  }
};

export const useDrinkVariant = () => {
  const {
    drinkName,
    drinkSize,
    coffeeAdditions,
    drinkAmount,
    setDrinkPrice,
    setDrinkVariant,
  } = useDrinkDetails();

  const [state, dispatch] = useReducer(reducer, {});

  const { data: productsData } = useGetProductsQuery({
    variables: {
      first: 100,
    },
  });

  const filteredVariants = useMemo(() => {
    if (!productsData || !drinkName) return [];

    const filterVariants = (variants: ProductVariant[]) => {
      const sizeMapping: Record<number, string> = {
        0: "Small",
        1: "Medium",
        2: "Large",
      };

      return variants.filter((variant) =>
        variant.title.includes(
          sizeMapping[drinkSize.toString() as "0" | "1" | "2"] ?? "Medium",
        ),
      );
    };

    const filteredProduct = productsData.products.edges.find(
      (edge) => edge.node.title === drinkName,
    );

    return filterVariants(
      filteredProduct?.node.variants.edges.map((edge) => edge.node) ?? [],
    );
  }, [productsData, drinkName, drinkSize]);

  useEffect(() => {
    if (!filteredVariants.length) return;

    const activeAdditions = Object.keys(coffeeAdditions).filter(
      (key) => coffeeAdditions[key as keyof typeof coffeeAdditions] === 1,
    );

    let filteredVariant: ProductVariant | undefined;
    for (const variant of filteredVariants) {
      if (
        activeAdditions.includes("Cream") &&
        activeAdditions.includes("Vanilla")
      ) {
        if (variant.title.includes("Vanilla & Cream")) {
          filteredVariant = variant;
          break;
        }
      } else if (activeAdditions.includes("Cream")) {
        if (variant.title.includes("Cream")) {
          filteredVariant = variant;
          break;
        }
      } else if (activeAdditions.includes("Vanilla")) {
        if (variant.title.includes("Vanilla")) {
          filteredVariant = variant;
          break;
        }
      } else {
        if (variant.title.includes("Normal")) {
          filteredVariant = variant;
          break;
        }
      }
    }

    if (filteredVariant) {
      const { id, title, price } = filteredVariant;
      dispatch({
        type: "setCoffeeVariant",
        payload: { id, title, price: { amount: price.amount } },
      });
      setDrinkVariant(filteredVariant);
      setDrinkPrice(price.amount);
    }
  }, [
    filteredVariants,
    coffeeAdditions,
    drinkAmount,
    setDrinkVariant,
    setDrinkPrice,
  ]);

  return { coffeeVariant: state.coffeeVariant };
};
