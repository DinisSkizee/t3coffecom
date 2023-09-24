import { type Metadata } from "next";
import "@styles/globals.css";
import ClientLayout from "./ClientLayout";
import StyledComponentsRegistry from "@lib/registry";

export const metadata: Metadata = {
  title: "Coffee Shop",
  description: "Coffee Shop",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body>
        <StyledComponentsRegistry>
          <ClientLayout>{children}</ClientLayout>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
};

export default RootLayout;
