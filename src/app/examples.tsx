import React, { useEffect, useState } from "react";
import {
  useGetProductsQuery,
  useCreateCartMutation,
  useAddCartLinesMutation,
} from "src/gql/schema";

export const Examples = () => {
  const [cartId, setCartId] = useState<string | undefined>();
  const [productId, setProductId] = useState<string | undefined>();

  const [
    createCartMutation,
    { data: createCartData, loading: createCartLoading },
  ] = useCreateCartMutation();
  const [
    addCartLinesMutation,
    { data: cartLinesData, loading: cartLinesLoading, error: cartAddError },
  ] = useAddCartLinesMutation();
  const {
    data: productsData,
    loading: productsLoading,
    error: productsError,
  } = useGetProductsQuery({
    variables: {
      first: 10,
    },
  });

  useEffect(() => {
    createCartMutation()
      .then((res) => {
        console.log(res);
        setCartId(res.data?.cartCreate?.cart?.id);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    addCartLinesMutation({
      variables: {
        cartId:
          createCartData?.cartCreate?.cart?.id ??
          "gid://shopify/Cart/c1-a0b12a67fcd43e19986c32b69fbed6be",
        lines: {
          merchandiseId:
            productsData?.products.edges[0]?.node.variants.edges[0]?.node.id ??
            "gid://shopify/ProductVariant/8543657984277",
        },
      },
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [cartId]);

  return (
    <div>
      Products:
      <div>
        {productsData?.products.edges.map((item) => (
          <div key={item.node.id}>{`${item.node.title} - ${item.node.id}`}</div>
        ))}
      </div>
      <br />
      Product Variants:
      <div>
        {productsData?.products.edges.map((productEdge) =>
          productEdge.node.variants.edges.map((variantEdge) => (
            <div key={variantEdge.node.id}>
              {`${
                variantEdge.node.title === "Default Title"
                  ? ""
                  : variantEdge.node.title
              } ${productEdge.node.title} - ${variantEdge.node.id} - ${
                variantEdge.node.price.amount
              }`}
              <br />
            </div>
          )),
        )}
      </div>
    </div>
  );
};

export default Examples;
