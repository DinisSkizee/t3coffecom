import React from "react";

interface drinkProps {
  className?: string;
  opacities?: number;
  size: number;
}

const Espresso = ({ className, opacities, size }: drinkProps) => {
  let width = 0;
  let height = 0;
  switch (size) {
    // Size 4: Big Drink in the Background of Preferences Page
    case 4:
      width = 98;
      height = 100;
      break;
    // Size 3: Medium Drink in the drinkSelection page
    case 3:
      width = 50;
      height = 51;
      break;
    // Size 2: Large drink in the size selection inside preferences
    case 2:
      width = 40;
      height = 40;
      break;
    // Size 1: Medium drink in the size selection inside preferences
    case 1:
      width = 34;
      height = 34;
      break;
    default:
      // Size 0: Small drink in the size selection inside preferences
      width = 28;
      height = 25;
      break;
  }
  return (
    <svg
      viewBox="0 0 98 100"
      fill="none"
      width={width}
      height={height}
      opacity={opacities}
      className={className}
    >
      <g mask="url(#mask0_78_3235)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M39.8947 96.76C19.0542 96.76 1.98486 76.6618 1.98486 51.9867V43.2311H77.6061V51.9867C77.6061 76.6618 60.7352 96.76 39.8947 96.76Z"
          fill={size === 4 || size === 3 ? "#B98875" : "none"}
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M93.4846 57.9566C91.1028 66.3143 81.9727 71.0901 75.6213 72.483C78.2015 66.1153 79.5909 59.1505 79.5909 52.1858V45.4201H86.1408C88.5225 45.4201 90.9043 46.614 92.2937 48.6039C94.08 51.1908 94.6754 54.7727 93.4846 57.9566ZM75.6213 51.9868C75.6213 75.6669 59.5443 94.7702 39.6962 94.7702C19.8481 94.7702 3.96962 75.6669 3.96962 51.9868V45.2211H75.6213V51.9868ZM86.1408 41.2412H1.98481C0.793924 41.2412 0 42.0372 0 43.2311V51.9868C0 77.8558 17.8633 98.75 39.8947 98.75C54.1853 98.75 66.6896 89.7954 73.6365 76.6619C80.7818 76.0649 93.8815 70.8911 97.2557 58.9515C98.6451 54.5737 97.8511 49.7979 95.2709 46.017C93.0876 43.0321 89.7134 41.4402 86.1408 41.2412Z"
          fill="#231514"
          stroke="#231514"
          strokeWidth="0.5"
        />
      </g>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M33.1464 36.8633C34.3373 36.8633 35.1312 36.0674 35.1312 34.8734V13.5812C35.1312 12.3873 34.3373 11.5913 33.1464 11.5913C31.9555 11.5913 31.1616 12.3873 31.1616 13.5812V34.8734C31.1616 35.8684 31.9555 36.8633 33.1464 36.8633Z"
        fill="#231514"
        stroke="#231514"
        strokeWidth="0.5"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M46.4448 36.8634C47.6357 36.8634 48.4296 36.0674 48.4296 34.8735V2.03973C48.4296 0.845774 47.6357 0.0498047 46.4448 0.0498047C45.2539 0.0498047 44.46 0.845774 44.46 2.03973V34.8735C44.46 35.8684 45.4524 36.8634 46.4448 36.8634Z"
        fill="#231514"
        stroke="#231514"
        strokeWidth="0.5"
      />
    </svg>
  );
};

export default Espresso;
