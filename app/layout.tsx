import type { Metadata } from "next";
import { Courier_Prime, Press_Start_2P } from "next/font/google";
import { Backdrop } from "@/components/layout/Backdrop";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { getMockUser } from "@/lib/session";
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
      <body className="min-h-full flex flex-col">
        <div className="scan grid-anim relative flex min-h-screen flex-1 flex-col overflow-hidden">
          <Backdrop />
          <div className="relative z-10 flex flex-1 flex-col">
            <Navbar user={getMockUser()} />
            {children}
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}
