"use client";
import React from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import ProfilePage from "./profile-server";
import { useGetCustomerQuery } from "@gql/schema";

export default function ProfileClient() {
  const { user } = useUser();
  let customerAccessToken = "";
  if (typeof window !== "undefined") {
    customerAccessToken = localStorage.getItem("customer_access_token") ?? "";
  }
  const { data } = useGetCustomerQuery({
    variables: {
      customerAccessToken: customerAccessToken,
    },
  });

  return (
    <ProfilePage username={user?.name} image={user?.picture} data={data} />
  );
}
