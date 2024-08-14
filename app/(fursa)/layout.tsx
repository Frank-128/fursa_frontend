import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import Sidebar from '../../components/layout_components/Sidebar'
import RightBar from '../../components/layout_components/RightBar'
import SmallScreenNavbar from '../../components/layout_components/SmallScreenNavbar'

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
      <body className={'flex w-screen h-screen font-helvetica'}>
      <Sidebar />
      <main className={'md:w-[67%] bg-yellow-500 md:left-[8%] z-10  absolute  w-screen mt-24 md:mt-0  p-4'}>
          {children}
      </main>
      <RightBar />
      <SmallScreenNavbar />
      </body>
    </html>
  );
}
