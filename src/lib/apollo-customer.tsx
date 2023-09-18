import { useEffect, type PropsWithChildren } from "react";
import {
  ApolloProvider,
  ApolloClient,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { useGetShopIdQuery } from "@gql/schema";

const httpLink = new HttpLink({
  uri: `https://${process.env.NEXT_PUBLIC_DOMAIN}/account/customer/api/unstable/graphql`,
  headers: {
    Authorization: process.env.SHOPIFY_ADMIN_ACCESS_SECRET ?? "",
  },
});

export const ApolloCustomerProvider = ({ children }: PropsWithChildren) => {
  const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
  });
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

interface CustomerClient {
  login: () => Promise<Response>;
  logout: () => Promise<Response>;
  authorize: (redirectPath?: string) => Promise<Response>;
  isLoggedIn: () => Promise<boolean>;
  query: (
    query: string,
    variables?: any,
  ) => Promise<{ data: unknown; status: number; ok: boolean }>;
}

// export const createCustomerClient({
//   session,
//   customerAccountId,
//   customerAccountUrl,
// }) => {

// }
export const login = async () => {
  const clientId = process.env.SHOPIFY_CUSTOMER_ACCESS_TOKEN ?? "";
  const loginUrl = new URL(
    `https://shopify.com/gid://shopify/Shop/81697997077/auth/oauth/authorize`,
  );
  loginUrl.searchParams.append(
    "scope",
    "openid email https://api.customers.com/auth/customer.graphql",
  );
  loginUrl.searchParams.append("client_id", clientId);
  loginUrl.searchParams.append("response_type", "code");
  loginUrl.searchParams.append(
    "redirect_uri",
    `http://localhost:3000/selectDrink`,
  );
  loginUrl.searchParams.append("state", "<state>");
  loginUrl.searchParams.append("nonce", "<nonce>");
  // Public client
  // eslint-disable-next-line @typescript-eslint/await-thenable
  const verifier = await generateCodeVerifier();
  const challenge = await generateCodeChallenge(verifier);

  localStorage.setItem("code-verifier", verifier);

  loginUrl.searchParams.append("code_challenge", challenge);
  loginUrl.searchParams.append("code_challenge_method", "S256");

  window.location.href = loginUrl.toString();
};

// export const getAccessToken = async () => {
//   const clientId = process.env.SHOPIFY_CUSTOMER_ACCESS_TOKEN ?? "";
//   const body = new URLSearchParams();
//   body.append("grant_type", "authorization_code");
//   body.append("client_id", clientId);
//   body.append("redirect_uri", `http://localhost:3000/selectDrink`);
//   body.append("code", code);
//   // Public Client
//   const codeVerifier = localStorage.getItem("code-verifier");
//   body.append("code_verifier", codeVerifier);
//   const headers = {
//     "content-type": "application/x-www-form-urlencoded",
//     // Confidential Client
//     Authorization: "Basic `<credentials>`",
//   };
//   const response = await fetch(
//     `https://shopify.com/<shop_id>/auth/oauth/token`,
//     {
//       method: "POST",
//       headers: headers,
//       body,
//     },
//   );
//   interface AccessTokenResponse {
//     access_token: string;
//     expires_in: number;
//     id_token: string;
//     refresh_token: string;
//   }
//   const {
//     access_token,
//     expires_in,
//     id_token,
//     refresh_token,
//   }: AccessTokenResponse = await response.json();

//   return {
//     access_token,
//     expires_in,
//     id_token,
//     refresh_token,
//   };
// };

// export const refreshToken = async () => {
//   const clientId = process.env.CLIENT_ID ?? "";
//   const body = new URLSearchParams();
//   body.append("grant_type", "refresh_token");
//   body.append("client_id", clientId);
//   body.append("refresh_token", refresh_token);
//   const headers = {
//     "content-type": "application/x-www-form-urlencoded",
//     // Confidential Client
//     Authorization: "Basic `<credentials>`",
//   };
//   const response = await fetch(
//     `https://shopify.com/<shop_id>/auth/oauth/token`,
//     {
//       method: "POST",
//       headers: headers,
//       body,
//     },
//   );
//   interface AccessTokenResponse {
//     access_token: string;
//     expires_in: number;
//     id_token: string;
//     refresh_token: string;
//   }
//   const {
//     access_token,
//     expires_in,
//     id_token,
//     refresh_token,
//   }: AccessTokenResponse = await response.json();

//   return {
//     access_token,
//     expires_in,
//     id_token,
//     refresh_token,
//   };
// };

export function generateCodeVerifier() {
  const rando = generateRandomCode();
  return base64UrlEncode(rando);
}
export async function generateCodeChallenge(codeVerifier: string) {
  const digestOp = await crypto.subtle.digest(
    { name: "SHA-256" },
    new TextEncoder().encode(codeVerifier),
  );
  const hash = convertBufferToString(digestOp);
  return base64UrlEncode(hash);
}
function generateRandomCode() {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return String.fromCharCode.apply(null, Array.from(array));
}
function base64UrlEncode(str: string) {
  const base64 = btoa(str);
  // This is to ensure that the encoding does not have +, /, or = characters in it.
  return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
}
function convertBufferToString(hash: ArrayBuffer) {
  const uintArray = new Uint8Array(hash);
  const numberArray = Array.from(uintArray);
  return String.fromCharCode(...numberArray);
}
export function generateState(): string {
  const timestamp = Date.now().toString();
  const randomString = Math.random().toString(36).substring(2);
  return timestamp + randomString;
}

export function generateNonce(length: number) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let nonce = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    nonce += characters.charAt(randomIndex);
  }

  return nonce;
}
export function getNonce(token: string) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
  return decodeJwt(token).payload.nonce;
}

export function decodeJwt(token: string) {
  const [header, payload, signature] = token.split(".");

  const decodedHeader = JSON.parse(atob(header ?? ""));
  const decodedPayload = JSON.parse(atob(payload ?? ""));

  return {
    header: decodedHeader,
    payload: decodedPayload,
    signature,
  };
}
