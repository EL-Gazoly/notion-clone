import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
 
export const metadata: Metadata = {
  title: "Gotion",
  description: "The connected workspace where better, faster work happens",
  icons: {
    icon: [
      {
       media: "(prefers-color-scheme: dark)",
       url: "/icon.svg",
       href: "/icon.svg",
      }
     
    ]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
