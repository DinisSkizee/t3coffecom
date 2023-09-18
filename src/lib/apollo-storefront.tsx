import { type PropsWithChildren } from "react";
import {
  ApolloProvider,
  ApolloClient,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";

const httpLink = new HttpLink({
  uri: `https://${process.env.NEXT_PUBLIC_DOMAIN}.myshopify.com/api/${process.env.NEXT_PUBLIC_VERSION}/graphql.json`,
  headers: {
    "X-Shopify-Storefront-Access-Token": process.env.NEXT_PUBLIC_TOKEN ?? "",
  },
});

export const ApolloStorefrontProvider = ({ children }: PropsWithChildren) => {
  const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
  });
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
