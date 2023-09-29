import Footer from "@components/Footer";
import Header from "@components/Header";
import { useGetCustomerQuery } from "@gql/schema";
import BackArrow from "@svg/BackArrow";
import { type Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import React from "react";
export const metadata: Metadata = {
  title: "Profile",
};

interface Props {
  username: string | undefined | null;
  image: string | undefined | null;
}
export default function ProfilePage({ username, image }: Props) {
  const customerAccessToken =
    localStorage.getItem("customer_access_token") ?? "";
  const { data, error } = useGetCustomerQuery({
    variables: {
      customerAccessToken: customerAccessToken,
    },
  });

  return (
    <div className="flex w-full justify-center">
      <div className="flex h-screen w-[414px] flex-col bg-white">
        <Header />
        <div className="my-1 flex h-full flex-col">
          {/* Preferences header */}
          <div className="mx-7 mb-4 flex items-center">
            <Link href={"/selectDrink"}>
              <BackArrow />
            </Link>
            <div className="m-auto my-2 select-none text-[24px] text-dark-brown">
              Profile
            </div>
          </div>
          {data && <p>{data.customer?.id}</p>}
          {username ? (
            <>
              <div className="mx-10 mt-10">
                {/* Profile Details */}
                <div className="mb-20 flex items-center gap-10">
                  <div>
                    {image ? (
                      <Image
                        alt={username}
                        src={image}
                        width={120}
                        height={120}
                        className="rounded-2xl"
                      />
                    ) : (
                      <svg
                        width="143"
                        height="137"
                        viewBox="0 0 143 137"
                        fill="none"
                      >
                        <rect
                          width="143"
                          height="137"
                          fill="#F8E9D6"
                          fillOpacity="0.5"
                          rx="10%"
                        />
                        <mask id="path-1-inside-1_263_2431" fill="white">
                          <path d="M143 105.385V126.461C143 129.256 141.841 131.937 139.778 133.913C137.715 135.89 134.917 137 132 137H110" />
                        </mask>
                        <path
                          d="M149 105.385C149 102.071 146.314 99.3845 143 99.3845C139.686 99.3845 137 102.071 137 105.385H149ZM110 131C106.686 131 104 133.686 104 137C104 140.314 106.686 143 110 143V131ZM137 105.385V126.461H149V105.385H137ZM137 126.461C137 127.58 136.539 128.708 135.627 129.581L143.929 138.246C147.144 135.166 149 130.933 149 126.461H137ZM135.627 129.581C134.708 130.462 133.407 131 132 131V143C136.428 143 140.723 141.317 143.929 138.246L135.627 129.581ZM132 131H110V143H132V131Z"
                          fill="#B98068"
                          mask="url(#path-1-inside-1_263_2431)"
                        />
                        <mask id="path-3-inside-2_263_2431" fill="white">
                          <path d="M110 0H132C134.917 0 137.715 1.1103 139.778 3.08664C141.841 5.06299 143 7.74349 143 10.5385V31.6154" />
                        </mask>
                        <path
                          d="M110 -6C106.686 -6 104 -3.31371 104 0C104 3.31371 106.686 6 110 6V-6ZM137 31.6154C137 34.9291 139.686 37.6154 143 37.6154C146.314 37.6154 149 34.9291 149 31.6154H137ZM110 6H132V-6H110V6ZM132 6C133.407 6 134.708 6.53792 135.627 7.4192L143.929 -1.24592C140.723 -4.31732 136.428 -6 132 -6V6ZM135.627 7.4192C136.539 8.29211 137 9.4198 137 10.5385H149C149 6.06718 147.144 1.83387 143.929 -1.24592L135.627 7.4192ZM137 10.5385V31.6154H149V10.5385H137Z"
                          fill="#B98068"
                          mask="url(#path-3-inside-2_263_2431)"
                        />
                        <mask id="path-5-inside-3_263_2431" fill="white">
                          <path d="M0 31.6154V10.5385C0 7.74349 1.15893 5.06299 3.22183 3.08664C5.28473 1.1103 8.08262 0 11 0H33" />
                        </mask>
                        <path
                          d="M-6 31.6154C-6 34.9291 -3.31371 37.6154 0 37.6154C3.31371 37.6154 6 34.9291 6 31.6154H-6ZM11 0V-6V0ZM33 6C36.3137 6 39 3.31371 39 0C39 -3.31371 36.3137 -6 33 -6V6ZM6 31.6154V10.5385H-6V31.6154H6ZM6 10.5385C6 9.41979 6.46146 8.29211 7.3726 7.4192L-0.928949 -1.24592C-4.14361 1.83387 -6 6.06718 -6 10.5385H6ZM7.3726 7.4192C8.29248 6.53792 9.59291 6 11 6V-6C6.57232 -6 2.27697 -4.31732 -0.928949 -1.24592L7.3726 7.4192ZM11 6H33V-6H11V6Z"
                          fill="#B98068"
                          mask="url(#path-5-inside-3_263_2431)"
                        />
                        <mask id="path-7-inside-4_263_2431" fill="white">
                          <path d="M33 137H11C8.08262 137 5.28473 135.89 3.22183 133.913C1.15893 131.937 0 129.256 0 126.461V105.385" />
                        </mask>
                        <path
                          d="M33 143C36.3137 143 39 140.314 39 137C39 133.686 36.3137 131 33 131V143ZM0 126.461H-6H0ZM6 105.385C6 102.071 3.31371 99.3845 0 99.3845C-3.31371 99.3845 -6 102.071 -6 105.385H6ZM33 131H11V143H33V131ZM11 131C9.59291 131 8.29248 130.462 7.3726 129.581L-0.928949 138.246C2.27697 141.317 6.57232 143 11 143V131ZM7.3726 129.581C6.46146 128.708 6 127.58 6 126.461H-6C-6 130.933 -4.14361 135.166 -0.928949 138.246L7.3726 129.581ZM6 126.461V105.385H-6V126.461H6Z"
                          fill="#B98068"
                          mask="url(#path-7-inside-4_263_2431)"
                        />
                        <path
                          d="M71.5 63.2308C77.3348 63.2308 82.9305 61.0102 87.0563 57.0575C91.1821 53.1048 93.5 47.7438 93.5 42.1538C93.5 36.5639 91.1821 31.2029 87.0563 27.2502C82.9305 23.2975 77.3348 21.0769 71.5 21.0769C65.6652 21.0769 60.0694 23.2975 55.9436 27.2502C51.8178 31.2029 49.5 36.5639 49.5 42.1538C49.5 47.7438 51.8178 53.1048 55.9436 57.0575C60.0694 61.0102 65.6652 63.2308 71.5 63.2308Z"
                          stroke="#B98068"
                          strokeWidth="6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M113.333 110.654C110.49 102.165 104.907 94.7608 97.3886 89.5076C89.8704 84.2544 80.8053 81.4238 71.5 81.4238C62.1946 81.4238 53.1296 84.2544 45.6114 89.5076C38.0932 94.7608 32.5102 102.165 29.667 110.654H113.333Z"
                          stroke="#B98068"
                          strokeWidth="6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </div>
                  <div className="select-none text-almond-brown">
                    <h2 className="text-[22px] font-semibold">{username}</h2>
                    {/* <div className="text-[14px]">
                  <p>27 York Pl</p>
                  <p>Edinburgh, EH5 9JP</p>
                </div> */}
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex flex-col gap-10">
                  <div className="flex h-[80px] cursor-pointer select-none items-center justify-center rounded-2xl border-2 border-almond-brown bg-background-light bg-cover text-[20px] font-semibold text-almond-brown shadow-md hover:drop-shadow-strDrop">
                    My Orders
                  </div>
                  <div className="flex h-[80px] cursor-pointer select-none items-center justify-center rounded-2xl border-2 border-almond-brown bg-background-light bg-cover text-[20px] font-semibold text-almond-brown shadow-md hover:drop-shadow-strDrop">
                    Settings
                  </div>
                </div>
              </div>
              <Link
                href="/api/auth/logout"
                className="mx-10 mb-4 mt-auto flex h-[47px] cursor-pointer select-none items-center justify-center gap-2 rounded-2xl border-2 border-almond-brown text-[20px] font-bold text-almond-brown shadow-sm hover:shadow-md"
              >
                <svg
                  width="25"
                  height="27"
                  viewBox="0 0 25 27"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <mask id="path-1-inside-1_263_2414" fill="white">
                    <path d="M15.7035 20.7308V24.8627C15.7035 25.4106 15.5264 25.9361 15.2111 26.3235C14.8958 26.711 14.4681 26.9286 14.0222 26.9286H2.25308C1.80717 26.9286 1.37953 26.711 1.06422 26.3235C0.748914 25.9361 0.571777 25.4106 0.571777 24.8627V2.13746C0.571777 1.58955 0.748914 1.06407 1.06422 0.67663C1.37953 0.289193 1.80717 0.0715332 2.25308 0.0715332H14.0222C14.4681 0.0715332 14.8958 0.289193 15.2111 0.67663C15.5264 1.06407 15.7035 1.58955 15.7035 2.13746V6.26933" />
                  </mask>
                  <path
                    d="M18.7035 20.7308C18.7035 19.074 17.3604 17.7308 15.7035 17.7308C14.0467 17.7308 12.7035 19.074 12.7035 20.7308H18.7035ZM0.571777 24.8627H-2.42822H0.571777ZM2.25308 0.0715332V-2.92847V0.0715332ZM12.7035 6.26933C12.7035 7.92618 14.0467 9.26933 15.7035 9.26933C17.3604 9.26933 18.7035 7.92618 18.7035 6.26933H12.7035ZM12.7035 20.7308V24.8627H18.7035V20.7308H12.7035ZM12.7035 24.8627C12.7035 24.8161 12.7106 24.7605 12.7327 24.695C12.7545 24.6303 12.7979 24.536 12.8842 24.4299L17.5379 28.2172C18.3316 27.2419 18.7035 26.0291 18.7035 24.8627H12.7035ZM12.8842 24.4299C13.0611 24.2125 13.4496 23.9286 14.0222 23.9286V29.9286C15.4867 29.9286 16.7304 29.2094 17.5379 28.2172L12.8842 24.4299ZM14.0222 23.9286H2.25308V29.9286H14.0222V23.9286ZM2.25308 23.9286C2.82573 23.9286 3.21416 24.2125 3.39105 24.4299L-1.26261 28.2172C-0.455108 29.2094 0.788616 29.9286 2.25308 29.9286V23.9286ZM3.39105 24.4299C3.47739 24.536 3.52078 24.6303 3.54258 24.695C3.56465 24.7605 3.57178 24.8161 3.57178 24.8627H-2.42822C-2.42822 26.0291 -2.05634 27.2419 -1.26261 28.2172L3.39105 24.4299ZM3.57178 24.8627V2.13746H-2.42822V24.8627H3.57178ZM3.57178 2.13746C3.57178 2.18405 3.56465 2.2397 3.54258 2.30517C3.52079 2.36984 3.47739 2.46417 3.39105 2.57026L-1.26261 -1.217C-2.05634 -0.241701 -2.42822 0.971038 -2.42822 2.13746H3.57178ZM3.39105 2.57026C3.21416 2.78763 2.82572 3.07153 2.25308 3.07153V-2.92847C0.788622 -2.92847 -0.455104 -2.20924 -1.26261 -1.217L3.39105 2.57026ZM2.25308 3.07153H14.0222V-2.92847H2.25308V3.07153ZM14.0222 3.07153C13.4496 3.07153 13.0611 2.78763 12.8842 2.57026L17.5379 -1.217C16.7304 -2.20924 15.4867 -2.92847 14.0222 -2.92847V3.07153ZM12.8842 2.57026C12.7979 2.46417 12.7545 2.36983 12.7327 2.30517C12.7106 2.2397 12.7035 2.18405 12.7035 2.13746H18.7035C18.7035 0.97104 18.3316 -0.241699 17.5379 -1.217L12.8842 2.57026ZM12.7035 2.13746V6.26933H18.7035V2.13746H12.7035Z"
                    fill="#B98068"
                    mask="url(#path-1-inside-1_263_2414)"
                  />
                  <path
                    d="M10.6597 11.5C9.5551 11.5 8.65967 12.3954 8.65967 13.5C8.65967 14.6046 9.5551 15.5 10.6597 15.5V11.5ZM22.4288 15.5C23.5334 15.5 24.4288 14.6046 24.4288 13.5C24.4288 12.3954 23.5334 11.5 22.4288 11.5V15.5ZM10.6597 15.5H22.4288V11.5H10.6597V15.5Z"
                    fill="#B98068"
                    mask="url(#path-3-inside-2_263_2414)"
                  />
                  <path
                    d="M20.0659 9.36816L23.4285 13.5L20.0659 17.6319"
                    stroke="#B98068"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                <span>Sign Out</span>
              </Link>
            </>
          ) : (
            <Link
              href="/login"
              className="flex h-full items-center justify-center text-2xl"
            >
              Missing Profile
            </Link>
          )}
        </div>
        <Footer />
      </div>
    </div>
  );
}
