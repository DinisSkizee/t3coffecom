import React from "react";

interface drinkProps {
  className?: string;
  opacities?: number;
  size: number;
}

const Macchiato = ({ className, opacities, size }: drinkProps) => {
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
      width = 38;
      height = 56.5;
      break;
    // Size 2: Large drink in the size selection inside preferences
    case 2:
      width = 29;
      height = 44;
      break;
    // Size 1: Medium drink in the size selection inside preferences
    case 1:
      width = 25;
      height = 37;
      break;
    default:
      // Size 0: Small drink in the size selection inside preferences
      width = 22;
      height = 27;
      break;
  }
  return (
    <svg
      viewBox="0 0 66 98"
      fill="none"
      width={width}
      height={height}
      opacity={opacities}
      className={className}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.7506 95.8358L14.0195 76.6778H51.8899L49.1588 95.8358H16.7506Z"
        fill={size === 4 || size === 3 ? "#C69A80" : "none"}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.1064 16.0724V9.80923L53.1644 1.88816V16.0724H11.1064Z"
        fill={size === 4 || size === 3 ? "#C69A80" : "none"}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M35.5037 54.2041C32.7727 54.5725 30.2237 56.0462 28.5851 58.2567C27.4927 59.5462 26.5823 61.0199 26.0361 62.6778C27.4927 61.2041 29.3134 59.9146 31.3161 58.9936C33.683 57.7041 35.5037 56.783 36.414 54.3883C36.0499 54.3883 35.6858 54.2041 35.5037 54.2041ZM29.4954 69.862C29.8596 69.862 30.0416 70.0462 30.4058 70.0462C33.1368 69.6778 35.6858 68.2041 37.3244 65.9936C38.5989 64.5199 39.6913 62.6778 40.0554 60.6515C38.5989 62.1251 36.9602 63.4146 34.9575 64.1515C32.4085 65.4409 30.4058 66.7304 29.4954 69.862ZM14.0196 76.6778L9.6499 46.0988H56.2596L51.8899 76.6778H14.0196Z"
        fill={size === 4 || size === 3 ? "#B98875" : "none"}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.8208 28.4145H64.2705V16.0724H1.8208V28.4145Z"
        fill={size === 4 || size === 3 ? "#EABFA5" : "none"}
      />
      <g mask="url(#mask0_0_48)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M9.64955 46.0988L7.10059 28.4145H58.8082L56.2592 46.0988H9.64955Z"
          fill={size === 4 || size === 3 ? "#C69A80" : "none"}
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M58.8083 26.5724H3.64138V17.9145H62.4497V26.5724H58.8083ZM54.6207 44.2567H11.2883L9.28552 30.2566H56.6235L54.6207 44.2567ZM50.251 74.8357H15.6579L11.8345 47.9409H54.2566L50.251 74.8357ZM47.7021 93.9936H18.2069L16.0221 78.7041H49.7048L47.7021 93.9936ZM12.9269 11.2829L51.3434 4.09869V14.2303H12.9269V11.2829ZM62.2676 14.2303H54.8028V1.88816C54.8028 0.782895 54.0745 0.046051 52.9821 0.046051C52.8 0.046051 52.8 0.046051 52.6179 0.046051L10.7421 7.96712C9.83172 8.15133 9.28552 8.88818 9.28552 9.80923V14.2303H3.64138C1.63862 14.2303 0 15.8882 0 17.9145V26.7566C0 28.783 1.63862 30.4409 3.64138 30.4409H5.64414L14.9297 96.2042C15.1117 97.1252 15.84 97.8621 16.7503 97.8621H49.1586C50.069 97.8621 50.7972 97.1252 50.9793 96.2042L60.2648 30.2566H62.2676C64.2703 30.2566 65.909 28.5987 65.909 26.5724V17.9145C65.909 15.8882 64.2703 14.2303 62.2676 14.2303Z"
          fill="#231514"
          stroke="#231514"
          strokeWidth="0.5"
        />
      </g>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M38.4166 53.4672C35.8677 51.2567 30.7697 52.9146 27.1284 57.1514C23.487 61.3883 22.5766 66.7304 25.3077 68.9409C26.7642 58.9935 36.778 62.3093 38.4166 53.4672Z"
        fill={size === 4 || size === 3 ? "#FDE9DA" : "#231514"}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M27.4922 70.7831C30.0412 72.9936 35.1391 71.3357 38.7805 67.0988C42.4218 62.862 43.3322 57.5199 40.6012 55.3093C38.9625 64.1515 28.9487 60.8357 27.4922 70.7831Z"
        fill={size === 4 || size === 3 ? "#FDE9DA" : "#231514"}
      />
    </svg>
  );
};

export default Macchiato;
