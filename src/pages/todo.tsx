import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const ToDo = () => {
  const router = useRouter();
  const data = router.query;
  const dataString = Object.keys(data)[0];
  const urlString = "/" + dataString;
  return (
    <Link
      href={{ pathname: urlString }}
      className="flex h-screen w-full items-center justify-center text-[40px]"
    >
      This Page is Still In Construction
    </Link>
  );
};

export default ToDo;
