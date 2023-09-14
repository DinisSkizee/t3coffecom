import React from "react";
import Link from "next/link";

const Basket = ({ basketAmount }: { basketAmount: number }) => {
  return (
    <Link href="/cart">
      <svg
        width="30"
        height="29"
        viewBox="0 0 30 29"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M21.106 14.4285H2.72884C2.48367 14.4264 2.24091 14.477 2.01694 14.5767C1.79297 14.6764 1.59299 14.8231 1.43051 15.0067C1.26803 15.1903 1.14682 15.4066 1.07506 15.641C1.00331 15.8755 0.982674 16.1226 1.01456 16.3657L2.26598 25.7942C2.32038 26.2093 2.52474 26.59 2.84053 26.8648C3.15632 27.1395 3.56171 27.2892 3.98027 27.2857H19.8203C20.2388 27.2892 20.6442 27.1395 20.96 26.8648C21.2758 26.59 21.4802 26.2093 21.5346 25.7942L22.786 16.3657C22.8172 16.1255 22.7973 15.8814 22.7274 15.6495C22.6575 15.4176 22.5394 15.2031 22.3807 15.0201C22.222 14.8371 22.0264 14.6898 21.8067 14.5878C21.587 14.4859 21.3482 14.4316 21.106 14.4285Z"
          stroke="#8C746A"
          strokeWidth="1.71429"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M7.63184 18.7142V22.9999"
          stroke="#8C746A"
          strokeWidth="1.71429"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M11.9175 18.7142V22.9999"
          stroke="#8C746A"
          strokeWidth="1.71429"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16.2031 18.7142V22.9999"
          stroke="#8C746A"
          strokeWidth="1.71429"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16.1689 6.78284C17.1958 6.96024 18.1367 7.46819 18.8484 8.22941C19.5601 8.99064 20.0038 9.96348 20.1118 11L20.4889 14.4286"
          stroke="#8C746A"
          strokeWidth="1.71429"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M3.34619 14.4286L3.72333 11C3.8384 9.96965 4.28515 9.00458 4.99628 8.25016C5.70741 7.49574 6.64443 6.99282 7.66619 6.81714"
          stroke="#8C746A"
          strokeWidth="1.71429"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16.2033 7.14286C16.2033 7.42426 16.1478 7.70291 16.0401 7.96289C15.9325 8.22288 15.7746 8.4591 15.5756 8.65809C15.3767 8.85707 15.1404 9.01491 14.8804 9.1226C14.6205 9.23029 14.3418 9.28571 14.0604 9.28571H9.77469C9.20637 9.28571 8.66133 9.05995 8.25946 8.65809C7.8576 8.25622 7.63184 7.71118 7.63184 7.14286C7.63184 6.57454 7.8576 6.02949 8.25946 5.62763C8.66133 5.22576 9.20637 5 9.77469 5H14.0604C14.6287 5 15.1738 5.22576 15.5756 5.62763C15.9775 6.02949 16.2033 6.57454 16.2033 7.14286Z"
          stroke="#8C746A"
          strokeWidth="1.71429"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {basketAmount > 0 && (
          <>
            <rect x="15" y="0" width="15" height="16" rx="7.5" fill="#2D140D" />
            <svg>
              <text
                x={15 + 15 / 2}
                y={4 + 16 / 2}
                textAnchor="middle"
                fontSize=".7em"
                fill="#ABA19E"
                className="select-none"
              >
                {basketAmount}
              </text>
            </svg>
          </>
        )}
      </svg>
    </Link>
  );
};

export default Basket;
