import { useState, useEffect } from "react";
import { useCreateCartMutation } from "~/gql/schema";

const useCartId = () => {
  const [cartId, setCartId] = useState("");
  const [createCartMutation] = useCreateCartMutation();

  useEffect(() => {
    const cardIdTemp = localStorage.getItem("cartId") ?? null;

    if (!cardIdTemp) {
      createCartMutation()
        .then((res) => {
          const newCartId = res.data?.cartCreate?.cart?.id ?? "";
          setCartId(newCartId);
          localStorage.setItem("cartId", newCartId);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setCartId(cardIdTemp);
    }
  }, [createCartMutation]);

  return cartId;
};

export default useCartId;
