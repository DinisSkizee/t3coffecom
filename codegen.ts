import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  documents: "./src/graphql/**/*.{ts,graphql,tsx,gql}",
  schema: [
    {
      "https://coffeecomdev.myshopify.com/api/2023-07/graphql.json": {
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Storefront-Access-Token":
            "e00bc80d237b193e38521f925004090e",
        },
      },
    },
  ],
  generates: {
    "src/gql/schema.ts": {
      plugins: [
        {
          typescript: {
            enumsAsConst: true,
          },
        },
        "typescript-resolvers",
        "typescript-react-apollo",
        "typescript-operations",
      ],
      config: {
        withHooks: true,
      },
    },
  },
};
export default config;
