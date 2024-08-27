import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ".././globals.css";
import ReactQueryProvider from "@/components/queryclient/QueryClient";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign-in to FEBO",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">

      <body className={inter.className}>
      <ReactQueryProvider>
      
      {children}
      </ReactQueryProvider>
      </body>
    </html>
  );
}
