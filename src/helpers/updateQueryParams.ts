import { type AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

interface QueryProps {
  drinkName: string;
  drinkAmount: number;
  router: AppRouterInstance;
  pathname: string;
}

export const updateQueryParams = ({
  drinkName,
  drinkAmount,
  router,
  pathname,
}: QueryProps) => {
  const newUrl = `${pathname}?drink=${drinkName}&amount=${drinkAmount}`;
  router.replace(newUrl);
};
