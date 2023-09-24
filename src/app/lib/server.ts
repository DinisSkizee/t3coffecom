import { createCustomerClient } from "src/app/lib/customer.server";

export const handleRequest = async (request: Request): Promise<Response> => {
  try {
    /**
     * Open a cache instance in the worker and a custom session instance.
     */
    if (!process.env.SESSION_SECRET) {
      throw new Error("SESSION_SECRET environment variable is not set");
    }

    /**
     * Create a customer client for the new customer API.
     */
    const customer = createCustomerClient({
      request,
      customerAccountId: process.env.PUBLIC_CUSTOMER_ACCOUNT_ID ?? "",
      customerAccountUrl: process.env.PUBLIC_CUSTOMER_ACCOUNT_URL ?? "",
    });

    const response = await fetch(request);

    return response;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return new Response("An unexpected error occurred", { status: 500 });
  }
};
