const userAgent =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.93 Safari/537.36";

export interface CustomerClient {
  logout: () => void;
  authorize: (redirectPath?: string) => Promise<void>;
  isLoggedIn: () => Promise<boolean>;
  login: () => Promise<void>;
}

export function createCustomerClient({
  customerAccountId,
  customerAccountUrl,
  request,
}: {
  customerAccountId: string;
  customerAccountUrl: string;
  customerApiVersion?: string;
  request: Request;
}): CustomerClient {
  const origin = new URL(request.url).origin.replace("http", "https");
  return {
    login: async (): Promise<void> => {
      const loginUrl = new URL(customerAccountUrl + "/auth/oauth/authorize");

      loginUrl.searchParams.set("client_id", customerAccountId);
      loginUrl.searchParams.set("scope", "openid email");
      loginUrl.searchParams.append("response_type", "code");
      loginUrl.searchParams.append("redirect_uri", origin + "/authorize");
      loginUrl.searchParams.set(
        "scope",
        "openid email https://api.customers.com/auth/customer.graphql",
      );
      loginUrl.searchParams.append("state", "<state>");
      loginUrl.searchParams.append("nonce", "<nonce>");
      const verifier = generateCodeVerifier();
      const challenge = await generateCodeChallenge(verifier);

      localStorage.setItem("code-verifier", verifier);

      loginUrl.searchParams.append("code_challenge", challenge);
      loginUrl.searchParams.append("code_challenge_method", "S256");

      window.location.href = loginUrl.toString();
      //   return redirect(loginUrl.toString(), {
      //     headers: {
      //       "Set-Cookie": await session.commit(),
      //     },
      //   });
    },
    logout: () => {
      const idToken = localStorage.getItem("id_token");

      localStorage.removeItem("code-verifier");
      localStorage.removeItem("customer_authorization_code_token");
      localStorage.removeItem("expires_at");
      localStorage.removeItem("id_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("customer_access_token");

      window.location.href = `${customerAccountUrl}/auth/logout?id_token_hint=${idToken}`;
      //   return redirect(
      //     `${customerAccountUrl}/auth/logout?id_token_hint=${idToken}`,
      //     {
      //       status: 302,

      //       headers: {
      //         "Set-Cookie": await session.commit(),
      //       },
      //     },
      //   );
    },
    isLoggedIn: async () => {
      const storedExpiresAt = localStorage.getItem("expires_at");

      if (!localStorage.getItem("customer_access_token")) return false;
      if (storedExpiresAt && parseInt(storedExpiresAt) < new Date().getTime()) {
        try {
          await refreshToken(customerAccountId, customerAccountUrl, origin);

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
    },
    // query: async (query: string, variables?: any) => {
    //   return await fetch(
    //     `${customerAccountUrl}/account/customer/api/${customerApiVersion}/graphql`,
    //     {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //         "User-Agent": userAgent,
    //         Origin: origin,
    //         Authorization: session.get("customer_access_token"),
    //       },
    //       body: JSON.stringify({
    //         operationName: "SomeQuery",
    //         query,
    //         variables: variables || {},
    //       }),
    //     },
    //   ).then(async (response) => {
    //     if (!response.ok) {
    //       throw new Error(
    //         `${response.status} (RequestID ${response.headers.get(
    //           "x-request-id",
    //         )}): ${await response.text()}`,
    //       );
    //     }
    //     return (await response.json()).data;
    //   });
    // }
    authorize: async (redirectPath = "/") => {
      const code = new URL(request.url).searchParams.get("code");

      if (!code) throw new BadRequest("Code search param is required");

      const clientId = customerAccountId;
      const body = new URLSearchParams();

      body.append("grant_type", "authorization_code");
      body.append("client_id", clientId);
      body.append(
        "redirect_uri",
        new URL(request.url).origin.replace("http", "https") + "/authorize",
      );
      body.append("code", code);

      // Public Client
      const codeVerifier = localStorage.getItem("code-verifier");
      body.append("code_verifier", codeVerifier ?? "");

      const headers = {
        "content-type": "application/x-www-form-urlencoded",
        "User-Agent": userAgent,
        Origin: new URL(request.url).origin.replace("http", "https"),
      };

      const response = await fetch(`${customerAccountUrl}/auth/oauth/token`, {
        method: "POST",
        headers,
        body,
      });

      interface AccessTokenResponse {
        access_token: string;
        expires_in: number;
        id_token: string;
        refresh_token: string;
      }

      if (!response.ok) {
        throw new Response(await response.text(), {
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

      window.location.href = redirectPath;
      //   return redirect(redirectPath, {
      //     headers: {
      //       "Set-Cookie": await session.commit(),
      //     },
      //   });
    },
  };
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
  body.append("subject_token", accessToken ?? "");
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
    throw new BadRequest(data.error_description);
  }
  return data.access_token;
}
async function refreshToken(
  customerAccountId: string,
  customerAccountUrl: string,
  origin: string,
) {
  const newBody = new URLSearchParams();

  const refreshToken = localStorage.getItem("refresh_token");
  newBody.append("grant_type", "refresh_token");
  newBody.append("refresh_token", refreshToken ?? "");
  newBody.append("client_id", customerAccountId);

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

function generateCodeVerifier() {
  const rando = generateRandomCode();
  return base64UrlEncode(rando);
}

async function generateCodeChallenge(codeVerifier: string) {
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

class BadRequest extends Response {
  constructor(message?: string) {
    super(`Bad request: ${message}`, { status: 400 });
  }
}
