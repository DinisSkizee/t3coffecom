import React from "react";

const SmallCappuccino = ({ opacities }: { opacities: number }) => {
  return (
    <svg
      width="26"
      height="22"
      viewBox="0 0 26 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        opacity={opacities}
        d="M20.5133 12.8287C20.6028 10.5779 20.558 7.05497 20.5133 4.55956C22.6168 4.65742 24.228 6.6146 24.0937 8.9143C24.0042 11.0183 22.4378 12.7308 20.5133 12.8287ZM19.5734 13.9541C19.5287 14.688 18.8126 16.4005 17.6489 16.4005H5.43077C4.26713 16.4005 3.5958 14.688 3.50629 13.9541C3.32727 11.214 3.46154 3.9724 3.50629 2.01521H19.5734C19.6182 3.9724 19.7524 11.214 19.5734 13.9541ZM20.9608 17.3791L19.842 20.0213H3.28252L2.11888 17.3791H20.9608ZM20.5133 3.58096C20.5133 2.40665 20.4685 1.62378 20.4685 1.52592C20.4685 1.23234 20.2895 1.03662 20.021 1.03662H3.05874C2.79021 1.03662 2.61119 1.23234 2.61119 1.52592C2.61119 1.91736 2.38741 10.8226 2.61119 14.003C2.7007 14.8837 3.05874 15.7155 3.5958 16.4005H1.44755C1.17902 16.4005 1 16.5963 1 16.8898C1 16.9388 1 17.0366 1.04476 17.0856L2.61119 20.7063C2.7007 20.9021 2.83496 20.9999 3.01399 20.9999H20.1552C20.3343 20.9999 20.4685 20.9021 20.558 20.7063L22.1245 17.0856C22.214 16.8409 22.1245 16.5473 21.9007 16.4495C21.8112 16.4005 21.7217 16.4005 21.6769 16.4005H19.4839C20.021 15.7155 20.379 14.8837 20.4685 14.003C20.4685 13.9541 20.4685 13.8562 20.4685 13.8073C23.0643 13.7094 25.0783 11.3119 24.9441 8.47393C24.8545 5.83173 22.9301 3.72775 20.5133 3.58096V3.58096Z"
        fill="#2D140D"
        stroke="#2D140D"
        strokeWidth={0.5}
      />
    </svg>
  );
};

export default SmallCappuccino;