import React from "react";

interface SugarProps {
  opacitiesSugar: number;
}
const SmallSugar = ({ opacitiesSugar }: SugarProps) => {
  return (
    <svg
      width="12"
      height="13"
      viewBox="0 0 12 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g opacity={opacitiesSugar}>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M10.8924 2.83331V10.1666C10.8924 10.8417 10.3689 11.3889 9.72319 11.3889H2.70781C2.06205 11.3889 1.53857 10.8417 1.53857 10.1666V2.83331C1.53857 2.15828 2.06205 1.61108 2.70781 1.61108H9.72319C10.3689 1.61108 10.8924 2.15828 10.8924 2.83331Z"
          stroke="#2D140D"
          strokeWidth="2"
        />
      </g>
    </svg>
  );
};

export default SmallSugar;
