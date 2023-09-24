"use client";
import React from "react";
import Link from "next/link";
import { type Metadata } from "next";
import { useRouter } from "next/navigation";

export const metadata: Metadata = {
  title: "CoffeeCom - ToDo",
};

export default function ToDo() {
  const router = useRouter();
  return (
    <Link
      href="#"
      onClick={() => {
        router.back();
      }}
      className="flex h-screen w-full items-center justify-center text-[40px]"
    >
      This Page is Still In Construction
    </Link>
  );
}
