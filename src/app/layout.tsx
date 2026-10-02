import type { Metadata } from "next";
import { Bodoni_Moda, DM_Serif_Display, Manrope, Birthstone, La_Belle_Aurore } from "next/font/google";
import { event } from "@/config/event";
import "./globals.css";

const editorial = Bodoni_Moda({ subsets: ["latin"], weight: ["400", "600", "700"], variable: "--font-editorial", display: "swap" });
const display = DM_Serif_Display({ subsets: ["latin"], weight: "400", variable: "--font-display", display: "swap" });
const body = La_Belle_Aurore({ subsets: ["latin"], weight: "400", variable: "--font-body", display: "swap" });
const handwriting = Birthstone({ subsets: ["latin"], weight: "400", variable: "--font-script", display: "swap" });
const sans = Manrope({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-sans", display: "swap" });

export const metadata: Metadata = {
  title: `${event.name} · Mis ${event.age}`,
  description: `Una invitación para celebrar los ${event.age} de ${event.name}. ${event.address}, ${event.city}.`,
  icons: { icon: "/icon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es" className={`${editorial.variable} ${display.variable} ${body.variable} ${handwriting.variable} ${sans.variable}`}><body>{children}</body></html>;
}
