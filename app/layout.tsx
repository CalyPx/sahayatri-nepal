import type { Metadata } from "next";
import {
  Space_Grotesk,
  Plus_Jakarta_Sans,
  Dancing_Script,
  Kalam,
  Space_Mono,
  Playfair_Display,
} from "next/font/google";
import "./globals.css";
import ScrollProgress from "@/components/ScrollProgress";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const dancing = Dancing_Script({
  variable: "--font-dancing",
  subsets: ["latin"],
  weight: ["700"],
});

/* Dancing Script has no Devanagari glyphs — Kalam (handwritten
   Devanagari) is the script-stack fallback so सहयात्री renders
   handwritten rather than in a system font. */
const kalam = Kalam({
  variable: "--font-kalam",
  subsets: ["devanagari", "latin"],
  weight: ["700"],
});

const spaceMono = Space_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

/* Small-scale substitute for Dancing Script — below 32px the script's
   thin strokes lose legibility on lower-quality screens. */
const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400"],
  style: ["italic"],
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
        className={`${spaceGrotesk.variable} ${jakarta.variable} ${dancing.variable} ${kalam.variable} ${spaceMono.variable} ${playfair.variable} antialiased`}
        style={{ backgroundColor: "#FAFAF7", color: "#091426" }}
      >
        <ScrollProgress />
        {children}
      </body>
    </html>
  );
}
