import { type NextRouter } from "next/router";

interface QueryProps {
  drinkName: string;
  drinkAmount: number;
  router: NextRouter;
}

export const updateQueryParams = ({
  drinkName,
  drinkAmount,
  router,
}: QueryProps) => {
  const newQuery = { drink: drinkName, amount: drinkAmount };
  router
    .replace({ pathname: router.pathname, query: newQuery })
    .catch((err) => {
      console.log(err);
    });
};
