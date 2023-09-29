import { type PropsWithChildren } from "react";
import {
  ApolloProvider,
  ApolloClient,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";

const httpLink = new HttpLink({
  uri: `https://${process.env.NEXT_PUBLIC_DOMAIN}/account/customer/api/unstable/graphql`,
  headers: {
    Authorization: process.env.SHOPIFY_ADMIN_ACCESS_SECRET ?? "",
  },
});

const userAgent =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.93 Safari/537.36";

export const ApolloCustomerProvider = ({ children }: PropsWithChildren) => {
  ``;
  const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
  });
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export interface CustomerClient {
  logout: () => Promise<Response>;
  authorize: (redirectPath?: string) => Promise<Response>;
  isLoggedIn: () => Promise<boolean>;
  login: () => Promise<Response>;
  query: (
    query: string,
    variables?: any,
  ) => Promise<{ data: unknown; status: number; ok: boolean }>;
}

export const login = async () => {
  const clientId = "shp_870062c3-6053-4ade-bb85-8c0c8d4fbdb1";
  const loginUrl = new URL(
    `https://shopify.com/81697997077/auth/oauth/authorize`,
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
  const state = generateState();
  const nonce = generateNonce(16);
  loginUrl.searchParams.append("state", state);
  loginUrl.searchParams.append("nonce", nonce);

  // eslint-disable-next-line @typescript-eslint/await-thenable
  const verifier = await generateCodeVerifier();
  const challenge = await generateCodeChallenge(verifier);

  localStorage.setItem("code-verifier", verifier);

  loginUrl.searchParams.append("code_challenge", challenge);
  loginUrl.searchParams.append("code_challenge_method", "S256");

  window.location.href = loginUrl.toString();
};

export const logout = () => {
  const idToken = localStorage.getItem("id_token");

  localStorage.removeItem("code-verifier");
  localStorage.removeItem("customer_authorization_code_token");
  localStorage.removeItem("expires_at");
  localStorage.removeItem("id_token");
  localStorage.removeItem("refresh_token");
  localStorage.removeItem("customer_access_token");

  const logoutUrl = new URL(
    `https://shopify.com/81697997077/auth/logout?id_token_hint=${idToken}`,
  );
  window.location.href = logoutUrl.toString();
};

export const isLoggedIn = async () => {
  if (!localStorage.getItem("customer_access_token")) return false;

  const expiryDate = localStorage.getItem("expires_at");
  if (expiryDate && Date.parse(expiryDate) < new Date().getTime()) {
    try {
      await refreshToken(
        "shp_870062c3-6053-4ade-bb85-8c0c8d4fbdb1",
        "https://shopify.com/81697997077",
        origin,
      );

      return true;
    } catch (error) {
      if (error && (error as Response).status !== 401) {
        throw error;
      }
    }
  } else {
    return true;
  }

  localStorage.removeItem("code-verifier");
  localStorage.removeItem("customer_authorization_code_token");
  localStorage.removeItem("expires_at");
  localStorage.removeItem("id_token");
  localStorage.removeItem("refresh_token");
  localStorage.removeItem("customer_access_token");

  return false;
};

// export const getAccessToken = async () => {
//   const clientId = process.env.CLIENT_ID!;
//   const body = new URLSearchParams();
//   body.append("grant_type", "authorization_code");
//   body.append("client_id", clientId);
//   body.append("redirect_uri", `<redirect_uri>`);
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
//   const { access_token, expires_in, id_token, refresh_token } =
//     await response.json();
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

async function refreshToken(
  customerAccountId: string,
  customerAccountUrl: string,
  origin: string,
) {
  const newBody = new URLSearchParams();

  newBody.append("grant_type", "refresh_token");
  newBody.append("client_id", customerAccountId);

  const refreshToken = localStorage.getItem("refresh_token");
  refreshToken && newBody.append("refresh_token", refreshToken);

  const headers = {
    "content-type": "application/x-www-form-urlencoded",
    "User-Agent": userAgent,
    Origin: origin,
  };

  const response = await fetch(`${customerAccountUrl}/auth/oauth/token`, {
    method: "POST",
    headers,
    body: newBody,
  });

  interface AccessTokenResponse {
    access_token: string;
    expires_in: number;
    id_token: string;
    refresh_token: string;
  }

  if (!response.ok) {
    const text = await response.text();
    throw new Response(text, {
      status: response.status,
      headers: {
        "Content-Type": "text/html; charset=utf-8",
      },
    });
  }

  const {
    access_token,
    expires_in,
    id_token,
    refresh_token,
  }: AccessTokenResponse = await response.json();

  localStorage.setItem("customer_authorization_code_token", access_token);
  // Store the date in future the token expires, separated by two minutes
  localStorage.setItem(
    "expires_at",
    new Date(new Date().getTime() + (expires_in - 120) * 1000)
      .getTime()
      .toString(),
  );
  localStorage.setItem("id_token", id_token);
  localStorage.setItem("refresh_token", refresh_token);

  const customerAccessToken = await exchangeAccessToken(
    customerAccountId,
    customerAccountUrl,
    origin,
  );

  localStorage.setItem("customer_access_token", customerAccessToken);
}

async function exchangeAccessToken(
  customerAccountId: string,
  customerAccountUrl: string,
  origin: string,
) {
  const clientId = customerAccountId;
  const customerApiClientId = "30243aa5-17c1-465a-8493-944bcc4e88aa";
  const accessToken = localStorage.getItem("customer_authorization_code_token");
  const body = new URLSearchParams();

  body.append("grant_type", "urn:ietf:params:oauth:grant-type:token-exchange");
  body.append("client_id", clientId);
  body.append("audience", customerApiClientId);
  accessToken && body.append("subject_token", accessToken);
  body.append(
    "subject_token_type",
    "urn:ietf:params:oauth:token-type:access_token",
  );
  body.append("scopes", "https://api.customers.com/auth/customer.graphql");

  const headers = {
    "content-type": "application/x-www-form-urlencoded",
    "User-Agent": userAgent,
    Origin: origin,
  };

  const response = await fetch(`${customerAccountUrl}/auth/oauth/token`, {
    method: "POST",
    headers,
    body,
  });

  interface AccessTokenResponse {
    access_token: string;
    expires_in: number;
    error?: string;
    error_description?: string;
  }

  const data: AccessTokenResponse = await response.json();
  if (data.error) {
    throw new Error(data.error_description);
  }
  return data.access_token;
}
