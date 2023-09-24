"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const ToDo = () => {
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
};

export default ToDo;
