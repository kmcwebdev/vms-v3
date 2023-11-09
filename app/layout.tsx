import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import ReactQueryProvider from "@/components/provider/ReactQueryProvider";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "./globals.css";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Visitor Management",
  description: "Visitor management login",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <ReactQueryProvider>
        <body className={fontSans.className}>
          {children}
          <ReactQueryDevtools initialIsOpen={false} />
          <Analytics />
        </body>
      </ReactQueryProvider>
    </html>
  );
}
