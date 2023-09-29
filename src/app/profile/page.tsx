"use client";
import React from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import ProfilePage from "./profile-server";

export default function ProfileClient() {
  const { user } = useUser();

  return <ProfilePage username={user?.name} image={user?.picture} />;
}
