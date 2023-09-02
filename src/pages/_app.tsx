import { type AppType } from "next/dist/shared/lib/utils";
import { Noto_Sans_Thai } from "next/font/google";
import "@styles/globals.css";

const font = Noto_Sans_Thai({ subsets: ["latin"] });
const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <main style={{ backgroundColor: "#F2F3F3" }} className={font.className}>
      <Component {...pageProps} />
    </main>
  );
};

export default MyApp;
