"use client";
import React from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import ProfilePage from "./profile-server";
import { useGetCustomerQuery } from "@gql/schema";

export default function ProfileClient() {
  const { user } = useUser();
  const customerAccessToken =
    localStorage.getItem("customer_access_token") ?? "";
  const { data, error } = useGetCustomerQuery({
    variables: {
      customerAccessToken: customerAccessToken,
    },
  });

  console.log("data", data);
  console.log("error", error);

  return <ProfilePage username={user?.name} image={user?.picture} />;
}
