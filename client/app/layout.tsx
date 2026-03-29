import type { Metadata } from "next";
import "./globals.css";
import { Roboto } from "next/font/google";

export const metadata: Metadata = {
  title: "mim",
  description: "Search and copy reaction memes fast.",
};

const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
})
 
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={roboto.className}>
      <body>{children}</body>
    </html>
  )
}