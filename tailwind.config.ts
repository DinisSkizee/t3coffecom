import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "pattern-background": "url('../../public/img/patbg.png')",
        "background-light": "url('../../public/img/coffeelight.png')",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateY(-50%)" },
          "100%": { transform: "translateY(-22%)" },
        },
      },
      animation: {
        "scroll-infinite": "marquee 35s linear infinite",
      },
      dropShadow: {
        strDrop: "2px 2px 2px rgba(0, 0, 0, .5)",
        smDrop: "1px 1px 1px rgba(0, 0, 0, .2)",
      },
    },
  },
  plugins: [],
} satisfies Config;
