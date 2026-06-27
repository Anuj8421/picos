import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PICOS Phase 1 Mobile App",
  description: "Phase 1 mobile field operations app for the Uday Sangle Sinnar campaign desk."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="mr">
      <body>{children}</body>
    </html>
  );
}
