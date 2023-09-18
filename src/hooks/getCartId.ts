import { useCreateCartMutation } from "@gql/schema";
import { useStoreCart } from "@state/store";

const useCartId = () => {
  const { cartId, setCartId } = useStoreCart();
  const [createCartMutation] = useCreateCartMutation();

  if (!cartId) {
    createCartMutation()
      .then((res) => {
        const newCartId = res.data?.cartCreate?.cart?.id ?? "";
        setCartId(newCartId);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return cartId;
};

export default useCartId;
