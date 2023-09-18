import React, { useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import Header from "@components/Header";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import { useGetCustomerQuery } from "@gql/schema";
import { login } from "@lib/apollo-customer";

const CssTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "#3E4A59",
    opacity: "70%",
  },
  "& label": {
    color: "#4B5461",
    opacity: "45%",
  },
  "& .MuiInput-input": {
    color: "#24272B",
    opacity: "80%",
    marginTop: "3px",
    marginBottom: "4px",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#c28e79",
  },

  "& .MuiOutlinedInput-root": {
    "&.Mui-focused fieldset": {
      borderColor: "#c28e79",
    },
  },
});

const LoginPage = () => {
  // const { data } = useGetCustomerQuery({
  //   variables: {
  //     customerAccessToken:
  //       localStorage.getItem("SHOPIFY_CUSTOMER_ACCESS_TOKEN") ?? "",
  //   },
  // });
  useEffect(() => {
    login()
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }, []);
  // useEffect(() => {
  //   console.log(data);
  // }, [data]);
  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <div className="flex w-full justify-center">
        <div className="flex h-screen w-[414px] flex-col bg-white">
          <Header />
          <div className="px-5">
            {/* Login Header */}
            <div className="mt-2 flex flex-row items-center justify-center">
              <Link href="/start" className="mr-auto hover:drop-shadow-strDrop">
                <svg width="8" height="13" viewBox="0 0 8 13" fill="none">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M8 1.5L6.5 0L0 6.5L6.5 13L8 11.5L3 6.5L8 1.5Z"
                    fill="#8C746A"
                  />
                </svg>
              </Link>
              <h1 className="absolute text-[29px] text-dark-brown">Login</h1>
            </div>
            {/* Welcome Back */}
            <div className="my-[2.5rem]">
              <h1 className="font-sans text-[35px] leading-9 text-dark-brown">
                Welcome back!
              </h1>
            </div>
            {/* Input Boxes */}
            <div className="flex flex-col gap-[2rem]">
              <CssTextField
                id="inputbox"
                label="Email"
                variant="standard"
                className="w-full"
                size="medium"
              />
              <CssTextField
                id="inputbox"
                label="Password"
                variant="standard"
                type="password"
                className="w-full"
                size="medium"
              />
              <Link
                href={{ pathname: "/todo", query: "login" }}
                className="ml-auto text-[18px] 
               tracking-wider text-almond-brown"
              >
                Forgot password?
              </Link>
            </div>
            <div className="mt-[2.5rem] flex flex-col items-center gap-3">
              <Link
                href="/login"
                className="flex h-[3rem] w-[80%] items-center justify-center rounded-full bg-almond-brown text-[18px] font-thin tracking-wide text-white hover:font-medium"
              >
                Log In
              </Link>
              <div className="flex flex-row items-center gap-1 text-[18px] tracking-wide">
                <h2 className=" text-[#3E4A59] opacity-50">
                  {`Don't have an account?`}
                </h2>
                <Link
                  className="text-almond-brown !opacity-100"
                  href={{ pathname: "/todo", query: "login" }}
                >
                  Register
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
