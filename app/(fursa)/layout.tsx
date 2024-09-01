import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import Sidebar from "../../components/layout_components/Sidebar";
import RightBar from "../../components/layout_components/RightBar";
import SmallScreenNavbar from "../../components/layout_components/SmallScreenNavbar";
import Main from "../../components/layout_components/Main";
import ReactQueryProvider from "@/components/queryclient/QueryClient";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Fursa Credit Services",
  description: "Fursa Credit Services",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
        <body className={"flex w-screen h-screen font-helvetica"}>
      <ReactQueryProvider>
          <Sidebar />
          <Main>{children}</Main>
          {/* <RightBar /> */}
      </ReactQueryProvider>
        </body>
    </html>
  );
}
