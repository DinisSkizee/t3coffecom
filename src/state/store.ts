import { type ProductVariant } from "@hooks/useDrinkDetails";
import { create } from "zustand";
import { combine, devtools, persist } from "zustand/middleware";

const getDrinkInitialState = () => ({
  drinkName: "",
  drinkSize: 1,
  drinkAmount: 0,
  drinkPrice: 0,
  sugarAmount: 0,
  opacitiesSize: [0.4, 1, 0.4],
  opacitiesSugar: [1, 0.4, 0.4, 0.4],
  opacitiesAdditions: [0.4, 0.4],
  coffeeAdditions: {
    Cream: 0,
    Vanilla: 0,
  },
  opacitiesAdditionsHover: [0.4, 0.4],
  opacitiesSizeHover: [0.4, 1, 0.4],
  opacitiesSugarHover: [1, 0.4, 0.4, 0.4],
  drinkVariant: undefined as ProductVariant | undefined,
});

export const useDrinkDetails = create(
  devtools(
    persist(
      combine(
        { ...getDrinkInitialState(), ...getDrinkInitialState },
        (set) => ({
          setDrinkName: (state: string) => {
            set({ drinkName: state });
          },
          setDrinkSize: (state: number) => {
            set({ drinkSize: state });
          },
          setDrinkAmount: (state: number) => {
            set({ drinkAmount: state });
          },
          setDrinkPrice: (state: number) => {
            set({ drinkPrice: state });
          },
          setSugarAmount: (state: number) => {
            set({ sugarAmount: state });
          },
          setOpacitiesSize: (state: number[]) => {
            set({ opacitiesSize: state });
          },
          setOpacitiesSugar: (state: number[]) => {
            set({ opacitiesSugar: state });
          },
          setOpacitiesAdditions: (state: number[]) => {
            set({ opacitiesAdditions: state });
          },
          setCoffeeAdditions: (state: { Cream: number; Vanilla: number }) => {
            set({ coffeeAdditions: state });
          },
          setOpacitiesAdditionsHover: (state: number[]) => {
            set({ opacitiesAdditionsHover: state });
          },
          setDrinkVariant: (state: ProductVariant) => {
            set({ drinkVariant: state });
          },
          increaseDrinkAmount: () => {
            set((state) => ({ drinkAmount: state.drinkAmount + 1 }));
          },
          decreaseDrinkAmount: () => {
            set((state) => {
              return { drinkAmount: state.drinkAmount - 1 };
            });
          },
          newDrinkSize: (size: number) => {
            set((state) => {
              const updatedOpacities = state.opacitiesSize.map((_, i) =>
                i === size ? 1 : 0.4,
              );
              return { drinkSize: size, opacitiesSize: updatedOpacities };
            });
          },
          newSugarAmount: (amount: number) => {
            set((state) => {
              const updatedOpacities = state.opacitiesSugar.map((_, i) =>
                i === amount ? 1 : 0.4,
              );
              return { sugarAmount: amount, opacitiesSugar: updatedOpacities };
            });
          },
          manageAdditions: (item: number) => {
            set((state) => {
              const extra = item === 0 ? "Cream" : "Vanilla";
              const updatedAdditions = {
                ...state.coffeeAdditions,
                [extra]: state.coffeeAdditions[extra] === 1 ? 0 : 1,
              };
              const updatedAdditionsOpacities = state.opacitiesAdditions.map(
                (value, i) => (i === item ? (value === 1 ? 0.4 : 1) : value),
              );
              return {
                coffeeAdditions: updatedAdditions,
                opacitiesAdditions: updatedAdditionsOpacities,
              };
            });
          },
          updateAdditionOpacities: (index: number, opacity: number) => {
            set((state) => {
              const updatedOpacities = [...state.opacitiesAdditions];

              if (opacity === 1) {
                updatedOpacities[index] = opacity;
              } else if (state.opacitiesAdditions[index] !== 1) {
                updatedOpacities[index] = 0.4;
              }

              return { opacitiesAdditionsHover: updatedOpacities };
            });
          },
          updateSizeOpacities: (index: number, opacity: number) => {
            set((state) => {
              const updatedOpacities = [...state.opacitiesSize];

              if (opacity === 1) {
                updatedOpacities[index] = opacity;
              } else if (state.opacitiesSize[index] !== 1) {
                updatedOpacities[index] = 0.4;
              }

              return { opacitiesSizeHover: updatedOpacities };
            });
          },
          updateSugarOpacities: (index: number, opacity: number) => {
            set((state) => {
              const updatedOpacities = [...state.opacitiesSugar];

              if (opacity === 1) {
                updatedOpacities[index] = opacity;
              } else if (state.opacitiesSugar[index] !== 1) {
                updatedOpacities[index] = 0.4;
              }

              return { opacitiesSugarHover: updatedOpacities };
            });
          },
        }),
      ),
      { name: "DrinkDetails" },
    ),
  ),
);

interface StoreCart {
  cartId: string;
  basketAmount: number;
  totalAmount: number;
  setCartId: (cartId: string) => void;
  setBasketAmount: (basketAmount: number) => void;
  setTotalAmount: (totalAmount: number) => void;
}

export const useStoreCart = create<StoreCart>()(
  devtools(
    persist(
      (set) => ({
        cartId: "",
        basketAmount: 0,
        totalAmount: 0,
        setCartId: (state: string) => {
          set({ cartId: state });
        },
        setBasketAmount: (state: number) => {
          set({ basketAmount: state });
        },
        setTotalAmount: (state: number) => {
          set({ totalAmount: state });
        },
      }),

      { name: "StoreCart" },
    ),
  ),
);
