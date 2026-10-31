import type { Metadata } from "next";
import { Courier_Prime, Press_Start_2P } from "next/font/google";
import "./globals.css";

const courierPrime = Courier_Prime({
  variable: "--font-courier-prime",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "700"],
});

const pressStart = Press_Start_2P({
  variable: "--font-press-start",
  subsets: ["latin", "latin-ext", "cyrillic", "cyrillic-ext", "greek"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Arcade Vault",
  description: "Juega online y compite por la puntuación más alta.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${courierPrime.variable} ${pressStart.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
