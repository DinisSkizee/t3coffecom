import React from "react";

interface SugarProps {
  opacitiesSugar: number;
}
const SmallSugar = ({ opacitiesSugar }: SugarProps) => {
  return (
    <svg
      width="20"
      height="21"
      viewBox="0 0 20 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g opacity={opacitiesSugar}>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M14.3011 6.68438V14.0177C14.3011 14.6927 13.7776 15.2399 13.1319 15.2399H6.1165C5.47074 15.2399 4.94727 14.6927 4.94727 14.0177V6.68438C4.94727 6.00936 5.47074 5.46216 6.1165 5.46216H13.1319C13.7776 5.46216 14.3011 6.00936 14.3011 6.68438Z"
          stroke="#2D140D"
          strokeWidth="2"
        />
        <path
          d="M1 1.5L18.5385 19.5"
          stroke="#2D140D"
          strokeWidth="2"
          strokeLinecap="square"
        />
      </g>
    </svg>
  );
};

export default SmallSugar;
