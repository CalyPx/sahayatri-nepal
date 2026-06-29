import type { Metadata } from "next";
import {
  Dancing_Script,
  Space_Grotesk,
  Plus_Jakarta_Sans,
  Space_Mono,
} from "next/font/google";
import "./globals.css";

const dancing = Dancing_Script({
  variable: "--font-dancing",
  subsets: ["latin"],
  weight: ["700"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["700"],
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const spaceMono = Space_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400"],
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
        className={`${dancing.variable} ${spaceGrotesk.variable} ${plusJakarta.variable} ${spaceMono.variable} antialiased`}
        style={{ backgroundColor: "#FFFFFF", color: "#0A1628" }}
      >
        {children}
      </body>
    </html>
  );
}
