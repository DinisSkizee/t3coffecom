import { UserProvider } from "@auth0/nextjs-auth0/client";
import { type Metadata } from "next";
import "@styles/globals.css";
import ClientLayout from "./ClientLayout";

export const metadata: Metadata = {
  title: "Coffee Shop",
  description: "Coffee Shop",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
};

export default RootLayout;
