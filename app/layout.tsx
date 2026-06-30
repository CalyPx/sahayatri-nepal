import type { Metadata } from "next";
import { Space_Grotesk, Space_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const spaceMono = Space_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["700"],
});

export const metadata: Metadata = {
  title: "Sahayatri Nepal — Educating Deaf Children in Karnali",
  description:
    "Education, shelter and rehabilitation for deaf children in Nepal's most remote province. In partnership with Learn for Life, United Kingdom.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${spaceGrotesk.variable} ${spaceMono.variable} antialiased`}
        style={{ backgroundColor: "#FFFFFF", color: "#0D1B2A" }}
      >
        {children}
      </body>
    </html>
  );
}
