import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Political Intelligence Command Center | PICOS",
  description:
    "PICOS political intelligence operating screen for Uday Sangle and the Sinnar constituency."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
