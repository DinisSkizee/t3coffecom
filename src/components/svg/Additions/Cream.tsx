import React from "react";

interface CreamProps {
  opacitiesAdditions: number;
}
const Cream = ({ opacitiesAdditions }: CreamProps) => {
  return (
    <svg width="27" height="25" viewBox="0 0 27 25" fill="none">
      <path
        opacity={opacitiesAdditions}
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.0796 2C11.0796 2 13.1388 7.04949 8.80254 9.04387C5.31283 10.6488 3.77687 12.9763 4.38912 14.9477C2.46017 15.3548 1 17.0853 1 19.1427C1 21.4999 2.91661 23.4286 5.25912 23.4286H21.7409C24.0834 23.4286 26 21.4999 26 19.1427C26 17.0501 24.489 15.2964 22.5109 14.9289C23.8973 10.8561 18.9529 4.62237 11.0796 2Z"
        fill="white"
        stroke="#2D140D"
        strokeWidth="2"
      />
    </svg>
  );
};

export default Cream;
