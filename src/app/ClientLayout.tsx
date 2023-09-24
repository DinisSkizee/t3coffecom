import { UserProvider } from "@auth0/nextjs-auth0/client";
import { ApolloWrapper } from "@lib/apollo-storefront";
import { Noto_Sans_Thai } from "next/font/google";

const font = Noto_Sans_Thai({ subsets: ["latin"] });
export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={font.className} style={{ backgroundColor: "#F2F3F3" }}>
      <UserProvider>
        <ApolloWrapper>{children}</ApolloWrapper>
      </UserProvider>
    </div>
  );
}
