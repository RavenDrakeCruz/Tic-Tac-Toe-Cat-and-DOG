import "./globals.css";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans"; // if you’re using Geist fonts

export const metadata: Metadata = {
  title: "Tic-Tac-Toe",
  description: "Cat 🐱 vs Dog 🐶 Tic Tac Toe Game",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={GeistSans.className}>
        {children}
      </body>
    </html>
  );
}
