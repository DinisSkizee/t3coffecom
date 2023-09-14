import Link from "next/link";
import React from "react";
import { useGetCheckoutUrlQuery } from "~/gql/schema";

const CheckoutButton = ({ cartId }: { cartId: string }) => {
  const { data } = useGetCheckoutUrlQuery({
    variables: { cartId: cartId },
  });
  return (
    <div className="flex cursor-pointer select-none items-center justify-center">
      {data?.cart?.checkoutUrl && (
        <Link
          href={data?.cart?.checkoutUrl}
          className="flex w-[90%] items-center justify-center rounded-full bg-[#B98068] py-3.5 text-white hover:drop-shadow-md"
        >
          Check out
        </Link>
      )}
    </div>
  );
};

export default CheckoutButton;
