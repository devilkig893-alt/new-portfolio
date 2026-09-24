import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans, Space_Grotesk } from "next/font/google";
import "./globals.css";
import ScrollProvider from "@/components/animations/ScrollProvider";
import Navigation from "@/components/ui/Navigation";
import Cursor from "@/components/ui/Cursor";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Manoj Kumar | Premium Creative Developer Portfolio",
  description:
    "3.5+ years building high-performance cross-platform React Native mobile apps and modern React/Next.js web platforms. Explore my interactive 3D digital portfolio.",
  keywords: [
    "Manoj Kumar",
    "Creative Developer",
    "React Native Developer",
    "Frontend Developer",
    "Three.js",
    "React Three Fiber",
    "Next.js Developer",
  ],
  authors: [{ name: "Manoj Kumar" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${plusJakarta.variable} ${spaceGrotesk.variable} antialiased bg-[#050505] text-[#FFFFFF]`}
      >
        <ScrollProvider>
          <Cursor />
          <Navigation />
          <main className="relative min-h-screen w-full overflow-hidden">
            {children}
          </main>
        </ScrollProvider>
      </body>
    </html>
  );
}
