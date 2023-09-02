import React from "react";

const LargeMocha = ({ opacities }: { opacities: number }) => {
  return (
    <svg
      width="33"
      height="48"
      viewBox="0 0 33 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g opacity={opacities}>
        <mask
          id="mask0_225_1796"
          style={{ maskType: "luminance" }}
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="33"
          height="48"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0.70166 0.074585H32.5783V48H0.70166V0.074585Z"
            fill="white"
          />
        </mask>
        <g mask="url(#mask0_225_1796)">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M24.0525 32.411C23.4919 32.411 22.8379 32.3229 22.2773 32.1468L23.8656 20.1688H24.0525C27.6029 20.5211 30.3123 23.5156 29.9386 26.8624C29.6583 29.8568 27.2291 32.1468 24.0525 32.411ZM21.8102 21.4018H4.43205L2.7503 9.24771H23.4919L21.8102 21.4018ZM18.4466 46.3265H7.79555L4.61891 23.1633H21.5299L18.4466 46.3265ZM9.57074 4.3156C11.0656 4.3156 12.5605 4.57971 14.0554 5.02018C14.9897 5.37237 15.924 5.54862 16.8583 5.54862C17.8861 5.6367 18.8204 5.19633 19.4744 4.49163C20.035 3.78716 20.2218 2.99449 20.1284 2.20183C21.0627 2.6422 21.8102 3.25872 22.3707 4.05127C23.0248 5.10826 23.2116 6.2531 23.0248 7.39816H3.68461C4.33862 6.2531 5.83351 4.3156 9.57074 4.3156ZM24.0525 18.4073L25.3605 8.45494C25.3605 8.10275 25.1737 7.75046 24.7999 7.5742C25.0802 6.07706 24.7065 4.49163 23.8656 3.17053C22.7445 1.58532 20.9693 0.52844 19.1007 0.0880728C18.6335 -5.44719e-07 18.0729 0.352293 18.0729 0.880733C18.0729 0.968807 18.0729 1.05688 18.0729 1.14495C18.3532 1.93761 18.3532 2.73016 17.9795 3.52294C17.6992 3.78716 17.2321 3.9633 16.7649 3.87523C16.0175 3.87523 15.27 3.69908 14.616 3.43486C12.9342 2.90642 11.2525 2.6422 9.47731 2.55413C4.61891 2.55413 2.37658 5.46055 1.62913 7.39816C1.06855 7.39816 0.694824 7.75046 0.694824 8.2789V8.36697L5.92694 47.2072C6.02037 47.6476 6.39409 48 6.86125 48H19.1941C19.6612 48 20.035 47.6476 20.1284 47.2072L21.9036 33.9081C26.3883 35.0531 31.0598 32.6751 32.2744 28.4476C33.489 24.2201 30.9664 19.8164 26.4817 18.6714C25.7342 18.4954 24.8934 18.4073 24.0525 18.4073Z"
            fill="#2D140D"
            stroke="#2D140D"
            strokeWidth=".5"
          />
        </g>
      </g>
    </svg>
  );
};

export default LargeMocha;
