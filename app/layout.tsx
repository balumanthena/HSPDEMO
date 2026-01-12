import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Stork Multispecialty Hospital | Reliable Healthcare",
  description: "Reliable Hospital & Diagnostic Facility providing high-end healthcare services.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${manrope.variable} antialiased bg-background text-text-primary font-sans`}
      >
        {children}
      </body>
    </html>
  );
}
