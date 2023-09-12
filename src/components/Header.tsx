import React, { useState, useEffect } from "react";

const Header = () => {
  const [time, setTime] = useState("");
  useEffect(() => {
    const updateTime = () => {
      const currentTime = new Date();
      const formattedTime = `${currentTime
        .getHours()
        .toString()
        .padStart(2, "0")}:${currentTime
        .getMinutes()
        .toString()
        .padStart(2, "0")}`;

      setTime(formattedTime);
    };

    const getRemainingSeconds = () => {
      const currentTime = new Date();
      return 60 - currentTime.getSeconds();
    };

    updateTime();

    let remainingSeconds = getRemainingSeconds();

    const intervalId = setInterval(() => {
      updateTime();
      remainingSeconds = getRemainingSeconds();
    }, remainingSeconds * 1000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="flex select-none flex-row items-center gap-1 p-[1rem]">
      {/* Header Left Time/Icon */}
      <h4 className="ml-4 text-sm font-extrabold">{time}</h4>

      {/* Header Right Icons */}
      <div className="ml-auto flex flex-row gap-1.5">
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M17.6665 1.66667C17.6665 1.11438 17.2188 0.666668 16.6665 0.666668H15.6665C15.1142 0.666668 14.6665 1.11438 14.6665 1.66667V10.3333C14.6665 10.8856 15.1142 11.3333 15.6665 11.3333H16.6665C17.2188 11.3333 17.6665 10.8856 17.6665 10.3333V1.66667ZM10.9998 3H11.9998C12.5521 3 12.9998 3.44772 12.9998 4V10.3333C12.9998 10.8856 12.5521 11.3333 11.9998 11.3333H10.9998C10.4476 11.3333 9.99984 10.8856 9.99984 10.3333V4C9.99984 3.44772 10.4476 3 10.9998 3ZM7.33317 5.33333H6.33317C5.78089 5.33333 5.33317 5.78105 5.33317 6.33333V10.3333C5.33317 10.8856 5.78089 11.3333 6.33317 11.3333H7.33317C7.88546 11.3333 8.33317 10.8856 8.33317 10.3333V6.33333C8.33317 5.78105 7.88546 5.33333 7.33317 5.33333ZM3.6665 8.33333C3.6665 7.78105 3.21879 7.33333 2.6665 7.33333H1.6665C1.11422 7.33333 0.666504 7.78105 0.666504 8.33333V10.3333C0.666504 10.8856 1.11422 11.3333 1.6665 11.3333H2.6665C3.21879 11.3333 3.6665 10.8856 3.6665 10.3333V8.33333Z"
            fill="black"
          />
        </svg>
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M8.33359 2.5739C10.5583 2.57399 12.698 3.41168 14.3104 4.91384C14.4318 5.02981 14.6258 5.02834 14.7454 4.91056L15.906 3.76272C15.9666 3.70298 16.0003 3.62206 15.9998 3.53786C15.9993 3.45366 15.9646 3.37313 15.9033 3.31408C11.6714 -0.660252 4.99508 -0.660252 0.763161 3.31408C0.701858 3.37308 0.667076 3.45359 0.666511 3.53779C0.665946 3.62199 0.699644 3.70294 0.760149 3.76272L1.9211 4.91056C2.0406 5.02852 2.23482 5.02999 2.35616 4.91384C3.96872 3.41159 6.10863 2.57389 8.33359 2.5739ZM8.33198 6.29945C9.55571 6.29938 10.7358 6.75598 11.6429 7.58054C11.7656 7.69756 11.9588 7.69502 12.0784 7.57482L13.239 6.39766C13.3001 6.33591 13.334 6.25215 13.3332 6.16511C13.3323 6.07807 13.2967 5.99502 13.2343 5.93453C10.472 3.35515 6.19428 3.35515 3.432 5.93453C3.3696 5.99502 3.334 6.07811 3.33319 6.16518C3.33237 6.25225 3.3664 6.336 3.42764 6.39766L4.58789 7.57482C4.70749 7.69502 4.90076 7.69756 5.02345 7.58054C5.92994 6.75652 7.10906 6.29996 8.33198 6.29945ZM10.6664 9.02304C10.6682 9.10849 10.6339 9.19088 10.5716 9.25075L8.55686 11.2419C8.4978 11.3004 8.41728 11.3333 8.33326 11.3333C8.24924 11.3333 8.16872 11.3004 8.10966 11.2419L6.09456 9.25075C6.03231 9.19084 5.99806 9.10842 5.99991 9.02297C6.00175 8.93752 6.03953 8.85659 6.10431 8.79931C7.39101 7.73356 9.27551 7.73356 10.5622 8.79931C10.6269 8.85664 10.6647 8.93759 10.6664 9.02304Z"
            fill="black"
          />
        </svg>
        <svg
          width="25"
          height="12"
          viewBox="0 0 25 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            opacity="0.35"
            x="0.5"
            y="0.833332"
            width="21"
            height="10.3333"
            rx="2.16667"
            stroke="black"
          />
          <path
            opacity="0.4"
            d="M23 4V8C23.8079 7.66122 24.3333 6.87313 24.3333 6C24.3333 5.12687 23.8079 4.33878 23 4Z"
            fill="black"
          />
          <rect
            x="2"
            y="2.33333"
            width="18"
            height="7.33333"
            rx="1.33333"
            fill="black"
          />
        </svg>
      </div>
    </div>
  );
};

export default Header;
