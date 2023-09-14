import React from "react";

interface drinkProps {
  className?: string;
  opacities?: number;
  size: number;
}

const Cappuccino = ({ className, opacities, size }: drinkProps) => {
  let width = 0;
  let height = 0;

  switch (size) {
    // Size 4: Big Drink in the Background of Preferences Page
    case 4:
      width = 100;
      height = 83;
      break;
    // Size 3: Medium Drink in the drinkSelection page
    case 3:
      width = 50;
      height = 41;
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
      viewBox="0 0 100 83"
      fill="none"
      width={width}
      height={height}
      opacity={opacities}
      className={className}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.20507 80.9694L1.86475 65.9431H86.1538L79.627 80.9694H8.20507Z"
        fill={size === 4 || size === 3 ? "#FDE9DA" : "none"}
      />
      <g mask="url(#mask0_78_3486)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M18.4614 65.9432C12.121 65.9432 8.95086 57.2117 8.5779 53.7597C7.83198 42.3884 8.39142 12.945 8.5779 4.01044V1.97986H79.0674V4.01044C79.2539 12.7419 79.8133 42.3884 79.0674 53.7597C78.8809 57.2117 75.5243 65.9432 69.184 65.9432H18.4614Z"
          fill={size === 4 || size === 3 ? "#B98875" : ""}
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M81.3054 49.0893C81.6783 39.7487 81.4918 25.1285 81.3054 14.7725C90.0699 15.1786 96.7832 23.301 96.2238 32.8447C95.8508 41.5762 89.324 48.6832 81.3054 49.0893ZM77.3893 53.7597C77.2028 56.8056 74.2191 63.9126 69.3706 63.9126H18.4615C13.6131 63.9126 10.8159 56.8056 10.4429 53.7597C9.69697 42.3884 10.2564 12.3358 10.4429 4.21351H77.3893C77.5758 12.3358 78.1352 42.3884 77.3893 53.7597ZM83.1702 67.9738L78.5082 78.9389H9.51049L4.662 67.9738H83.1702ZM81.3054 10.7114C81.3054 5.83797 81.1189 2.58904 81.1189 2.18292C81.1189 0.964576 80.373 0.152344 79.2541 0.152344H8.57809C7.45921 0.152344 6.71329 0.964576 6.71329 2.18292C6.71329 3.80739 5.78089 40.764 6.71329 53.9627C7.08625 57.6178 8.57809 61.0698 10.8159 63.9126H1.8648C0.745921 63.9126 0 64.7248 0 65.9432C0 66.1462 0 66.5523 0.18648 66.7554L6.71329 81.7817C7.08625 82.5939 7.64569 83.0001 8.39161 83.0001H79.8135C80.5594 83.0001 81.1189 82.5939 81.4918 81.7817L88.0186 66.7554C88.3916 65.7401 88.0186 64.5218 87.0863 64.1157C86.7133 63.9126 86.3403 63.9126 86.1539 63.9126H77.0163C79.2541 61.0698 80.7459 57.6178 81.1189 53.9627C81.1189 53.7597 81.1189 53.3536 81.1189 53.1505C91.9347 52.7444 100.326 42.7945 99.7669 31.0172C99.3939 20.052 91.3753 11.3205 81.3054 10.7114Z"
          fill="#231514"
          stroke="#231514"
          strokeWidth="0.5"
        />
      </g>
    </svg>
  );
};

export default Cappuccino;
