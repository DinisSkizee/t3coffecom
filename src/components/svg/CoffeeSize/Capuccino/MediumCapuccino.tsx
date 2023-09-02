import React from "react";

const MediumCapuccino = ({ opacities }: { opacities: number }) => {
  return (
    <svg
      width="33"
      height="28"
      viewBox="0 0 33 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        opacity={opacities}
        d="M26.2047 16.3297C26.3203 13.4037 26.2625 8.82385 26.2047 5.57982C28.9217 5.70703 31.0028 8.25138 30.8294 11.241C30.7138 13.9761 28.6904 16.2024 26.2047 16.3297ZM24.9907 17.7927C24.9329 18.7468 24.0079 20.9731 22.5049 20.9731H6.72308C5.22005 20.9731 4.35291 18.7468 4.2373 17.7927C4.00606 14.2306 4.17949 4.81651 4.2373 2.27217H24.9907C25.0485 4.81651 25.2219 14.2306 24.9907 17.7927ZM26.7827 22.2453L25.3375 25.6801H3.94825L2.44522 22.2453H26.7827ZM26.2047 4.30765C26.2047 2.78104 26.1469 1.7633 26.1469 1.63609C26.1469 1.25443 25.9156 1 25.5688 1H3.65921C3.31235 1 3.08112 1.25443 3.08112 1.63609C3.08112 2.14495 2.79207 13.7217 3.08112 17.8563C3.19674 19.0012 3.65921 20.0826 4.35291 20.9731H1.57809C1.23124 20.9731 1 21.2275 1 21.6092C1 21.6728 1 21.8 1.05781 21.8636L3.08112 26.5706C3.19674 26.8251 3.37016 26.9523 3.6014 26.9523H25.7422C25.9734 26.9523 26.1469 26.8251 26.2625 26.5706L28.2858 21.8636C28.4014 21.5456 28.2858 21.1639 27.9967 21.0367C27.8811 20.9731 27.7655 20.9731 27.7077 20.9731H24.8751C25.5688 20.0826 26.0312 19.0012 26.1469 17.8563C26.1469 17.7927 26.1469 17.6654 26.1469 17.6018C29.4998 17.4746 32.1012 14.3578 31.9277 10.6685C31.8121 7.23364 29.3263 4.49847 26.2047 4.30765V4.30765Z"
        fill="#2D140D"
        stroke="#2D140D"
        strokeWidth={0.5}
      />
    </svg>
  );
};

export default MediumCapuccino;
