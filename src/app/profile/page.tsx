"use client";
import React, { useEffect } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import ProfilePage from "./profile-server";
import { useGetCustomerQuery } from "@gql/schema";

export default function ProfileClient() {
  const { user } = useUser();
  const customerAccessToken = localStorage.getItem("customer_access_token");
  const { data, error } = useGetCustomerQuery({
    variables: {
      customerAccessToken: customerAccessToken ?? "",
    },
  });
  useEffect(() => {
    console.log("data", data);
    console.log("error", error);
  }, [data, error]);
  console.log(user);
  return <ProfilePage username={user?.name} image={user?.picture} />;
}
