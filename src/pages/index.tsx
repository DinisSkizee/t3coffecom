import Head from "next/head";
import Link from "next/link";
import tw from "tailwind-styled-components";

export const BgImage = tw.div`
  absolute
  h-[200%]
  -z-10
  w-full
  bg-center
  bg-pattern-background
  bg-repeat-y
  mix-blend-plus-lighter
  animate-scroll-infinite
`;

export default function Home() {
  return (
    <>
      <Head>
        <title>CoffeeCom</title>
      </Head>
      <div className="relative left-[50%] z-10 h-screen w-[414px] -translate-x-[50%] overflow-hidden bg-[#F8E8D4]">
        <BgImage />
        <div className="min-h-screen"></div>
      </div>

      <Link
        href="/start"
        className="absolute left-[50%] top-[50%] z-50 flex min-h-screen -translate-x-[50%] -translate-y-[50%] flex-col items-center justify-center gap-2"
      >
        {/* Cup */}
        <svg
          width="116"
          height="118"
          viewBox="0 0 116 118"
          fill="none"
          className="drop-shadow-strDrop"
        >
          <g mask="url(#mask0_0_632)">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M47.2225 114.487C22.5542 114.487 2.34961 90.7063 2.34961 61.5108V51.1511H91.8605V61.5108C91.8605 90.7063 71.8909 114.487 47.2225 114.487Z"
              fill="#B98068"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M110.655 68.5742C107.836 78.463 97.0289 84.1137 89.5109 85.7619C92.5651 78.2276 94.2096 69.9869 94.2096 61.7462V53.741H101.963C104.782 53.741 107.601 55.1537 109.246 57.5081C111.36 60.569 112.065 64.807 110.655 68.5742ZM89.5109 61.5108C89.5109 89.529 70.481 112.132 46.9873 112.132C23.4937 112.132 4.69873 89.529 4.69873 61.5108V53.5055H89.5109V61.5108ZM101.963 48.7966H2.34937C0.939747 48.7966 0 49.7384 0 51.151V61.5108C0 92.119 21.1443 116.841 47.2223 116.841C64.1377 116.841 78.9387 106.246 87.1615 90.7063C95.6192 89.9999 111.125 83.8783 115.119 69.7514C116.764 64.5716 115.824 58.9208 112.77 54.4473C110.185 50.9156 106.191 49.032 101.963 48.7966Z"
              fill="#2D140D"
            />
          </g>
          <path
            id="lineRight"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M39.2346 43.6167C40.6442 43.6167 41.584 42.6749 41.584 41.2622V16.0693C41.584 14.6566 40.6442 13.7148 39.2346 13.7148C37.825 13.7148 36.8853 14.6566 36.8853 16.0693V41.2622C36.8853 42.4395 37.825 43.6167 39.2346 43.6167Z"
            fill="#2D140D"
          />
          <path
            id="lineLeft"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M54.9753 43.6167C56.385 43.6167 57.3247 42.6749 57.3247 41.2622V2.41335C57.3247 1.00066 56.385 0.0588684 54.9753 0.0588684C53.5657 0.0588684 52.626 1.00066 52.626 2.41335V41.2622C52.626 42.4395 53.8007 43.6167 54.9753 43.6167Z"
            fill="#2D140D"
          />
        </svg>

        {/* Line */}
        <svg
          width="140"
          height="5"
          viewBox="0 0 140 5"
          fill="none"
          className="drop-shadow-strDrop"
        >
          <rect width="140" height="5" rx="2.5" fill="#2D140D" />
        </svg>

        {/* Title */}
        <h2 className="text-5xl font-bold text-[#2D140D] drop-shadow-strDrop">
          CoffeeCOM
        </h2>
      </Link>
    </>
  );
}
